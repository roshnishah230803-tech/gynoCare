# GynoCare Backend

Node.js + Express + MongoDB backend for the GynoCare women's health platform.

## Features

- **Authentication**: JWT-based auth with bcrypt password hashing
- **Cycle Tracking**: Menstrual cycle tracking with ovulation prediction
- **Risk Assessment**:
  - Score-based: Endometriosis, UTI
  - ML-based: PCOS, Cervical Cancer (via ML service)
- **Security**: Helmet, CORS, rate limiting, input validation, data sanitization
- **Logging**: Activity logs and audit trail

## Prerequisites

- Node.js 18+
- MongoDB 5+
- ML Service running (for PCOS and Cervical Cancer predictions)

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.sample .env

# Edit .env with your configuration
nano .env
```
