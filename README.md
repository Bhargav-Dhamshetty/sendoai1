# 🚀 Sendora AI - Gemini Key Rotating Prompt Server

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A production-grade Node.js + Express backend API with **intelligent Google Gemini API key rotation**, **automatic rate limit handling**, and **email alerts**. Built for high-availability AI applications.

## ✨ Features

- 🔄 **Intelligent Key Rotation**: Automatic round-robin rotation across multiple Gemini API keys
- ⚡ **Rate Limit Handling**: Seamless failover when keys hit quota limits
- 📧 **Email Alerts**: Automatic notifications for specific keys (#5, #8, #10) via Nodemailer
- 📊 **Usage Statistics**: Track requests, success rates, and key performance
- 🛡️ **Production-Ready**: Comprehensive error handling, logging, and validation
- 🚀 **Vercel Deployment**: Ready for serverless deployment with zero configuration
- 🔧 **Modular Architecture**: Clean separation of concerns with services and utilities

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🔧 Installation

### Prerequisites

- Node.js 18+ installed
- Multiple Google Gemini API keys ([Get them here](https://makersuite.google.com/app/apikey))
- Gmail account with App Password (for email alerts)

### Step 1: Clone or Download

```bash
cd sendo
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Edit `.env` and add your API keys:

```env
# Add at least 10 Gemini API keys
GEMINI_KEY_1=AIzaSy...your_real_key_1
GEMINI_KEY_2=AIzaSy...your_real_key_2
GEMINI_KEY_3=AIzaSy...your_real_key_3
# ... add up to GEMINI_KEY_10

# Email configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ALERT_EMAIL_TO=admin@sendora.ai

# Server configuration
PORT=3000
NODE_ENV=development
```

### Step 4: Generate Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Factor Authentication**
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a new app password for "Mail"
5. Copy the 16-character password to `EMAIL_PASSWORD` in `.env`

### Step 5: Start the Server

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

You should see:

```
✅ KeyManager initialized with 10 API keys
✅ Email service initialized successfully
✅ Server started successfully!

📡 Server running on port 3000
🌍 Local: http://localhost:3000
```

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `GEMINI_KEY_1` to `GEMINI_KEY_10` | Google Gemini API keys | ✅ Yes (at least 1) | - |
| `EMAIL_SERVICE` | Email service provider | ❌ No | `gmail` |
| `EMAIL_USER` | Sender email address | ❌ No (if alerts disabled) | - |
| `EMAIL_PASSWORD` | Email app password | ❌ No (if alerts disabled) | - |
| `ALERT_EMAIL_TO` | Alert recipient email | ❌ No | Same as `EMAIL_USER` |
| `PORT` | Server port | ❌ No | `3000` |
| `NODE_ENV` | Environment mode | ❌ No | `development` |
| `GEMINI_MODEL` | Gemini model to use | ❌ No | `gemini-1.5-flash` |

### Supported Gemini Models

- `gemini-1.5-flash` (default, fastest)
- `gemini-1.5-pro` (more powerful)
- `gemini-pro` (legacy)

## 📖 API Documentation

### Base URL

```
http://localhost:3000
```

---

### 1. **POST** `/generate`

Generate AI response from a text prompt.

#### Request Body

```json
{
  "prompt": "Write a short poem about artificial intelligence"
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "response": "In circuits deep and silicon minds...",
  "keyUsed": "GEMINI_KEY_3",
  "time": "2025-11-04T10:30:45.123Z",
  "duration": "1247ms",
  "model": "gemini-1.5-flash",
  "requestId": "req_1730712645123_abc123",
  "metadata": {
    "promptLength": 48,
    "responseLength": 256
  }
}
```

#### Error Response (400/500/503)

```json
{
  "success": false,
  "error": "Prompt must be a non-empty string",
  "requestId": "req_1730712645123_abc123",
  "timestamp": "2025-11-04T10:30:45.123Z"
}
```

#### Example cURL

```bash
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain quantum computing in simple terms"}'
```

#### Example JavaScript (fetch)

```javascript
const response = await fetch('http://localhost:3000/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'What is the meaning of life?'
  })
});

const data = await response.json();
console.log(data.response);
```

---

### 2. **GET** `/health`

Check system health and key availability.

#### Response (200 OK)

```json
{
  "status": "healthy",
  "timestamp": "2025-11-04T10:30:45.123Z",
  "model": "gemini-1.5-flash",
  "keysAvailable": 8,
  "keyStats": {
    "totalKeys": 10,
    "availableKeys": 8,
    "rateLimitedKeys": ["GEMINI_KEY_5", "GEMINI_KEY_8"],
    "currentKey": "GEMINI_KEY_3"
  }
}
```

---

### 3. **GET** `/stats`

Get detailed usage statistics for all API keys.

#### Response (200 OK)

```json
{
  "success": true,
  "stats": {
    "totalKeys": 10,
    "availableKeys": 8,
    "rateLimitedKeys": ["GEMINI_KEY_5"],
    "alertedKeys": ["GEMINI_KEY_5"],
    "currentKey": "GEMINI_KEY_3",
    "keyStats": {
      "GEMINI_KEY_1": {
        "totalRequests": 45,
        "successfulRequests": 44,
        "failedRequests": 1,
        "rateLimitHits": 0,
        "firstRateLimitTime": null
      }
    }
  },
  "timestamp": "2025-11-04T10:30:45.123Z"
}
```

---

### 4. **POST** `/test-email`

Send a test email to verify email configuration.

#### Response (200 OK)

```json
{
  "success": true,
  "message": "Test email sent successfully",
  "messageId": "<abc123@gmail.com>",
  "timestamp": "2025-11-04T10:30:45.123Z"
}
```

---

### 5. **POST** `/reset-limits`

Reset rate limits for all API keys (admin/testing only).

#### Response (200 OK)

```json
{
  "success": true,
  "message": "All rate limits have been reset",
  "timestamp": "2025-11-04T10:30:45.123Z"
}
```

---

### 6. **POST** `/reset-limit/:keyName`

Reset rate limit for a specific key.

#### Example

```bash
curl -X POST http://localhost:3000/reset-limit/GEMINI_KEY_5
```

#### Response (200 OK)

```json
{
  "success": true,
  "message": "Rate limit reset for GEMINI_KEY_5",
  "timestamp": "2025-11-04T10:30:45.123Z"
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables from your `.env` file
   - Redeploy to apply changes

### Deploy to Other Platforms

#### Render

1. Connect your GitHub repository
2. Select "Web Service"
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in dashboard

#### Railway

```bash
npm install -g railway
railway login
railway init
railway up
```

## 📁 Project Structure

```
sendo/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment config
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
│
├── services/
│   └── geminiService.js  # Gemini API communication
│
└── utils/
    ├── keyManager.js     # API key rotation logic
    └── emailService.js   # Email alert system
```

### Key Components

#### `server.js`
Main Express application with routes and middleware.

#### `services/geminiService.js`
- `callGeminiAPI(prompt)` - Make API calls with retry logic
- `validatePrompt(prompt)` - Input validation
- `healthCheck()` - System health status

#### `utils/keyManager.js`
- `getActiveKey()` - Get current API key
- `rotateKeyOnError(keyName)` - Handle rate limit rotation
- `getStats()` - Usage statistics

#### `utils/emailService.js`
- `sendAlertEmail(alertData)` - Send email notifications
- `generateEmailTemplate()` - HTML email builder

## 🧪 Testing

### Test the API

```bash
# Test generate endpoint
curl -X POST http://localhost:3000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, AI!"}'

# Test health check
curl http://localhost:3000/health

# Test email alerts
curl -X POST http://localhost:3000/test-email
```

### Test Email Configuration

```bash
curl -X POST http://localhost:3000/test-email
```

Check your email inbox for the test alert.

## 🐛 Troubleshooting

### Issue: "No valid Gemini API keys found"

**Solution**: Make sure your `.env` file has at least one valid API key that doesn't contain placeholder text.

### Issue: Email alerts not working

**Solutions**:
1. Verify 2FA is enabled on your Gmail account
2. Generate a new App Password (not your regular password)
3. Check that `EMAIL_USER` and `EMAIL_PASSWORD` are set correctly
4. Test with: `curl -X POST http://localhost:3000/test-email`

### Issue: "All API keys are rate-limited"

**Solutions**:
1. Wait for quota reset (usually 1 minute for Gemini)
2. Add more API keys to `.env`
3. Manually reset: `curl -X POST http://localhost:3000/reset-limits`

### Issue: Rate limit errors not triggering alerts

**Cause**: Only keys #5, #8, and #10 trigger email alerts (by design).

**Solution**: Test with `GEMINI_KEY_5`, `GEMINI_KEY_8`, or `GEMINI_KEY_10` to verify alerts.

## 📊 Monitoring

### Check System Status

```bash
# Health check
curl http://localhost:3000/health

# Detailed statistics
curl http://localhost:3000/stats
```

### Log Files

Server logs are output to console. For production, consider using:
- **PM2** for process management
- **Winston** or **Bunyan** for structured logging
- **Sentry** for error tracking

## 🔒 Security Best Practices

1. ✅ **Never commit `.env` file** to version control
2. ✅ Use environment variables for all secrets
3. ✅ Enable CORS only for trusted domains in production
4. ✅ Implement rate limiting with `express-rate-limit`
5. ✅ Use HTTPS in production
6. ✅ Regularly rotate API keys

## 📝 License

ISC License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or feature requests:
- Create an issue on GitHub
- Email: support@sendora.ai

---

**Built with ❤️ by the Sendora AI Team**

⭐ Star this repository if you find it helpful!
