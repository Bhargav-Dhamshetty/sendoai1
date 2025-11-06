/**
 * testEmail.js
 * Brevo SMTP Email Test Script
 * Tests email configuration and sends a test alert
 */

require('dotenv').config();
const nodemailer = require('nodemailer');

/**
 * Main function to test email sending
 */
async function testBrevoEmail() {
  console.log('\n🚀 Testing Brevo SMTP Configuration...\n');

  // Validate environment variables
  const requiredEnvVars = [
    'EMAIL_HOST',
    'EMAIL_PORT',
    'EMAIL_USER',
    'EMAIL_PASSWORD',
    'ALERT_EMAIL_TO',
    'ALERT_EMAIL_FROM'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    process.exit(1);
  }

  // Display configuration (mask password)
  console.log('📧 Email Configuration:');
  console.log(`   Host: ${process.env.EMAIL_HOST}`);
  console.log(`   Port: ${process.env.EMAIL_PORT}`);
  console.log(`   User: ${process.env.EMAIL_USER}`);
  console.log(`   Password: ${'*'.repeat(process.env.EMAIL_PASSWORD.length)}`);
  console.log(`   From: ${process.env.ALERT_EMAIL_FROM}`);
  console.log(`   To: ${process.env.ALERT_EMAIL_TO}\n`);

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // Allow self-signed certificates
    }
  });

  // Verify connection configuration
  console.log('🔍 Verifying SMTP connection...');
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!\n');
  } catch (error) {
    console.error('❌ SMTP connection verification failed:');
    console.error(`   Error: ${error.message}`);
    if (error.code) {
      console.error(`   Code: ${error.code}`);
    }
    if (error.command) {
      console.error(`   Command: ${error.command}`);
    }
    process.exit(1);
  }

  // Prepare test email
  const mailOptions = {
    from: `"Sendora AI Alert" <${process.env.ALERT_EMAIL_FROM}>`,
    to: process.env.ALERT_EMAIL_TO,
    subject: '🚨 Rate Limit Alert: GEMINI_KEY_TEST - Sendora AI',
    text: 'This is a test email to verify Brevo SMTP configuration.',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-radius: 0 0 10px 10px;
          }
          .badge {
            display: inline-block;
            background: #ff4444;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
          }
          .info-box {
            background: white;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
          }
          .success {
            color: #28a745;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚨 Sendora AI Alert</h1>
          <div class="badge">TEST EMAIL</div>
        </div>
        
        <div class="content">
          <h2>Brevo SMTP Configuration Test</h2>
          
          <div class="info-box">
            <p><strong>Test Status:</strong> <span class="success">✅ SUCCESS</span></p>
            <p><strong>API Key:</strong> GEMINI_KEY_TEST</p>
            <p><strong>Alert Type:</strong> Rate Limit Exceeded</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          </div>
          
          <p>This is a <strong>test email</strong> to verify your Brevo SMTP configuration is working correctly.</p>
          
          <p>If you're seeing this email, it means:</p>
          <ul>
            <li>✅ Brevo SMTP connection is successful</li>
            <li>✅ Authentication credentials are valid</li>
            <li>✅ Email delivery is working</li>
            <li>✅ Your alert system is operational</li>
          </ul>
          
          <p><strong>Next Steps:</strong></p>
          <p>Your Sendora AI server is now ready to send real-time alerts when API keys hit rate limits. No further action required!</p>
        </div>
        
        <div class="footer">
          <p>Sendora AI - Gemini Key Rotating Prompt Server</p>
          <p>Powered by Brevo SMTP | ${new Date().getFullYear()}</p>
        </div>
      </body>
      </html>
    `
  };

  // Send email
  console.log('📤 Sending test email...');
  try {
    const info = await transporter.sendMail(mailOptions);
    
    console.log('\n✅ Email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    
    if (info.accepted && info.accepted.length > 0) {
      console.log(`   Accepted: ${info.accepted.join(', ')}`);
    }
    
    if (info.rejected && info.rejected.length > 0) {
      console.log(`   Rejected: ${info.rejected.join(', ')}`);
    }
    
    console.log(`   Response: ${info.response}`);
    console.log('\n🎉 Check your inbox at: ' + process.env.ALERT_EMAIL_TO);
    console.log('   (Don\'t forget to check spam/junk folder!)\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed to send email!');
    console.error('\n📋 Full Error Details:');
    console.error('─────────────────────────────────────');
    console.error(error);
    console.error('─────────────────────────────────────');
    
    if (error.code) {
      console.error(`\n🔍 Error Code: ${error.code}`);
    }
    
    if (error.command) {
      console.error(`🔍 Failed Command: ${error.command}`);
    }
    
    if (error.response) {
      console.error(`🔍 Server Response: ${error.response}`);
    }
    
    // Common error solutions
    console.error('\n💡 Troubleshooting Tips:');
    console.error('   1. Verify EMAIL_USER and EMAIL_PASSWORD in .env');
    console.error('   2. Check if Brevo SMTP is enabled for your account');
    console.error('   3. Ensure your IP is not blocked by Brevo');
    console.error('   4. Verify sender email is authorized in Brevo');
    console.error('   5. Check Brevo API key has SMTP permissions\n');
    
    process.exit(1);
  }
}

// Execute test
testBrevoEmail().catch(error => {
  console.error('\n💥 Unexpected error occurred:');
  console.error(error);
  process.exit(1);
});
