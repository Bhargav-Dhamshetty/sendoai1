# 🏗️ System Architecture

## Overview Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT REQUEST                            │
│                  POST /generate {"prompt": "..."}                │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                       EXPRESS SERVER                             │
│                        (server.js)                               │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Middleware Layer                                         │   │
│  │  • CORS                                                   │   │
│  │  • JSON Parser                                            │   │
│  │  • Request Logger                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                            │                                     │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Route Handler: /generate                                │   │
│  │  1. Validate prompt                                       │   │
│  │  2. Call Gemini Service                                   │   │
│  │  3. Return response                                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GEMINI SERVICE                                │
│                  (services/geminiService.js)                     │
│                                                                   │
│  ┌──────────────────────────────────────────┐                  │
│  │  callGeminiAPI(prompt)                   │                  │
│  │  ├─ Get active key from KeyManager       │                  │
│  │  ├─ Make API call with axios             │                  │
│  │  ├─ Check for rate limit errors          │                  │
│  │  └─ Retry with next key if needed        │                  │
│  └──────────────────────────────────────────┘                  │
└───────────────┬───────────────────────┬─────────────────────────┘
                │                       │
                ▼                       ▼
┌───────────────────────────┐  ┌──────────────────────────────┐
│     KEY MANAGER           │  │    EMAIL SERVICE             │
│  (utils/keyManager.js)    │  │  (utils/emailService.js)     │
│                           │  │                              │
│  ┌─────────────────────┐ │  │  ┌────────────────────────┐ │
│  │ Keys Pool           │ │  │  │ Nodemailer Config      │ │
│  │ • GEMINI_KEY_1      │ │  │  │ • Gmail SMTP           │ │
│  │ • GEMINI_KEY_2      │ │  │  │ • HTML Templates       │ │
│  │ • ...               │ │  │  │ • Alert Logic          │ │
│  │ • GEMINI_KEY_10     │ │  │  └────────────────────────┘ │
│  └─────────────────────┘ │  │                              │
│                           │  │  Triggers on:                │
│  State Tracking:          │  │  • Key #5 rate limited       │
│  • Current index          │  │  • Key #8 rate limited       │
│  • Rate limited keys      │  │  • Key #10 rate limited      │
│  • Usage statistics       │  │                              │
│  • Alerted keys           │  └──────────────────────────────┘
│                           │
│  Functions:               │
│  • getActiveKey()         │
│  • rotateKeyOnError()     │
│  • rotateToNextKey()      │
│  • recordSuccess()        │
│  • getStats()             │
└───────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GOOGLE GEMINI API                             │
│              https://generativelanguage.googleapis.com           │
│                                                                   │
│  Models Available:                                               │
│  • gemini-1.5-flash (default)                                    │
│  • gemini-1.5-pro                                                │
│  • gemini-pro                                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow

### Successful Request (Happy Path)

```
1. Client sends POST /generate with prompt
                    ↓
2. Express validates request body
                    ↓
3. Gemini Service gets current key from Key Manager
                    ↓
4. API call made with GEMINI_KEY_3
                    ↓
5. Gemini API returns generated text
                    ↓
6. Key Manager records success
                    ↓
7. Key Manager rotates to next key (GEMINI_KEY_4)
                    ↓
8. Response sent to client with keyUsed: "GEMINI_KEY_3"
```

### Rate Limit Scenario

```
1. Client sends POST /generate with prompt
                    ↓
2. API call made with GEMINI_KEY_5
                    ↓
3. Gemini API returns 429 (Rate Limit Error)
                    ↓
4. Key Manager marks GEMINI_KEY_5 as rate-limited
                    ↓
5. Check if key #5 → YES → Trigger email alert
                    ↓
6. Email Service sends HTML alert to admin
                    ↓
7. Key Manager rotates to GEMINI_KEY_6 (next available)
                    ↓
8. Retry API call with GEMINI_KEY_6
                    ↓
9. Success → Response sent to client
```

---

## Component Details

### 1. Server Layer (server.js)
**Responsibilities:**
- HTTP request handling
- Route management
- Middleware orchestration
- Error handling

**Endpoints:**
- `POST /generate` - Main AI generation
- `GET /health` - System health
- `GET /stats` - Usage statistics
- `POST /test-email` - Email testing
- `POST /reset-limits` - Admin controls

### 2. Service Layer (services/)
**Responsibilities:**
- Business logic
- External API communication
- Data transformation

**Key Functions:**
- `callGeminiAPI()` - Make API calls with retry
- `validatePrompt()` - Input validation
- `healthCheck()` - System status

### 3. Utility Layer (utils/)
**Responsibilities:**
- Reusable components
- State management
- Helper functions

**Modules:**
- `keyManager.js` - Key rotation logic
- `emailService.js` - Email notifications
- `logger.js` - Logging utilities

---

## Data Flow

### Key Rotation Algorithm

```
Initial State:
Keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]
Index: 0 (pointing to K1)
Rate Limited: []

Request 1: Use K1 ✓ → Rotate to index 1
Request 2: Use K2 ✓ → Rotate to index 2
Request 3: Use K3 ✓ → Rotate to index 3
Request 4: Use K4 ✗ (Rate Limited!)
           → Mark K4 as rate-limited
           → Skip to K5 (index 4)
Request 5: Use K5 ✓ → Rotate to index 5
Request 6: Use K6 ✓ → Rotate to index 6
...

State After:
Keys: [K1, K2, K3, K4, K5, K6, K7, K8, K9, K10]
Index: 6 (pointing to K6)
Rate Limited: [K4]
```

### Email Alert Decision Tree

```
Rate Limit Detected
        │
        ├─ Is key #5, #8, or #10?
        │       │
        │       ├─ NO → Skip alert, just rotate
        │       │
        │       └─ YES → Has alert been sent before?
        │               │
        │               ├─ YES → Skip (already alerted)
        │               │
        │               └─ NO → Send Email Alert
        │                       │
        │                       ├─ Generate HTML email
        │                       ├─ Include key details
        │                       ├─ Send via Nodemailer
        │                       └─ Mark as alerted
        │
        └─ Rotate to next available key
```

---

## Technology Stack

```
┌─────────────────────────────────────────────┐
│              Application Layer               │
│  • Node.js 18+                              │
│  • Express.js 4.18                          │
│  • Async/Await Architecture                 │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│             Core Dependencies                │
│  • axios (HTTP client)                      │
│  • nodemailer (Email)                       │
│  • dotenv (Environment)                     │
│  • cors (Cross-Origin)                      │
└─────────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────────┐
│            External Services                 │
│  • Google Gemini API (AI)                  │
│  • Gmail SMTP (Email)                       │
│  • Vercel (Hosting - optional)              │
└─────────────────────────────────────────────┘
```

---

## State Management

### Key Manager State

```javascript
{
  keys: [
    { name: 'GEMINI_KEY_1', value: 'AIza...', index: 1 },
    { name: 'GEMINI_KEY_2', value: 'AIza...', index: 2 },
    // ...
  ],
  currentKeyIndex: 3,
  rateLimitedKeys: Set(['GEMINI_KEY_5', 'GEMINI_KEY_8']),
  alertedKeys: Set(['GEMINI_KEY_5']),
  keyUsageStats: {
    'GEMINI_KEY_1': {
      totalRequests: 45,
      successfulRequests: 44,
      failedRequests: 1,
      rateLimitHits: 0,
      firstRateLimitTime: null
    },
    // ...
  }
}
```

---

## Error Handling Strategy

```
Error Occurs
     │
     ├─ Is it a Rate Limit Error (429)?
     │       │
     │       └─ YES → Rotate key, retry, send alert
     │
     ├─ Is it a 4xx Client Error?
     │       │
     │       └─ YES → Return error to client (don't retry)
     │
     ├─ Is it a 5xx Server Error?
     │       │
     │       └─ YES → Retry with backoff
     │
     └─ Unknown Error → Log and return 500
```

---

## Deployment Architecture

### Local Development
```
localhost:3000
     │
     └─ Direct Node.js process
```

### Vercel (Serverless)
```
Client Request
     │
     └─ Vercel Edge Network
            │
            └─ Serverless Function (Node.js)
                   │
                   └─ server.js (module.exports = app)
```

### Traditional VPS/Cloud
```
Client Request
     │
     └─ Load Balancer (optional)
            │
            └─ PM2 Process Manager
                   │
                   └─ server.js (multiple instances)
```

---

**🏗️ Architecture designed for scalability, reliability, and ease of maintenance!**
