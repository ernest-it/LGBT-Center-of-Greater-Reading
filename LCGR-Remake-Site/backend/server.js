require('dotenv').config();

// --- JWT Secret Validation ---
if (!process.env.JWT_SECRET) {
  console.error(
    'FATAL: JWT_SECRET environment variable is not set.\n' +
    'You MUST set a strong, unique JWT_SECRET environment variable before starting the server.\n' +
    'Generate one with: openssl rand -base64 32'
  );
  process.exit(1);
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

// General API rate limiter: 100 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

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
app.use('/api/auth/refresh', loginLimiter);

// Upload rate limiter: 10 requests per hour per IP
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many upload requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/upload', uploadLimiter);

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
