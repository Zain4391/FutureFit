import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
      return res.status(400).json({ 
        error: 'Username, email, and password are required.',
        success: false 
      });
    }

    // Check if user already exists
    const userExists = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({ 
        error: 'Username or email already exists.',
        success: false 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new user
    await pool.query(
      'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW())',
      [username, email, hashedPassword]
    );

    res.status(201).json({ 
      message: 'User registered successfully.',
      success: true 
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Internal server error during registration.',
      success: false 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        error: 'Username and password are required.',
        success: false 
      });
    }

    // Find user by username or email
    const userRes = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [username]
    );

    const user = userRes.rows[0];
    
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid credentials.',
        success: false 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        error: 'Invalid credentials.',
        success: false 
      });
    }

    // Update last login
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        username: user.username,
        email: user.email 
      }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    );

    res.json({ 
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      success: true 
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during login.',
      success: false 
    });
  }
};

export const profile = (req, res) => {
  res.json({ 
    user: req.user,
    success: true 
  });
}; 