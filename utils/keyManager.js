/**
 * Key Manager Module
 * Handles intelligent API key rotation with round-robin logic
 * Tracks rate-limited keys and manages key lifecycle
 */

require('dotenv').config();

class KeyManager {
  constructor() {
    this.keys = this.loadKeys();
    this.currentKeyIndex = 0;
    this.rateLimitedKeys = new Set();
    this.keyUsageStats = {};
    this.alertedKeys = new Set(); // Track which keys have triggered alerts
    
    // Initialize usage stats
    this.keys.forEach(key => {
      this.keyUsageStats[key.name] = {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        rateLimitHits: 0,
        firstRateLimitTime: null
      };
    });

    console.log(`✅ KeyManager initialized with ${this.keys.length} API keys`);
  }

  /**
   * Load all Gemini API keys from environment variables
   * @returns {Array} Array of key objects with name and value
   */
  loadKeys() {
    const keys = [];
    let keyIndex = 1;
    
    while (process.env[`GEMINI_KEY_${keyIndex}`]) {
      const keyName = `GEMINI_KEY_${keyIndex}`;
      const keyValue = process.env[keyName];
      
      if (keyValue && keyValue !== `your_gemini_api_key_${keyIndex}_here`) {
        keys.push({
          name: keyName,
          value: keyValue,
          index: keyIndex
        });
      }
      keyIndex++;
    }

    if (keys.length === 0) {
      throw new Error('❌ No valid Gemini API keys found in environment variables');
    }

    return keys;
  }

  /**
   * Get the current active API key
   * Automatically skips rate-limited keys
   * @returns {Object} Key object with name, value, and index
   */
  getActiveKey() {
    const availableKeys = this.keys.filter(
      key => !this.rateLimitedKeys.has(key.name)
    );

    if (availableKeys.length === 0) {
      // All keys are rate-limited, reset and try again
      console.warn('⚠️ All keys are rate-limited. Resetting rate limit tracking...');
      this.rateLimitedKeys.clear();
      return this.keys[0];
    }

    // Find the next available key in round-robin fashion
    let attempts = 0;
    while (attempts < this.keys.length) {
      const key = this.keys[this.currentKeyIndex];
      
      if (!this.rateLimitedKeys.has(key.name)) {
        console.log(`🔑 Using API key: ${key.name}`);
        return key;
      }

      // Move to next key
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
      attempts++;
    }

    // Fallback to first available key
    return availableKeys[0];
  }

  /**
   * Rotate to the next API key
   * Called after successful request or when rotating proactively
   * @returns {Object} Next key object
   */
  rotateToNextKey() {
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.keys.length;
    return this.getActiveKey();
  }

  /**
   * Handle key rotation when rate limit error occurs
   * Marks key as rate-limited and moves to next available key
   * @param {String} keyName - Name of the key that hit rate limit
   * @returns {Object} Result object with shouldAlert flag and key info
   */
  rotateKeyOnError(keyName) {
    console.log(`⚠️ Rate limit detected for ${keyName}, rotating...`);
    
    // Mark key as rate-limited
    this.rateLimitedKeys.add(keyName);
    
    // Update stats
    if (this.keyUsageStats[keyName]) {
      this.keyUsageStats[keyName].rateLimitHits++;
      if (!this.keyUsageStats[keyName].firstRateLimitTime) {
        this.keyUsageStats[keyName].firstRateLimitTime = new Date().toISOString();
      }
    }

    // Check if this key should trigger an alert
    const keyIndex = parseInt(keyName.split('_')[2]);
    const shouldAlert = ([5, 8, 10].includes(keyIndex)) && !this.alertedKeys.has(keyName);
    
    if (shouldAlert) {
      this.alertedKeys.add(keyName);
    }

    // Move to next available key
    const nextKey = this.rotateToNextKey();
    
    return {
      shouldAlert,
      keyName,
      keyIndex,
      nextKey: nextKey.name,
      rateLimitedCount: this.rateLimitedKeys.size,
      availableKeysCount: this.keys.length - this.rateLimitedKeys.size
    };
  }

  /**
   * Record successful API call
   * @param {String} keyName - Name of the key used
   */
  recordSuccess(keyName) {
    if (this.keyUsageStats[keyName]) {
      this.keyUsageStats[keyName].totalRequests++;
      this.keyUsageStats[keyName].successfulRequests++;
    }
  }

  /**
   * Record failed API call
   * @param {String} keyName - Name of the key used
   */
  recordFailure(keyName) {
    if (this.keyUsageStats[keyName]) {
      this.keyUsageStats[keyName].totalRequests++;
      this.keyUsageStats[keyName].failedRequests++;
    }
  }

  /**
   * Get usage statistics for all keys
   * @returns {Object} Statistics object
   */
  getStats() {
    return {
      totalKeys: this.keys.length,
      availableKeys: this.keys.length - this.rateLimitedKeys.size,
      rateLimitedKeys: Array.from(this.rateLimitedKeys),
      alertedKeys: Array.from(this.alertedKeys),
      currentKey: this.keys[this.currentKeyIndex].name,
      keyStats: this.keyUsageStats
    };
  }

  /**
   * Reset rate limit for a specific key (useful for testing or manual recovery)
   * @param {String} keyName - Name of the key to reset
   */
  resetRateLimit(keyName) {
    this.rateLimitedKeys.delete(keyName);
    console.log(`✅ Rate limit reset for ${keyName}`);
  }

  /**
   * Reset all rate limits (use with caution)
   */
  resetAllRateLimits() {
    this.rateLimitedKeys.clear();
    console.log('✅ All rate limits reset');
  }
}

// Singleton instance
let keyManagerInstance = null;

/**
 * Get or create KeyManager singleton instance
 * @returns {KeyManager} KeyManager instance
 */
function getKeyManager() {
  if (!keyManagerInstance) {
    keyManagerInstance = new KeyManager();
  }
  return keyManagerInstance;
}

module.exports = {
  getKeyManager,
  KeyManager
};
