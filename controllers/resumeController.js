import path from 'path';
import { parseResume } from '../services/resumeParser.js';
import { scoreResume } from '../services/scoringService.js';
import { getRecommendations } from '../services/recommendationService.js';

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const parsedData = await parseResume(filePath);
    const score = scoreResume(parsedData);
    const recommendations = getRecommendations(parsedData);

    res.json({
      filename: req.file.filename,
      score,
      recommendations,
      parsedData
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
}; 