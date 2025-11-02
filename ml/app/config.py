"""
Configuration management for ML service
"""
import os
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings"""

    # Server configuration
    fastapi_port: int = 8000
    fastapi_host: str = "0.0.0.0"
    model_log_level: str = "INFO"

    # Model paths
    pcos_model_path: str = "../models/pcos_model.joblib"
    cervical_model_path: str = "../models/cervical_model.joblib"

    # Model configuration
    enable_explainability: bool = True
    confidence_threshold: float = 0.5

    # Security
    api_key: Optional[str] = None
    rate_limit_per_minute: int = 60

    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()
