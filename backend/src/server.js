import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Trust proxy for Render / Cloud load balancers (ensures express-rate-limit uses client IP)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// CORS configuration - support comma-separated origins, dev origins, and *.onrender.com
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];

const allowedOrigins = new Set([...defaultOrigins, ...envOrigins]);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, postman, render health checks)
      if (!origin) return callback(null, true);

      if (
        process.env.NODE_ENV !== 'production' ||
        allowedOrigins.has(origin) ||
        allowedOrigins.has('*') ||
        origin.endsWith('.onrender.com')
      ) {
        return callback(null, true);
      }
      return callback(new Error(`Blocked by CORS policy: Origin '${origin}' not permitted.`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Rate limiter for contact submissions (prevent spam)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // max 20 requests per IP
  message: {
    success: false,
    error: 'Too many messages sent from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for AI chat (stricter to conserve Groq free tier)
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: {
    success: false,
    error: 'Too many AI chat requests. Please wait a minute before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Prarthana Reddy Portfolio API',
    version: '1.0.0',
    status: 'active',
    endpoints: {
      health: 'GET /api/health',
      contact: 'POST /api/contact',
      chat: 'POST /api/chat',
    },
  });
});

// Mount routes
app.use('/api', contactRoutes);
app.use('/api/contact', contactLimiter);
app.use('/api/chat', chatLimiter);
app.use('/api', chatRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Express Server running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📩 Contact Endpoint: http://localhost:${PORT}/api/contact`);
});
