# 🚀 Quick Start Guide

Get up and running with Sendora AI in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment

1. Copy the example file:
```bash
copy .env.example .env
```

2. Edit `.env` and add your Gemini API keys:
   - Get keys from: https://makersuite.google.com/app/apikey
   - Add at least 3-5 keys for testing (up to 10 recommended)

```env
GEMINI_KEY_1=AIzaSy...your_actual_key_here
GEMINI_KEY_2=AIzaSy...your_actual_key_here
GEMINI_KEY_3=AIzaSy...your_actual_key_here
```

## Step 3: Configure Email (Optional)

For email alerts, add your Gmail credentials:

1. Enable 2FA: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
ALERT_EMAIL_TO=admin@sendora.ai
```

## Step 4: Start the Server

```bash
npm start
```

You should see:
```
✅ KeyManager initialized with X API keys
✅ Email service initialized successfully
✅ Server started successfully!
📡 Server running on port 3000
```

## Step 5: Test the API

Open a new terminal and run:

```bash
npm test
```

Or manually test with cURL:

```bash
curl -X POST http://localhost:3000/generate -H "Content-Type: application/json" -d "{\"prompt\": \"Hello, AI!\"}"
```

## 🎉 You're Done!

Your server is now running at `http://localhost:3000`

### Next Steps

- Test the `/generate` endpoint with different prompts
- Check `/health` to see system status
- View `/stats` for usage statistics
- Test email alerts with `/test-email`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/generate` | Generate AI response |
| GET | `/health` | System health check |
| GET | `/stats` | Usage statistics |
| POST | `/test-email` | Test email alerts |

### Example Request

```javascript
fetch('http://localhost:3000/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt: 'Explain AI in simple terms' })
})
.then(res => res.json())
.then(data => console.log(data.response));
```

## 📚 Need Help?

- Read the full [README.md](README.md)
- Check [Troubleshooting](#troubleshooting) section
- Create an issue on GitHub

---

Happy coding! 🚀
