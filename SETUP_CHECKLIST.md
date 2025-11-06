# ✅ Setup Checklist

Use this checklist to ensure your Sendora AI server is properly configured.

---

## 📋 Pre-Flight Checklist

### 1. Dependencies Installed
- [x] Node.js 18+ installed
- [x] npm packages installed (`npm install`)
- [ ] All dependencies working (no errors)

### 2. API Keys Configuration
- [ ] Obtained at least 3 Gemini API keys from https://makersuite.google.com/app/apikey
- [ ] Added keys to `.env` file (GEMINI_KEY_1, GEMINI_KEY_2, etc.)
- [ ] Verified keys are valid (not placeholder text)
- [ ] Recommended: Added 5-10 keys for better rotation

**Check:** At least one key in `.env` should start with `AIzaSy...`

### 3. Email Configuration (Optional but Recommended)
- [ ] Gmail account available for alerts
- [ ] 2-Factor Authentication enabled on Gmail
- [ ] App Password generated from https://myaccount.google.com/apppasswords
- [ ] `EMAIL_USER` set in `.env`
- [ ] `EMAIL_PASSWORD` set in `.env` (16-character app password)
- [ ] `ALERT_EMAIL_TO` set in `.env`

**Skip this if:** You don't need email alerts (server will work without it)

### 4. Environment Variables
Open `.env` and verify:

```env
# At least 3 keys with real values
✅ GEMINI_KEY_1=AIzaSy... (real key)
✅ GEMINI_KEY_2=AIzaSy... (real key)
✅ GEMINI_KEY_3=AIzaSy... (real key)

# Email settings (optional)
✅ EMAIL_USER=your-email@gmail.com
✅ EMAIL_PASSWORD=abcd efgh ijkl mnop (16 chars)
✅ ALERT_EMAIL_TO=recipient@email.com

# Server settings
✅ PORT=3000
✅ NODE_ENV=development
```

### 5. Test Server Startup
- [ ] Run `npm start`
- [ ] See message: "✅ KeyManager initialized with X API keys"
- [ ] See message: "✅ Email service initialized successfully" (or warning if disabled)
- [ ] See message: "✅ Server started successfully!"
- [ ] No error messages in console

### 6. Test API Endpoints
- [ ] Run `npm test` OR use cURL commands below
- [ ] GET http://localhost:3000/ returns API info
- [ ] GET http://localhost:3000/health returns status "healthy"
- [ ] POST http://localhost:3000/generate returns AI response
- [ ] POST http://localhost:3000/test-email sends test email (if configured)

---

## 🧪 Quick Tests

### Test 1: Server Running
```bash
curl http://localhost:3000/
```
**Expected:** JSON with API information

### Test 2: Health Check
```bash
curl http://localhost:3000/health
```
**Expected:** `{ "status": "healthy", "keysAvailable": X }`

### Test 3: Generate Response
```bash
curl -X POST http://localhost:3000/generate -H "Content-Type: application/json" -d "{\"prompt\": \"Say hello\"}"
```
**Expected:** `{ "success": true, "response": "...", "keyUsed": "GEMINI_KEY_X" }`

### Test 4: Email Alert (if configured)
```bash
curl -X POST http://localhost:3000/test-email
```
**Expected:** `{ "success": true, "message": "Test email sent successfully" }`
**Check:** Email received in inbox

---

## ⚠️ Common Issues

### Issue: "No valid Gemini API keys found"
**Solution:**
1. Open `.env` file
2. Replace `your_gemini_api_key_1_here` with actual API keys
3. Keys should start with `AIzaSy...`
4. Restart server with `npm start`

### Issue: Email alerts not working
**Solution:**
1. Verify 2FA is enabled on Gmail
2. Generate new App Password (not regular password)
3. Use the 16-character password with spaces: `abcd efgh ijkl mnop`
4. Update `EMAIL_PASSWORD` in `.env`
5. Restart server

### Issue: Port 3000 already in use
**Solution:**
1. Open `.env` file
2. Change `PORT=3000` to `PORT=3001` (or any available port)
3. Restart server
4. Use new port in API calls: http://localhost:3001

### Issue: API returns rate limit errors immediately
**Solution:**
1. Check if you have multiple valid API keys in `.env`
2. Verify keys are from different Google accounts if possible
3. Wait 1-2 minutes for Gemini quota to reset
4. Reset limits manually: `curl -X POST http://localhost:3000/reset-limits`

---

## ✅ Final Verification

Run all these commands and verify success:

```bash
# 1. Health check
curl http://localhost:3000/health

# 2. Generate text
curl -X POST http://localhost:3000/generate -H "Content-Type: application/json" -d "{\"prompt\": \"Hello AI!\"}"

# 3. View statistics
curl http://localhost:3000/stats

# 4. Test email (optional)
curl -X POST http://localhost:3000/test-email
```

**All tests pass?** ✅ Your server is ready for production!

---

## 🚀 Next Steps

Once everything works:

1. **Test Key Rotation**
   - Make multiple requests to `/generate`
   - Watch console logs to see keys rotating

2. **Monitor Statistics**
   - Check `/stats` endpoint periodically
   - Verify keys are being used evenly

3. **Deploy to Production**
   - Follow deployment guide in README.md
   - Use Vercel, Render, or Railway
   - Add environment variables in dashboard

4. **Set Up Monitoring**
   - Configure Sentry for error tracking
   - Set up uptime monitoring
   - Create alerts for system health

---

## 📞 Need Help?

- ✅ **Documentation:** Read README.md
- ✅ **Quick Start:** See QUICKSTART.md
- ✅ **API Examples:** Check PROJECT_SUMMARY.md
- ✅ **Postman:** Import `Sendora_AI.postman_collection.json`

---

**Made by GitHub Copilot for Sendora AI** 🚀
