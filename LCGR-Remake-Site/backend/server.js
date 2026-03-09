require('dotenv').config();

// --- JWT Secret Validation ---
const DEFAULT_JWT_SECRET = 'lcgr-site-secret-key-change-in-production';
if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET === DEFAULT_JWT_SECRET) {
    console.error(
      'FATAL: JWT_SECRET is not set or is still the default value.\n' +
      'You MUST set a strong, unique JWT_SECRET environment variable in production.\n' +
      'Generate one with: openssl rand -base64 32'
    );
    process.exit(1);
  }
} else if (!process.env.JWT_SECRET || process.env.JWT_SECRET === DEFAULT_JWT_SECRET) {
  console.warn(
    'WARNING: Using default JWT secret. This is acceptable for local development only.\n' +
    'Set a strong JWT_SECRET before deploying to production.'
  );
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const createTables = require('./database/schema');

// Import routes
const authRoutes = require('./routes/auth');
const bannerRoutes = require('./routes/banners');
const newsEventsRoutes = require('./routes/newsEvents');
const staticContentRoutes = require('./routes/staticContent');
const teamRoutes = require('./routes/team');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---

// Security headers
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Request logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Cookie parser (for httpOnly JWT cookies)
app.use(cookieParser());

// Rate limiting on login endpoint (10 attempts per 15 min)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/login', loginLimiter);
app.use('/api/auth/setup', loginLimiter);

// CORS: read allowed origins from environment variable
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json({ limit: '1mb' }));

// Serve uploaded files as static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Initialize Database ---
createTables();

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/news-events', newsEventsRoutes);
app.use('/api/content', staticContentRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error.' });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`LGBT Center Backend API running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
