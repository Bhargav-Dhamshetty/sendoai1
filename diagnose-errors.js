// Simple test to isolate the error
const https = require('https');

const SUPABASE_URL = 'https://bmpteadatirqfaweykns.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcHRlYWRhdGlycWZhd2V5a25zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI0MjI5MCwiZXhwIjoyMDc3ODE4MjkwfQ.c0jA31LRyZMjN22Qbk6ioynQTbeg1oJWvG38rHS3GCs';

console.log('\n🔍 TESTING INDIVIDUAL COMPONENTS...\n');

// Test Supabase connection
async function testSupabase() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'bmpteadatirqfaweykns.supabase.co',
      path: '/rest/v1/prospects?select=*&limit=1',
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Supabase: Connected and accessible');
        } else {
          console.log(`❌ Supabase: Error ${res.statusCode}`);
          console.log(`   Response: ${data}`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`❌ Supabase: Connection error - ${e.message}`);
      resolve();
    });

    req.end();
  });
}

// Test backend server
async function testBackend() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/health',
      method: 'GET'
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Backend: Running on localhost:3000');
      } else {
        console.log(`❌ Backend: Error ${res.statusCode}`);
      }
      resolve();
    });

    req.on('error', (e) => {
      console.log(`❌ Backend: Not running or error - ${e.message}`);
      resolve();
    });

    req.end();
  });
}

// Test Gemini endpoint via backend
async function testGemini() {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      prompt: 'Test prompt',
      maxTokens: 100
    });

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Gemini API: Backend can generate responses');
        } else {
          console.log(`❌ Gemini API: Error ${res.statusCode}`);
          console.log(`   ${data.substring(0, 100)}`);
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      console.log(`❌ Gemini API: Error - ${e.message}`);
      resolve();
    });

    req.write(payload);
    req.end();
  });
}

async function runTests() {
  await testSupabase();
  await testBackend();
  await testGemini();
  
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('📋 DIAGNOSIS SUMMARY:');
  console.log('════════════════════════════════════════════════════════════\n');
  console.log('If Supabase is ✅ but n8n fails:');
  console.log('  → You need to create credentials in n8n UI\n');
  console.log('If Backend is ❌:');
  console.log('  → Run: node server.js\n');
  console.log('If Gemini is ❌:');
  console.log('  → Check API keys in .env file\n');
}

runTests();
