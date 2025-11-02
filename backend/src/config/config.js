// Configuration loader - centralizes all environment variables
require('dotenv').config();

module.exports = {
  port: process.env.BACKEND_PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodb: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/gynocare'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_change_me',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  mlService: {
    url: process.env.ML_SERVICE_URL || 'http://localhost:8000'
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10'),
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
  },
  cors: {
    origins: (process.env.CORS_ORIGIN || 'http://localhost:3000').split(',').map(s => s.trim())
  }
};