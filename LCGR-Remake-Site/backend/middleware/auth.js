const jwt = require('jsonwebtoken');
const getDb = require('../database/db');

/**
 * JWT authentication middleware.
 * Checks for a token in the Authorization header (Bearer) or in an httpOnly cookie.
 */
function authenticate(req, res, next) {
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
    return res.status(401).json({ error: 'Authentication required. Provide a Bearer token or valid session cookie.' });
  }

  try {
    // C2: Pin JWT algorithm to HS256
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });

    // H1: Check token version against DB
    const db = getDb();
    const user = db.prepare('SELECT token_version FROM users WHERE id = ?').get(decoded.id);
    if (!user || decoded.tokenVersion !== user.token_version) {
      return res.status(401).json({ error: 'Token has been revoked. Please log in again.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = authenticate;
