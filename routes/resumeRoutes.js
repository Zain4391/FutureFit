import express from 'express';
import multer from 'multer';
import path from 'path';
import { analyzeResume } from '../controllers/resumeController.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST /api/resume/upload
router.post('/upload', upload.single('resume'), analyzeResume);

export default router; 