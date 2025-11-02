"""
FastAPI application for GynoCare ML service
Provides PCOS and Cervical Cancer risk predictions
"""
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from contextlib import asynccontextmanager

from config import settings
from models.loader import model_loader
from models.predictor import PCOSPredictor, CervicalCancerPredictor
from schemas import (
    PCOSRequest, PCOSResponse,
    CervicalCancerRequest, CervicalCancerResponse
)
from utils.logger import logger


# Rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup and shutdown events
    Load models at startup
    """
    # Startup
    logger.info("Starting GynoCare ML Service...")
    logger.info(f"PCOS Model Path: {settings.pcos_model_path}")
    logger.info(f"Cervical Model Path: {settings.cervical_model_path}")

    # Load models
    success, message = model_loader.load_models()

    if not success:
        logger.error(f"Model loading failed: {message}")
        logger.warning(
            "ML service will start but predictions may fail if models are not loaded")
    else:
        logger.info(message)

    logger.info("ML Service started successfully")

    yield

    # Shutdown
    logger.info("Shutting down ML Service...")


# Initialize FastAPI app
app = FastAPI(
    title="GynoCare ML Service",
    description="Machine Learning service for PCOS and Cervical Cancer risk prediction",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint
    Returns service status and model loading status
    """
    return {
        "status": "healthy",
        "service": "GynoCare ML Service",
        "version": "1.0.0",
        "models": {
            "pcos": "loaded" if model_loader.is_pcos_model_loaded() else "not loaded",
            "cervical_cancer": "loaded" if model_loader.is_cervical_model_loaded() else "not loaded"
        }
    }


# PCOS prediction endpoint
@app.post(
    "/predict/pcos",
    response_model=PCOSResponse,
    tags=["Predictions"],
    summary="PCOS Risk Prediction",
    description="""
    Predicts PCOS (Polycystic Ovary Syndrome) risk based on patient data.
    
    **Medical Disclaimer**: This is a risk assessment only and not a medical diagnosis. 
    Consult a medical professional for proper evaluation.
    """
)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
async def predict_pcos(request: Request, data: PCOSRequest):
    """
    PCOS risk prediction endpoint

    Args:
        data: PCOS prediction request data

    Returns:
        PCOS prediction result with probability and explanation
    """
    try:
        logger.info("Received PCOS prediction request")

        # Check if model is loaded
        if not model_loader.is_pcos_model_loaded():
            logger.error("PCOS model not loaded")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="PCOS model is not available. Please ensure the model file is placed at the configured path and restart the service."
            )

        # Make prediction
        result = PCOSPredictor.predict(data.dict())

        logger.info(f"PCOS prediction successful: {result['result']}")
        return result

    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except RuntimeError as e:
        logger.error(f"Runtime error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during prediction"
        )


# Cervical cancer prediction endpoint
@app.post(
    "/predict/cervical",
    response_model=CervicalCancerResponse,
    tags=["Predictions"],
    summary="Cervical Cancer Risk Prediction",
    description="""
    Predicts cervical cancer risk based on patient data and risk factors.
    
    **Medical Disclaimer**: This is a risk assessment only and not a medical diagnosis. 
    Consult a medical professional for proper evaluation.
    """
)
@limiter.limit(f"{settings.rate_limit_per_minute}/minute")
async def predict_cervical_cancer(request: Request, data: CervicalCancerRequest):
    """
    Cervical cancer risk prediction endpoint

    Args:
        data: Cervical cancer prediction request data

    Returns:
        Cervical cancer prediction result with probability and explanation
    """
    try:
        logger.info("Received Cervical Cancer prediction request")

        # Check if model is loaded
        if not model_loader.is_cervical_model_loaded():
            logger.error("Cervical Cancer model not loaded")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Cervical Cancer model is not available. Please ensure the model file is placed at the configured path and restart the service."
            )

        # Make prediction
        result = CervicalCancerPredictor.predict(data.dict())

        logger.info(
            f"Cervical Cancer prediction successful: {result['result']}")
        return result

    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except RuntimeError as e:
        logger.error(f"Runtime error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during prediction"
        )


# Model info endpoint
@app.get("/models/info", tags=["Models"])
async def get_models_info():
    """
    Get information about loaded models
    """
    return {
        "pcos": {
            "loaded": model_loader.is_pcos_model_loaded(),
            "path": settings.pcos_model_path,
            "features": len(model_loader.pcos_feature_names),
            "feature_names": model_loader.pcos_feature_names[:5] if model_loader.pcos_feature_names else []
        },
        "cervical_cancer": {
            "loaded": model_loader.is_cervical_model_loaded(),
            "path": settings.cervical_model_path,
            "features": len(model_loader.cervical_feature_names),
            "feature_names": model_loader.cervical_feature_names[:5] if model_loader.cervical_feature_names else []
        }
    }


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with service information"""
    return {
        "service": "GynoCare ML Service",
        "version": "1.0.0",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "docs": "/docs",
            "pcos_prediction": "/predict/pcos",
            "cervical_prediction": "/predict/cervical",
            "models_info": "/models/info"
        }
    }


# Exception handler for better error messages
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An internal error occurred",
            "type": type(exc).__name__
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.fastapi_host,
        port=settings.fastapi_port,
        reload=True
    )
