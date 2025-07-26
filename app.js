import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import pool from './db.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection test
app.use(async (req, res, next) => {
  try {
    if (req.path === '/api/health') {
      // Test database connection on health check
      await pool.query('SELECT 1');
    }
    next();
  } catch (error) {
    console.error('Database connection error:', error);
    if (req.path === '/api/health') {
      return res.status(503).json({ 
        status: 'error', 
        message: 'Database unavailable',
        success: false 
      });
    }
    next();
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbResult = await pool.query('SELECT NOW() as current_time');
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      dbTime: dbResult.rows[0].current_time,
      success: true
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      message: 'Database connection failed',
      timestamp: new Date().toISOString(),
      success: false 
    });
  }
});

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error:', error);
  res.status(500).json({
    error: 'Internal server error',
    success: false,
    ...(process.env.NODE_ENV === 'development' && { details: error.message })
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    success: false
  });
});

// Catch-all to serve index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

export default app; 