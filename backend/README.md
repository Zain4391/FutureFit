# FutureFit Backend

A simple Node.js backend for the FutureFit resume analysis application.

## Features

- Resume file upload (PDF, TXT, DOCX)
- AI-powered resume analysis using Google Gemini
- RESTful API with minimal routes
- File validation and security
- CORS support for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the backend directory:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3001
```

3. Run the development server:
```bash
npm run dev
```

Or for production:
```bash
npm start
```

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns server status

### Resume Analysis
- **POST** `/api/analyze-resume`
- Upload resume file for AI analysis
- Body: `multipart/form-data` with `resume` file field
- Returns detailed analysis with scores and recommendations

## Getting Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add it to your `.env` file as `GEMINI_API_KEY`

## File Support

- **PDF**: Full text extraction
- **TXT**: Direct text reading  
- **DOCX**: Basic support (may need additional library)

## Response Format

The analysis endpoint returns:
```json
{
  "success": true,
  "fileName": "resume.pdf",
  "analysis": {
    "careerStrengthScore": 85,
    "futureReadinessScore": 78,
    "overallScore": 81.5,
    "skills": ["JavaScript", "React", "Node.js"],
    "experienceLevel": "mid",
    "recommendations": {
      "certifications": [...],
      "learningPrograms": [...],
      "aiTools": [...]
    },
    "improvements": [...],
    "careerGrowth": "...",
    "summary": "..."
  },
  "timestamp": "2025-07-28T..."
}
```

## Security Features

- File type validation
- File size limits (5MB)
- Automatic file cleanup after processing
- CORS protection
- Error handling
