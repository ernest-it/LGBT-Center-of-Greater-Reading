const jwt = require('jsonwebtoken');

/**
 * JWT authentication middleware.
 * Checks for a token in the Authorization header (Bearer) or in an httpOnly cookie.
 */
function authenticate(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Provide a Bearer token or valid session cookie.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, username }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = authenticate;
