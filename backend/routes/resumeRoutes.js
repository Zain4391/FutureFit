import express from 'express';
import { upload } from '../middleware/upload.js';
import { analyzeResume, healthCheck } from '../controllers/resumeController.js';

const router = express.Router();

// Health check route
router.get('/health', healthCheck);

// Resume analysis route
router.post('/analyze-resume', upload.single('resume'), analyzeResume);

export default router;
