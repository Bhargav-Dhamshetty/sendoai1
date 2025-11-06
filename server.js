/**
 * Sendora AI - Gemini Key Rotating Prompt Server
 * Main Express server with intelligent API key rotation
 * Built for production deployment on Vercel/Cursor
 * 
 * @author Sendora AI Team
 * @version 1.0.0
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { callGeminiAPI, validatePrompt, healthCheck } = require('./services/geminiService');
const { getKeyManager } = require('./utils/keyManager');
const { getEmailService } = require('./utils/emailService');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// MIDDLEWARE
// ==========================================

// Enable CORS for all origins (configure as needed for production)
app.use(cors());

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// ==========================================
// ROUTES
// ==========================================

/**
 * Root endpoint - API information
 */
app.get('/', (req, res) => {
  res.json({
    name: 'Sendora AI - Gemini Key Rotating Prompt Server',
    version: '1.0.0',
    description: 'Production-grade API with intelligent key rotation and email alerts',
    endpoints: {
      'POST /generate': 'Generate AI response from prompt',
      'GET /health': 'Health check and system status',
      'GET /stats': 'API key usage statistics',
      'POST /test-email': 'Send test email alert',
      'POST /reset-limits': 'Reset rate limits (admin only)'
    },
    documentation: 'https://github.com/sendora-ai',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /generate - Main endpoint for AI text generation
 * Body: { "prompt": "Your prompt text here" }
 */
app.post('/generate', async (req, res) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  try {
    console.log(`\n🎯 [${requestId}] New generation request received`);
    
    // Extract prompt from request body
    const { prompt } = req.body;

    // Validate prompt
    const validation = validatePrompt(prompt);
    if (!validation.valid) {
      console.log(`❌ [${requestId}] Validation failed: ${validation.error}`);
      return res.status(400).json({
        success: false,
        error: validation.error,
        requestId,
        timestamp: new Date().toISOString()
      });
    }

    console.log(`📝 [${requestId}] Prompt length: ${prompt.length} characters`);

    // Call Gemini API with automatic key rotation
    const result = await callGeminiAPI(prompt);

    console.log(`✅ [${requestId}] Response generated successfully`);

    // Try to extract JSON from the response if it's wrapped in markdown
    let processedResponse = result.response;
    try {
      // Check if response contains JSON wrapped in markdown code blocks
      const jsonMatch = result.response.match(/```json\s*([\s\S]*?)\s*```/) || 
                       result.response.match(/```\s*([\s\S]*?)\s*```/) ||
                       result.response.match(/(\{[\s\S]*\})/);
      
      if (jsonMatch) {
        const jsonString = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(jsonString.trim());
        processedResponse = parsed; // Return as object
        console.log(`📦 [${requestId}] Extracted JSON object from response`);
      }
    } catch (e) {
      // If JSON extraction fails, keep original response
      console.log(`ℹ️  [${requestId}] Response is plain text, not JSON: ${e.message}`);
    }

    // Return successful response
    res.json({
      success: true,
      response: processedResponse,
      keyUsed: result.keyUsed,
      time: result.time,
      duration: result.duration,
      model: result.model,
      requestId,
      metadata: {
        promptLength: result.promptLength,
        responseLength: result.responseLength
      }
    });

  } catch (error) {
    console.error(`❌ [${requestId}] Error:`, error.message);

    // Determine appropriate status code
    let statusCode = 500;
    if (error.message.includes('All API keys are rate-limited')) {
      statusCode = 503; // Service Unavailable
    } else if (error.message.includes('API Error')) {
      statusCode = 400; // Bad Request
    }

    res.status(statusCode).json({
      success: false,
      error: error.message,
      requestId,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /health - Health check endpoint
 * Returns system status and available keys
 */
app.get('/health', async (req, res) => {
  try {
    const health = await healthCheck();
    const statusCode = health.status === 'healthy' ? 200 : 503;
    
    res.status(statusCode).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * GET /stats - Get detailed API key usage statistics
 */
app.get('/stats', (req, res) => {
  try {
    const keyManager = getKeyManager();
    const stats = keyManager.getStats();

    res.json({
      success: true,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /test-email - Send test email alert
 * Useful for verifying email configuration
 */
app.post('/test-email', async (req, res) => {
  try {
    console.log('📧 Sending test email...');
    
    const emailService = getEmailService();
    const result = await emailService.sendTestEmail();

    if (result.success) {
      res.json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.reason || result.error,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /reset-limits - Reset rate limits for all keys
 * Use with caution - for admin/testing purposes only
 */
app.post('/reset-limits', (req, res) => {
  try {
    const keyManager = getKeyManager();
    keyManager.resetAllRateLimits();

    res.json({
      success: true,
      message: 'All rate limits have been reset',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * POST /reset-limit/:keyName - Reset rate limit for specific key
 * Example: POST /reset-limit/GEMINI_KEY_5
 */
app.post('/reset-limit/:keyName', (req, res) => {
  try {
    const { keyName } = req.params;
    const keyManager = getKeyManager();
    
    keyManager.resetRateLimit(keyName);

    res.json({
      success: true,
      message: `Rate limit reset for ${keyName}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// ==========================================
// ERROR HANDLING
// ==========================================

/**
 * 404 handler - Route not found
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// ==========================================
// SERVER INITIALIZATION
// ==========================================

/**
 * Start server
 */
function startServer() {
  try {
    // Initialize key manager and email service
    console.log('\n🚀 Initializing Sendora AI Server...\n');
    
    getKeyManager();
    getEmailService();

    // Start listening
    app.listen(PORT, () => {
      console.log('\n✅ Server started successfully!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📡 Server running on port ${PORT}`);
      console.log(`🌍 Local: http://localhost:${PORT}`);
      console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('📚 Available endpoints:');
      console.log(`   POST http://localhost:${PORT}/generate`);
      console.log(`   GET  http://localhost:${PORT}/health`);
      console.log(`   GET  http://localhost:${PORT}/stats`);
      console.log(`   POST http://localhost:${PORT}/test-email`);
      console.log(`   POST http://localhost:${PORT}/reset-limits\n`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Start server if running directly (not imported)
if (require.main === module) {
  startServer();
}

// Export app for Vercel serverless
module.exports = app;
