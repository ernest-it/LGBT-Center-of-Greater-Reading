const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDb = require('../database/db');
const authenticate = require('../middleware/auth');

const router = express.Router();

/**
 * Password complexity validation.
 */
function validatePasswordComplexity(password) {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return 'Password must contain at least one special character.';
  return null;
}

/**
 * Account lockout tracking (in-memory, account-based).
 * Complements IP-based rate limiting with per-account protection.
 */
const failedAttempts = new Map(); // username -> { count, lockedUntil }
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

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

    const complexityError = validatePasswordComplexity(password);
    if (complexityError) {
      return res.status(400).json({ error: complexityError });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    const passwordHash = bcrypt.hashSync(password, 12);
    const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, passwordHash);

    const token = jwt.sign(
      { id: result.lastInsertRowid, username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      token,
      user: { id: result.lastInsertRowid, username },
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

    // Account lockout check
    const attempt = failedAttempts.get(username);
    if (attempt && attempt.lockedUntil && Date.now() < attempt.lockedUntil) {
      return res.status(429).json({ error: 'Account temporarily locked. Please try again later.' });
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      // Track failed attempt
      const current = failedAttempts.get(username) || { count: 0, lockedUntil: null };
      current.count += 1;
      if (current.count >= MAX_FAILED_ATTEMPTS) {
        current.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
        current.count = 0; // Reset count; lockout is now active
      }
      failedAttempts.set(username, current);
      return res.status(401).json({ error: 'Invalid username or password.' });
    }

    // Successful login — reset failed attempts
    failedAttempts.delete(username);

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

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

    const complexityError = validatePasswordComplexity(password);
    if (complexityError) {
      return res.status(400).json({ error: complexityError });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);

    if (existing) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const passwordHash = bcrypt.hashSync(password, 12);
    const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, passwordHash);

    res.status(201).json({
      id: result.lastInsertRowid,
      username,
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
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: 'No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
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
