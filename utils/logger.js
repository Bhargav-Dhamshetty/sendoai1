/**
 * Logger Utility
 * Provides consistent logging across the application
 */

class Logger {
  constructor(context = 'APP') {
    this.context = context;
  }

  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  info(message, data = null) {
    console.log(this.formatMessage('INFO', message));
    if (data) console.log(data);
  }

  success(message, data = null) {
    console.log('✅', this.formatMessage('SUCCESS', message));
    if (data) console.log(data);
  }

  error(message, error = null) {
    console.error('❌', this.formatMessage('ERROR', message));
    if (error) console.error(error);
  }

  warn(message, data = null) {
    console.warn('⚠️ ', this.formatMessage('WARN', message));
    if (data) console.warn(data);
  }

  debug(message, data = null) {
    if (process.env.NODE_ENV === 'development') {
      console.debug('🔍', this.formatMessage('DEBUG', message));
      if (data) console.debug(data);
    }
  }
}

module.exports = { Logger };
