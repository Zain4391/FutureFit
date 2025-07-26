import express from 'express';
import { register, login, profile } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/profile (protected)
router.get('/profile', authenticateToken, profile);

// GET /api/auth/verify (check if token is valid)
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user,
    success: true 
  });
});

// POST /api/auth/logout (optional - for client-side token cleanup)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({ 
    message: 'Logged out successfully',
    success: true 
  });
});

export default router; 