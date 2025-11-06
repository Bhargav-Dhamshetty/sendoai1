# 🚀 QUICK START - SENDORA AI

## ✅ EVERYTHING IS CONFIGURED!

- ✅ **10 Gemini API Keys** loaded
- ✅ **Brevo SMTP Email** configured
- ✅ **Email alerts** to godbhargav@gmail.com
- ✅ All code ready to run

---

## 🎯 HOW TO USE (SUPER SIMPLE!)

### **Method 1: Double-Click Files** (EASIEST!)

1. **Double-click `START-SERVER.bat`** → Starts the server (keep window open!)
2. **Double-click `RUN-TESTS.bat`** → Tests everything automatically

### **Method 2: PowerShell Commands**

```powershell
# Check if server is running
powershell .\check-status.ps1

# Start server (in one terminal)
node server.js

# Test it (in another terminal)
powershell .\demo.ps1
```

---

## 🧪 WHAT EACH FILE DOES:

| File | What It Does |
|------|--------------|
| `START-SERVER.bat` | Starts the server (double-click this!) |
| `RUN-TESTS.bat` | Runs all tests automatically |
| `check-status.ps1` | Checks if server is running |
| `demo.ps1` | Interactive demo - try your own prompts |
| `quick-test.js` | Automated test script |

---

## 📝 EXAMPLE: Test AI Generation

**Step 1:** Start server
```
Double-click START-SERVER.bat
```

**Step 2:** In a NEW PowerShell window:
```powershell
# Quick test
$body = @{ prompt = "Explain AI in 10 words" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/generate" -Method POST -Body $body -ContentType "application/json"
```

---

## 📧 EMAIL ALERTS

Emails will be sent to **godbhargav@gmail.com** when:
- Key #5 hits rate limit (first time)
- Key #8 hits rate limit (first time)  
- Key #10 hits rate limit (first time)

**Test email:**
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/test-email" -Method POST
```

---

## 🔥 ALL ENDPOINTS:

```
POST   http://localhost:3000/generate      # Generate AI text
GET    http://localhost:3000/health        # Server health
GET    http://localhost:3000/stats         # Usage stats
POST   http://localhost:3000/test-email    # Test email
POST   http://localhost:3000/reset-limits  # Reset rate limits
```

---

## ⚡ QUICK COMMANDS:

```powershell
# Check status
powershell .\check-status.ps1

# Interactive demo
powershell .\demo.ps1

# View statistics
Invoke-RestMethod http://localhost:3000/stats

# Health check
Invoke-RestMethod http://localhost:3000/health
```

---

## 🎉 YOU'RE READY!

Just **double-click START-SERVER.bat** and you're good to go!

Everything is working perfectly bro! 🚀
