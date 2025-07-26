# FutureFit Backend - Neon PostgreSQL Setup

## 🚀 Quick Start with Neon PostgreSQL

### 1. Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up or log in
3. Create a new project
4. Copy your connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### 2. Environment Setup

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Update your `.env` file with your Neon database URL:
   ```env
   DATABASE_URL=postgresql://your_neon_connection_string_here
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   PORT=5000
   NODE_ENV=development
   ```

### 3. Install Dependencies and Initialize Database

```bash
# Install all dependencies
npm install

# Initialize database tables
npm run init-db

# Or run both in one command
npm run setup
```

### 4. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - Logout user

### Health Check
- `GET /api/health` - Check server and database status

## 🔒 Authentication Flow

1. **Register**: Create a new user account
   ```json
   POST /api/auth/register
   {
     "username": "john_doe",
     "email": "john@example.com",
     "password": "securepassword123"
   }
   ```

2. **Login**: Get JWT token
   ```json
   POST /api/auth/login
   {
     "username": "john_doe",
     "password": "securepassword123"
   }
   ```

3. **Use Protected Routes**: Include token in Authorization header
   ```
   Authorization: Bearer your_jwt_token_here
   ```

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `created_at` - Account creation timestamp
- `last_login` - Last login timestamp
- `is_active` - Account status

### Resumes Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `filename` - Original filename
- `file_path` - Server file path
- `content` - Extracted text content
- `score` - Resume score
- `analysis_result` - JSON analysis data
- `uploaded_at` - Upload timestamp

## 🔧 Features

- ✅ ES6+ Modern JavaScript syntax
- ✅ Neon PostgreSQL serverless database
- ✅ JWT authentication with expiration
- ✅ Password hashing with bcrypt
- ✅ Database connection pooling
- ✅ Error handling and logging
- ✅ CORS configuration
- ✅ Health check endpoint
- ✅ Environment variable management
- ✅ Database initialization scripts

## 🧪 Testing with Postman

1. Test health check:
   ```
   GET http://localhost:5000/api/health
   ```

2. Register a user:
   ```
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json
   
   {
     "username": "testuser",
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. Login:
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "username": "testuser",
     "password": "password123"
   }
   ```

4. Access protected route:
   ```
   GET http://localhost:5000/api/auth/profile
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

## 🚨 Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens with expiration
- Input validation
- SQL injection protection with parameterized queries
- CORS configuration
- Error message sanitization
- Database user verification on each request

## 📦 Dependencies

- `@neondatabase/serverless` - Neon PostgreSQL driver
- `express` - Web framework
- `jsonwebtoken` - JWT implementation
- `bcryptjs` - Password hashing
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management
- `multer` - File upload handling

## 🔄 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## 🏗️ Project Structure

```
backend/
├── controllers/
│   └── authController.js     # Authentication logic
├── middleware/
│   └── auth.js              # JWT middleware
├── routes/
│   └── authRoutes.js        # Authentication routes
├── .env                     # Environment variables
├── .env.example            # Environment template
├── app.js                  # Express app configuration
├── db.js                   # Database connection
├── initDb.js              # Database initialization
├── package.json           # Dependencies and scripts
└── server.js              # Server startup
```
