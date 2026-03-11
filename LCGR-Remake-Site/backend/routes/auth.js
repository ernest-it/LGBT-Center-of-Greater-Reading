const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDb = require('../database/db');
const authenticate = require('../middleware/auth');

const router = express.Router();

// H4: Dummy hash for constant-time comparison when user not found
const DUMMY_HASH = bcrypt.hashSync('dummy-password-never-used', 12);

// H2: Max session age for refresh (7 days in seconds)
const MAX_SESSION_AGE_SECONDS = 7 * 24 * 60 * 60;

// M1: Lockout constants
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

/**
 * M5: Username validation - alphanumeric + underscores, 3-30 characters
 */
function validateUsername(username) {
  if (typeof username !== 'string') return 'Username is required.';
  const trimmed = username.trim();
  if (trimmed.length < 3 || trimmed.length > 30) return 'Username must be between 3 and 30 characters.';
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) return 'Username must contain only letters, numbers, and underscores.';
  return null;
}

/**
 * Password complexity validation.
 */
function validatePasswordComplexity(password) {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  // M6: Max length check (bcrypt truncates at 72 bytes)
  if (password.length > 72) return 'Password must not exceed 72 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Password must contain at least one special character.';
  return null;
}

/**
 * L4: Structured security logging
 */
function logSecurityEvent(event, username, req) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    username: username || null,
    ip: req.ip,
  };
  console.log(JSON.stringify(entry));
}

/**
 * GET /api/auth/setup-status
 * Check if initial setup has been completed (i.e., at least one user exists).
 */
router.get('/setup-status', (req, res) => {
  try {
    const db = getDb();
    const user = db.prepare('SELECT id FROM users LIMIT 1').get();
    res.json({ needsSetup: !user });
  } catch (err) {
    console.error('Setup status error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/auth/setup
 * Create the initial admin account. Only works if no users exist yet.
 */
router.post('/setup', (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    const db = getDb();
    const existingUser = db.prepare('SELECT id FROM users LIMIT 1').get();

    if (existingUser) {
      return res.status(403).json({ error: 'Setup has already been completed.' });
    }

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // M5: Validate username
    const usernameError = validateUsername(username);
    if (usernameError) {
      return res.status(400).json({ error: usernameError });
    }

    const complexityError = validatePasswordComplexity(password);
    if (complexityError) {
      return res.status(400).json({ error: complexityError });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const trimmedUsername = username.trim();
    const passwordHash = bcrypt.hashSync(password, 12);
    const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(trimmedUsername, passwordHash);

    // Read token_version for JWT payload
    const newUser = db.prepare('SELECT token_version FROM users WHERE id = ?').get(result.lastInsertRowid);

    const token = jwt.sign(
      { id: result.lastInsertRowid, username: trimmedUsername, tokenVersion: newUser.token_version },
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    logSecurityEvent('user_setup', trimmedUsername, req);

    res.status(201).json({
      token,
      user: { id: result.lastInsertRowid, username: trimmedUsername },
    });
  } catch (err) {
    console.error('Setup error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/auth/login
 * Authenticate user and return JWT.
 */
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // M5: Trim username on login
    const trimmedUsername = username.trim();

    // M1: DB-based lockout check
    const db = getDb();
    const lockRow = db.prepare('SELECT locked_until FROM users WHERE username = ?').get(trimmedUsername);
    if (lockRow && lockRow.locked_until && new Date(lockRow.locked_until) > new Date()) {
      logSecurityEvent('login_locked_out', trimmedUsername, req);
      return res.status(429).json({ error: 'Account temporarily locked. Please try again later.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(trimmedUsername);

    // H4: Always run bcrypt to prevent timing oracle
    const hashToCompare = user ? user.password_hash : DUMMY_HASH;
    const passwordValid = bcrypt.compareSync(password, hashToCompare);

    if (!user || !passwordValid) {
      // M1: Track failed attempt in DB
      if (user) {
        db.prepare('UPDATE users SET failed_attempts = failed_attempts + 1 WHERE username = ?').run(trimmedUsername);
        const updated = db.prepare('SELECT failed_attempts FROM users WHERE username = ?').get(trimmedUsername);
        if (updated.failed_attempts >= MAX_FAILED_ATTEMPTS) {
          const lockUntil = new Date(Date.now() + LOCKOUT_DURATION_MS).toISOString();
          db.prepare('UPDATE users SET locked_until = ?, failed_attempts = 0 WHERE username = ?').run(lockUntil, trimmedUsername);
          logSecurityEvent('account_lockout', trimmedUsername, req);
        }
      }
      logSecurityEvent('login_failed', trimmedUsername, req);
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // M1: Successful login - reset failed attempts and clear lockout
    db.prepare('UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE username = ?').run(trimmedUsername);

    const token = jwt.sign(
      { id: user.id, username: user.username, tokenVersion: user.token_version },
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    logSecurityEvent('login_success', trimmedUsername, req);

    res.json({
      token,
      user: { id: user.id, username: user.username },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/auth/register
 * Register a new admin user. Only existing admins can create new ones.
 */
router.post('/register', authenticate, (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // M5: Validate username
    const usernameError = validateUsername(username);
    if (usernameError) {
      return res.status(400).json({ error: usernameError });
    }

    const complexityError = validatePasswordComplexity(password);
    if (complexityError) {
      return res.status(400).json({ error: complexityError });
    }

    const trimmedUsername = username.trim();
    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(trimmedUsername);

    if (existing) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const passwordHash = bcrypt.hashSync(password, 12);
    const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(trimmedUsername, passwordHash);

    logSecurityEvent('user_registered', trimmedUsername, req);

    res.status(201).json({
      id: result.lastInsertRowid,
      username: trimmedUsername,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/**
 * POST /api/auth/logout
 * Clear the httpOnly JWT cookie.
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.json({ message: 'Logged out successfully.' });
});

/**
 * POST /api/auth/refresh
 * Refresh the JWT token. Reads the current token from the cookie,
 * verifies it, and issues a new one with a fresh 24h expiration.
 */
router.post('/refresh', (req, res) => {
  try {
    // L2: Proper bearer token extraction
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const parts = authHeader.split(' ');
      token = parts[0]?.toLowerCase() === 'bearer' ? parts[1] : null;
    }
    if (!token) {
      token = req.cookies?.token || null;
    }

    if (!token) {
      return res.status(401).json({ error: 'No token provided.' });
    }

    // C2: Pin algorithm
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

    // H2: Max session age check - reject tokens older than 7 days
    if (decoded.iat && (Math.floor(Date.now() / 1000) - decoded.iat) > MAX_SESSION_AGE_SECONDS) {
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      return res.status(401).json({ error: 'Session has expired. Please log in again.' });
    }

    // H1+H2: Verify user still exists in DB and check token version
    const db = getDb();
    const user = db.prepare('SELECT id, username, token_version FROM users WHERE id = ?').get(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User no longer exists.' });
    }
    if (decoded.tokenVersion !== user.token_version) {
      return res.status(401).json({ error: 'Token has been revoked. Please log in again.' });
    }

    const newToken = jwt.sign(
      { id: user.id, username: user.username, tokenVersion: user.token_version },
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '24h' }
    );

    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ token: newToken });
  } catch (err) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
});

/**
 * GET /api/auth/me
 * Get current authenticated user info.
 */
router.get('/me', authenticate, (req, res) => {
  try {
    const db = getDb();
    const user = db.prepare('SELECT id, username, created_at FROM users WHERE id = ?').get(req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
