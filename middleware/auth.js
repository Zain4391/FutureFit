import jwt from 'jsonwebtoken';
import pool from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token is required',
        success: false 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Verify user still exists in database
    const userResult = await pool.query(
      'SELECT id, username, email, is_active FROM users WHERE id = $1',
      [decoded.id]
    );

    if (userResult.rows.length === 0 || !userResult.rows[0].is_active) {
      return res.status(401).json({ 
        error: 'Invalid or expired token',
        success: false 
      });
    }

    req.user = userResult.rows[0];
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Invalid token',
        success: false 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expired',
        success: false 
      });
    }

    console.error('Authentication middleware error:', error);
    return res.status(500).json({ 
      error: 'Authentication failed',
      success: false 
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const userResult = await pool.query(
        'SELECT id, username, email, is_active FROM users WHERE id = $1',
        [decoded.id]
      );

      if (userResult.rows.length > 0 && userResult.rows[0].is_active) {
        req.user = userResult.rows[0];
      }
    }

    next();
  } catch (error) {
    // For optional auth, we just continue without setting req.user
    next();
  }
};
