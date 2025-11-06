/**
 * Gemini API Service
 * Handles communication with Google Gemini API
 * Implements retry logic and rate limit detection
 */

const axios = require('axios');
require('dotenv').config();

const { getKeyManager } = require('../utils/keyManager');
const { getEmailService } = require('../utils/emailService');

// Gemini API Configuration
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const GEMINI_API_BASE_URL = process.env.GEMINI_API_BASE_URL || 
  'https://generativelanguage.googleapis.com/v1beta/models';

/**
 * Check if error is a rate limit error
 * @param {Error} error - Axios error object
 * @returns {Boolean} True if rate limit error
 */
function isRateLimitError(error) {
  if (!error.response) return false;
  
  const status = error.response.status;
  const data = error.response.data;
  
  // Check for rate limit status codes
  if (status === 429) return true;
  
  // Check for quota exceeded errors
  if (status === 403 && data?.error?.message) {
    const message = data.error.message.toLowerCase();
    return message.includes('quota') || 
           message.includes('rate limit') || 
           message.includes('exceeded');
  }
  
  return false;
}

/**
 * Call Gemini API with the provided prompt
 * Automatically handles key rotation on rate limit errors
 * @param {String} prompt - User prompt text
 * @param {Number} maxRetries - Maximum retry attempts (default: 3)
 * @returns {Promise<Object>} API response with generated content
 */
async function callGeminiAPI(prompt, maxRetries = 3) {
  const keyManager = getKeyManager();
  const emailService = getEmailService();
  
  let lastError = null;
  let attempts = 0;

  while (attempts < maxRetries) {
    attempts++;
    
    try {
      // Get current active key
      const currentKey = keyManager.getActiveKey();
      const apiKey = currentKey.value;
      const keyName = currentKey.name;

      console.log(`🚀 Attempt ${attempts}/${maxRetries} - Using ${keyName}`);

      // Construct API URL
      const url = `${GEMINI_API_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

      // Prepare request body
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      // Make API call
      const startTime = Date.now();
      const response = await axios.post(url, requestBody, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30 second timeout
      });

      const duration = Date.now() - startTime;

      // Extract generated text
      const generatedText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error('No content generated from API response');
      }

      // Record success
      keyManager.recordSuccess(keyName);

      console.log(`✅ API call successful with ${keyName} (${duration}ms)`);

      // Rotate to next key for load balancing
      keyManager.rotateToNextKey();

      return {
        success: true,
        response: generatedText,
        keyUsed: keyName,
        time: new Date().toISOString(),
        duration: `${duration}ms`,
        model: GEMINI_MODEL,
        promptLength: prompt.length,
        responseLength: generatedText.length
      };

    } catch (error) {
      lastError = error;
      const currentKey = keyManager.getActiveKey();
      const keyName = currentKey.name;

      console.error(`❌ API call failed with ${keyName}:`, error.message);

      // Check if it's a rate limit error
      if (isRateLimitError(error)) {
        console.log(`⚠️ Rate limit detected for ${keyName}`);
        
        // Record failure
        keyManager.recordFailure(keyName);

        // Rotate key and check if alert should be sent
        const rotationResult = keyManager.rotateKeyOnError(keyName);

        console.log(`🔄 Rotated to ${rotationResult.nextKey} (${rotationResult.availableKeysCount} keys available)`);

        // Send email alert if needed
        if (rotationResult.shouldAlert) {
          console.log(`📧 Sending email alert for ${keyName}...`);
          
          const alertData = {
            keyName: rotationResult.keyName,
            keyIndex: rotationResult.keyIndex,
            timestamp: new Date().toISOString(),
            availableKeysCount: rotationResult.availableKeysCount,
            rateLimitedCount: rotationResult.rateLimitedCount,
            nextKey: rotationResult.nextKey
          };

          // Send email asynchronously (don't wait)
          emailService.sendAlertEmail(alertData).catch(err => {
            console.error('Failed to send alert email:', err.message);
          });
        }

        // Check if we have more keys to try
        if (rotationResult.availableKeysCount === 0) {
          throw new Error('All API keys are rate-limited. Please try again later.');
        }

        // Retry with next key
        continue;
      } else {
        // Non-rate-limit error
        keyManager.recordFailure(keyName);
        
        // If it's a 4xx error (except 429), don't retry
        if (error.response && error.response.status >= 400 && error.response.status < 500) {
          throw new Error(`API Error: ${error.response.data?.error?.message || error.message}`);
        }

        // For 5xx errors, retry
        if (attempts < maxRetries) {
          console.log(`⏳ Retrying in 1 second...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
      }
    }
  }

  // All retries exhausted
  throw new Error(`Failed after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`);
}

/**
 * Validate prompt before sending to API
 * @param {String} prompt - User prompt to validate
 * @returns {Object} Validation result
 */
function validatePrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return {
      valid: false,
      error: 'Prompt must be a non-empty string'
    };
  }

  if (prompt.trim().length === 0) {
    return {
      valid: false,
      error: 'Prompt cannot be empty or whitespace only'
    };
  }

  if (prompt.length > 30000) {
    return {
      valid: false,
      error: 'Prompt is too long (max 30,000 characters)'
    };
  }

  return {
    valid: true
  };
}

/**
 * Get Gemini API service health status
 * @returns {Object} Health check result
 */
async function healthCheck() {
  try {
    const keyManager = getKeyManager();
    const stats = keyManager.getStats();

    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      model: GEMINI_MODEL,
      keysAvailable: stats.availableKeys,
      keyStats: stats
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

module.exports = {
  callGeminiAPI,
  validatePrompt,
  healthCheck,
  isRateLimitError
};
