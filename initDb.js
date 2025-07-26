import pool from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const initializeDatabase = async () => {
  try {
    console.log('🔧 Initializing database tables...');
    
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      )
    `);

    // Create resumes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resumes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        filename VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        content TEXT,
        score INTEGER DEFAULT 0,
        analysis_result JSONB,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create user sessions table for better security
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_sessions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        token_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL,
        is_active BOOLEAN DEFAULT true
      )
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON user_sessions(user_id);
    `);

    console.log('✅ Database tables initialized successfully!');
    
    // Test the connection
    const result = await pool.query('SELECT NOW() as current_time');
    console.log('🕒 Database connection test:', result.rows[0].current_time);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

// Run initialization if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}

export default initializeDatabase;
