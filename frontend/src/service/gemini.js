import { GoogleGenerativeAI } from "@google/generative-ai";

// Improved prompt with better structure and clearer requirements
const resumePrompt = `Analyze the following resume and return ONLY a valid JSON object with these exact fields:

{
  "keywords": ["keyword1", "keyword2"],
  "skills": ["skill1", "skill2"],
  "description": "Brief professional summary",
  "field": "Primary field/industry",
  "suggestedCertifications": ["cert1", "cert2"],
  "degreePrograms": ["bachelor program", "master program"],
  "predictedYear": 2030,
  "aiTools": ["tool1", "tool2"]
}

Requirements:
- keywords: Extract 5-10 relevant professional keywords
- skills: List technical and soft skills
- description: 2-3 sentence professional summary
- field: Primary industry/domain (e.g., "Software Engineering", "Marketing")
- suggestedCertifications: Relevant certifications for career advancement
- degreePrograms: Include both bachelor's and master's program suggestions
- predictedYear: Must be a range like 12+ or 10+ representing potential AI displacement
- aiTools: Must be field-relevant AI tools to help improve skills

Return ONLY the JSON object, no markdown formatting, backticks, or extra text.`;

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(apiKey);

// Rate limiting and quota management
const QUOTA_MANAGER = {
  lastRequestTime: 0,
  requestCount: 0,
  dailyRequestCount: parseInt(localStorage.getItem('gemini_daily_requests') || '0'),
  lastResetDate: localStorage.getItem('gemini_last_reset') || new Date().toDateString(),
  
  // Free tier limits
  MAX_REQUESTS_PER_MINUTE: 15,
  MAX_REQUESTS_PER_DAY: 1500,
  MIN_REQUEST_INTERVAL: 4000, // 4 seconds between requests
  
  canMakeRequest() {
    const now = Date.now();
    const today = new Date().toDateString();
    
    // Reset daily counter if it's a new day
    if (this.lastResetDate !== today) {
      this.dailyRequestCount = 0;
      this.lastResetDate = today;
      localStorage.setItem('gemini_daily_requests', '0');
      localStorage.setItem('gemini_last_reset', today);
    }
    
    // Check daily limit
    if (this.dailyRequestCount >= this.MAX_REQUESTS_PER_DAY) {
      return { canRequest: false, reason: 'Daily quota exceeded', waitTime: null };
    }
    
    // Check time since last request
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
      const waitTime = this.MIN_REQUEST_INTERVAL - timeSinceLastRequest;
      return { canRequest: false, reason: 'Rate limited', waitTime };
    }
    
    return { canRequest: true };
  },
  
  recordRequest() {
    this.lastRequestTime = Date.now();
    this.requestCount++;
    this.dailyRequestCount++;
    localStorage.setItem('gemini_daily_requests', this.dailyRequestCount.toString());
  },
  
  getRemainingQuota() {
    return {
      daily: this.MAX_REQUESTS_PER_DAY - this.dailyRequestCount,
      resetTime: new Date(new Date().setHours(24, 0, 0, 0))
    };
  }
};

/**
 * Converts File to GoogleGenerativeAI file format
 * @param {File} file - The PDF file to convert
 * @returns {Promise<Object>} - File data in Gemini format
 */
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1]; // Remove data URL prefix
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const base64Data = await base64EncodedDataPromise;
  
  return {
    inlineData: {
      data: base64Data,
      mimeType: file.type,
    },
  };
}

/**
 * Validates the input resume file
 * @param {File} resume - The resume file to validate
 * @throws {Error} - If validation fails
 */
function validateResumeFile(resume) {
  if (!resume) {
    throw new Error('Resume file is required');
  }
  
  if (!(resume instanceof File)) {
    throw new Error('Resume must be a File object');
  }
  
  if (resume.type !== 'application/pdf') {
    throw new Error('Resume must be a PDF file');
  }
  
  if (resume.size > 20 * 1024 * 1024) { // 20MB limit for direct file upload
    throw new Error('Resume file too large (max 20MB)');
  }
  
  if (resume.size === 0) {
    throw new Error('Resume file is empty');
  }
}

/**
 * Cleans and parses the LLM response
 * @param {string} text - Raw response text from LLM
 * @returns {Object} - Parsed JSON object
 */
function parseAIResponse(text) {
  // Clean up potential markdown formatting and extra text
  let cleanText = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .replace(/^[^{]*({.*})[^}]*$/s, '$1') // Extract JSON if wrapped in text
    .trim();
  
  try {
    const parsed = JSON.parse(cleanText);
    
    // Validate required fields
    const requiredFields = [
      'keywords', 'skills', 'description', 'field', 
      'suggestedCertifications', 'degreePrograms', 'predictedYear', 'aiTools'
    ];
    
    for (const field of requiredFields) {
      if (!(field in parsed)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    
    // Validate data types
    if (!Array.isArray(parsed.keywords)) parsed.keywords = [];
    if (!Array.isArray(parsed.skills)) parsed.skills = [];
    if (!Array.isArray(parsed.suggestedCertifications)) parsed.suggestedCertifications = [];
    if (!Array.isArray(parsed.degreePrograms)) parsed.degreePrograms = [];
    if (!Array.isArray(parsed.aiTools)) parsed.aiTools = [];
    
    if (typeof parsed.description !== 'string') parsed.description = '';
    if (typeof parsed.field !== 'string') parsed.field = '';
    
    // Ensure predictedYear is a number
    if (typeof parsed.predictedYear !== 'number') {
      parsed.predictedYear = parseInt(parsed.predictedYear) || 2030;
    }
    
    return parsed;
  } catch (parseError) {
    console.error("JSON parse error:", parseError);
    console.error("Raw response:", text);
    console.error("Cleaned text:", cleanText);
    throw new Error(`Failed to parse AI response as JSON: ${parseError.message}`);
  }
}

/**
 * Creates a mock response for demo purposes
 * @param {string} fileName - Name of the uploaded file
 * @returns {Object} - Mock resume analysis
 */
function createMockResponse(fileName) {
  const mockResponses = [
    {
      keywords: ["JavaScript", "React", "Node.js", "API Development", "Database Design", "Agile", "Problem Solving"],
      skills: ["Frontend Development", "Backend Development", "Database Management", "Version Control", "Testing", "Communication"],
      description: "Experienced software developer with strong expertise in full-stack web development. Proven track record in building scalable applications and working in collaborative team environments.",
      field: "Software Engineering",
      suggestedCertifications: ["AWS Solutions Architect", "React Developer Certification", "MongoDB Certified Developer"],
      degreePrograms: ["Bachelor's in Computer Science", "Master's in Software Engineering", "Master's in Data Science"],
      predictedYear: 2035,
      aiTools: ["GitHub Copilot", "ChatGPT for Code Review", "Tabnine", "DeepCode", "Sourcery"]
    },
    {
      keywords: ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Social Media", "Brand Management"],
      skills: ["Marketing Strategy", "Data Analysis", "Content Creation", "Project Management", "Customer Research"],
      description: "Creative marketing professional with expertise in digital campaigns and brand development. Strong analytical skills with experience in data-driven marketing decisions.",
      field: "Digital Marketing",
      suggestedCertifications: ["Google Analytics Certified", "HubSpot Content Marketing", "Facebook Blueprint Certification"],
      degreePrograms: ["Bachelor's in Marketing", "Master's in Digital Marketing", "MBA in Marketing"],
      predictedYear: 2040,
      aiTools: ["Jasper AI", "Copy.ai", "Canva AI", "Hootsuite Insights", "SEMrush AI"]
    }
  ];
  
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}

/**
 * Retry mechanism with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} - Result of the function
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      // Check if it's a quota error
      if (error.message.includes('quota') || error.message.includes('429')) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Quota exceeded, waiting ${delay}ms before retry ${attempt}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Non-quota errors shouldn't be retried
      }
    }
  }
}

/**
 * Processes a resume PDF file using Gemini AI with quota management and fallbacks
 * @param {File} resume - PDF file containing the resume
 * @returns {Promise<Object>} - Structured resume data
 * @throws {Error} - If processing fails
 */
export const processResume = async (resume) => {
  try {
    // Validate input
    validateResumeFile(resume);
    
    // Check if API key is available
    if (!apiKey) {
      console.warn('Gemini API key not found. Using mock response.');
      return createMockResponse(resume.name);
    }
    
    // Check quota before making request
    const quotaCheck = QUOTA_MANAGER.canMakeRequest();
    if (!quotaCheck.canRequest) {
      if (quotaCheck.reason === 'Daily quota exceeded') {
        const remaining = QUOTA_MANAGER.getRemainingQuota();
        throw new Error(`Daily quota exceeded. Resets at ${remaining.resetTime.toLocaleTimeString()}. Using demo mode.`);
      } else if (quotaCheck.reason === 'Rate limited') {
        console.log(`Rate limited, waiting ${quotaCheck.waitTime}ms`);
        await new Promise(resolve => setTimeout(resolve, quotaCheck.waitTime));
      }
    }
    
    console.log('Converting PDF for Gemini AI...');
    const filePart = await fileToGenerativePart(resume);
    
    console.log('Sending PDF to Gemini AI for analysis...');
    
    // Record the request
    QUOTA_MANAGER.recordRequest();
    
    const processWithGemini = async () => {
      // Try gemini-1.5-flash first (higher quota)
      let model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2048,
        }
      });
      
      try {
        const result = await model.generateContent([resumePrompt, filePart]);
        const response = await result.response;
        return await response.text();
      } catch (flashError) {
        if (flashError.message.includes('quota') || flashError.message.includes('429')) {
          console.log('Flash model quota exceeded, trying Pro model...');
          
          // Fallback to gemini-1.5-pro
          model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-pro",
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 2048,
            }
          });
          
          const result = await model.generateContent([resumePrompt, filePart]);
          const response = await result.response;
          return await response.text();
        }
        throw flashError;
      }
    };
    
    // Use retry mechanism
    const text = await retryWithBackoff(processWithGemini, 2, 5000);
    
    console.log('Parsing AI response...');
    const parsedData = parseAIResponse(text);
    
    console.log('Resume processing completed successfully');
    return parsedData;
    
  } catch (error) {
    console.error("Error processing resume:", error);
    
    // Provide fallback for quota errors
    if (error.message.includes('quota') || error.message.includes('429') || error.message.includes('API key')) {
      console.log('Using mock response due to quota limits');
      return {
        ...createMockResponse(resume?.name || 'resume.pdf'),
        _isMockData: true,
        _error: 'Using demo data due to API limitations'
      };
    }
    
    // Re-throw with more context
    if (error.message.includes('PDF') || error.message.includes('file')) {
      throw new Error('File processing error: ' + error.message);
    } else if (error.message.includes('JSON')) {
      throw new Error('AI response parsing error: ' + error.message);
    } else {
      throw new Error('Resume processing failed: ' + error.message);
    }
  }
};

/**
 * Gets current quota status
 * @returns {Object} - Quota information
 */
export const getQuotaStatus = () => {
  return QUOTA_MANAGER.getRemainingQuota();
};

/**
 * Gets the supported file types
 * @returns {Array<string>} - Array of supported MIME types
 */
export const getSupportedFileTypes = () => {
  return ['application/pdf'];
};

/**
 * Validates if a file is supported
 * @param {File} file - File to validate
 * @returns {boolean} - True if supported
 */
export const isFileSupported = (file) => {
  return file && file instanceof File && file.type === 'application/pdf';
};