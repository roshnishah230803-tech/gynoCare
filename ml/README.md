# GynoCare ML Service

FastAPI-based machine learning service for PCOS and Cervical Cancer risk prediction.

## Features

- **PCOS Prediction**: ML-based risk assessment for Polycystic Ovary Syndrome
- **Cervical Cancer Prediction**: ML-based risk assessment for cervical cancer
- **Explainability**: Feature importance and contribution analysis
- **API Documentation**: Auto-generated OpenAPI/Swagger docs
- **Rate Limiting**: Protection against abuse
- **Health Checks**: Service and model status monitoring

## Prerequisites

- Python 3.10+
- Trained joblib model files (see `models/README.md`)

## Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.sample .env

# Edit .env with your configuration
nano .env
```
