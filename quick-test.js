/**
 * Quick API Test - Run this while server is running in another terminal
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function quickTest() {
  console.log('\n🚀 Testing Sendora AI Server...\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Testing Health Check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health:', health.data.status);
    console.log(`   Keys Available: ${health.data.keysAvailable}/${health.data.keyStats.totalKeys}\n`);

    // Test 2: Generate AI Response
    console.log('2️⃣ Testing AI Generation...');
    const generate = await axios.post(`${BASE_URL}/generate`, {
      prompt: 'Write a very short haiku about AI'
    });
    console.log('✅ Success!');
    console.log(`   Key Used: ${generate.data.keyUsed}`);
    console.log(`   Duration: ${generate.data.duration}`);
    console.log(`   Response: ${generate.data.response.substring(0, 100)}...\n`);

    // Test 3: Email Test
    console.log('3️⃣ Testing Email Alert...');
    const email = await axios.post(`${BASE_URL}/test-email`);
    if (email.data.success) {
      console.log('✅ Email sent successfully!');
      console.log(`   Message ID: ${email.data.messageId}`);
      console.log(`   Check ${process.env.ALERT_EMAIL_TO || 'your inbox'} for the test email!\n`);
    } else {
      console.log('⚠️  Email test result:', email.data);
    }

    console.log('🎉 All tests passed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

quickTest();
