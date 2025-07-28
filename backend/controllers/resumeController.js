import express from 'express';
import multer from 'multer';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Configure multer for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// Controller function for PDF analysis
const analyzePDF = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({
        error: 'No PDF file uploaded',
        message: 'Please upload a PDF file'
      });
    }

    // Convert buffer to base64
    const pdfBase64Data = req.file.buffer.toString('base64');

    // Get custom prompt from request body (optional)
    const customPrompt = req.body.prompt || 
      "Analyze this PDF and extract key financial metrics in JSON format with the following structure: {summary, revenue, expenses, profit_margin, key_insights}";

    console.log('Processing PDF:', req.file.originalname);
    console.log('File size:', req.file.size, 'bytes');

    // Call Gemini API
    const result = await model.generateContent([
      customPrompt,
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: pdfBase64Data
        }
      }
    ]);

    const response = await result.response;
    const analysisResult = response.text();

    // Try to parse as JSON, fallback to plain text
    let parsedResult;
    try {
      parsedResult = JSON.parse(analysisResult);
    } catch (parseError) {
      parsedResult = {
        raw_response: analysisResult,
        note: 'Response was not in JSON format'
      };
    }

    // Return successful response
    res.status(200).json({
      success: true,
      filename: req.file.originalname,
      fileSize: req.file.size,
      analysis: parsedResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error analyzing PDF:', error);
    
    // Handle different types of errors
    if (error.message.includes('API key')) {
      return res.status(401).json({
        error: 'Invalid API key',
        message: 'Please check your Gemini API key configuration'
      });
    }
    
    if (error.message.includes('quota') || error.message.includes('limit')) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        message: 'Please try again later'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Analysis failed',
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  }
};

// Route definition with file upload middleware
router.post('/api/upload', upload.single('pdf'), analyzePDF);

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'PDF file must be smaller than 10MB'
      });
    }
  }
  
  if (error.message === 'Only PDF files are allowed') {
    return res.status(400).json({
      error: 'Invalid file type',
      message: 'Only PDF files are accepted'
    });
  }

  res.status(500).json({
    error: 'Upload failed',
    message: error.message
  });
});

export default router;

