/**
 * Email Service Module
 * Sends alert emails when specific API keys hit rate limits
 * Uses Nodemailer with Gmail/SMTP configuration
 */

const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailService {
  constructor() {
    this.transporter = null;
    this.emailEnabled = this.initializeTransporter();
  }

  /**
   * Initialize Nodemailer transporter with environment config
   * @returns {Boolean} True if email is configured and ready
   */
  initializeTransporter() {
    try {
      const emailUser = process.env.EMAIL_USER;
      const emailPassword = process.env.EMAIL_PASSWORD;
      const emailService = process.env.EMAIL_SERVICE || 'gmail';
      const emailHost = process.env.EMAIL_HOST;
      const emailPort = process.env.EMAIL_PORT;

      if (!emailUser || !emailPassword) {
        console.warn('⚠️ Email credentials not configured. Email alerts will be disabled.');
        return false;
      }

      // Configure transporter based on service type
      let transportConfig;

      if (emailHost && emailPort) {
        // Custom SMTP configuration (Brevo, SendGrid, etc.)
        transportConfig = {
          host: emailHost,
          port: parseInt(emailPort),
          secure: false, // Use TLS
          auth: {
            user: emailUser,
            pass: emailPassword
          }
        };
        console.log(`📧 Using custom SMTP: ${emailHost}:${emailPort}`);
      } else {
        // Gmail or other predefined service
        transportConfig = {
          service: emailService,
          auth: {
            user: emailUser,
            pass: emailPassword
          }
        };
        console.log(`📧 Using email service: ${emailService}`);
      }

      this.transporter = nodemailer.createTransport(transportConfig);

      console.log('✅ Email service initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error.message);
      return false;
    }
  }

  /**
   * Send alert email for rate-limited API keys
   * Only triggers for keys #5, #8, and #10
   * @param {Object} alertData - Data about the rate-limited key
   * @returns {Promise<Object>} Email send result
   */
  async sendAlertEmail(alertData) {
    if (!this.emailEnabled) {
      console.log('📧 Email alerts disabled - skipping alert');
      return { success: false, reason: 'Email not configured' };
    }

    const { keyName, keyIndex, timestamp, availableKeysCount, rateLimitedCount } = alertData;

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ALERT_EMAIL_TO || process.env.EMAIL_USER,
        subject: `🚨 Rate Limit Alert: ${keyName} - Sendora AI`,
        html: this.generateEmailTemplate(alertData)
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      console.log(`✅ Alert email sent for ${keyName} - Message ID: ${info.messageId}`);
      
      return {
        success: true,
        messageId: info.messageId,
        keyName,
        timestamp
      };
    } catch (error) {
      console.error(`❌ Failed to send alert email for ${keyName}:`, error.message);
      return {
        success: false,
        error: error.message,
        keyName
      };
    }
  }

  /**
   * Generate HTML email template for rate limit alerts
   * @param {Object} alertData - Data about the rate-limited key
   * @returns {String} HTML email content
   */
  generateEmailTemplate(alertData) {
    const {
      keyName,
      keyIndex,
      timestamp = new Date().toISOString(),
      availableKeysCount,
      rateLimitedCount,
      nextKey
    } = alertData;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
          }
          .alert-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
          }
          .info-item {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
          }
          .info-label {
            font-size: 12px;
            color: #6c757d;
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 5px;
          }
          .info-value {
            font-size: 18px;
            color: #212529;
            font-weight: bold;
          }
          .footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            color: #6c757d;
            font-size: 12px;
          }
          .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            background-color: #dc3545;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 Rate Limit Alert</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Sendora AI - Gemini API Monitoring</p>
          </div>
          
          <div class="content">
            <div class="alert-box">
              <strong>⚠️ Action Required:</strong> API Key <strong>${keyName}</strong> has hit its rate limit and has been automatically rotated.
            </div>

            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Affected Key</div>
                <div class="info-value">${keyName}</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Key Index</div>
                <div class="info-value">#${keyIndex}</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Timestamp</div>
                <div class="info-value">${new Date(timestamp).toLocaleString()}</div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value">
                  <span class="status-badge">RATE LIMITED</span>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Available Keys</div>
                <div class="info-value" style="color: ${availableKeysCount > 2 ? '#28a745' : '#dc3545'};">
                  ${availableKeysCount} / ${rateLimitedCount + availableKeysCount}
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-label">Next Active Key</div>
                <div class="info-value" style="font-size: 14px;">${nextKey || 'Rotating...'}</div>
              </div>
            </div>

            <h3>📊 What This Means:</h3>
            <ul>
              <li>The system has automatically switched to the next available API key</li>
              <li>No user requests were dropped - seamless failover completed</li>
              <li>${availableKeysCount > 0 
                  ? `You still have <strong>${availableKeysCount}</strong> working key${availableKeysCount !== 1 ? 's' : ''} available` 
                  : '⚠️ <strong>WARNING:</strong> All keys are rate-limited! System may experience issues.'
                }</li>
            </ul>

            <h3>🔧 Recommended Actions:</h3>
            <ol>
              <li>Check your Gemini API quota at <a href="https://makersuite.google.com/app/apikey">Google AI Studio</a></li>
              <li>Consider upgrading API limits if usage is consistently high</li>
              <li>Monitor the system dashboard for additional alerts</li>
              ${availableKeysCount <= 2 ? '<li><strong>⚠️ URGENT:</strong> Add more API keys to prevent service disruption</li>' : ''}
            </ol>
          </div>

          <div class="footer">
            <p><strong>Sendora AI - Automated Monitoring System</strong></p>
            <p>This is an automated alert from your Gemini Key Rotating Prompt Server</p>
            <p style="margin-top: 10px;">
              🔗 <a href="https://github.com/sendora-ai">GitHub</a> | 
              📧 <a href="mailto:${process.env.EMAIL_USER}">Support</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Send test email to verify configuration
   * @returns {Promise<Object>} Test result
   */
  async sendTestEmail() {
    if (!this.emailEnabled) {
      return { success: false, reason: 'Email not configured' };
    }

    const testData = {
      keyName: 'GEMINI_KEY_TEST',
      keyIndex: 99,
      timestamp: new Date().toISOString(),
      availableKeysCount: 5,
      rateLimitedCount: 3,
      nextKey: 'GEMINI_KEY_6'
    };

    try {
      const result = await this.sendAlertEmail(testData);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Singleton instance
let emailServiceInstance = null;

/**
 * Get or create EmailService singleton instance
 * @returns {EmailService} EmailService instance
 */
function getEmailService() {
  if (!emailServiceInstance) {
    emailServiceInstance = new EmailService();
  }
  return emailServiceInstance;
}

module.exports = {
  getEmailService,
  EmailService
};
