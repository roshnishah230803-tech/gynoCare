"""
PCOS prediction request/response schemas
"""
from pydantic import BaseModel, Field, validator
from typing import Optional


class PCOSRequest(BaseModel):
    """
    PCOS prediction request schema

    Note: Adjust these fields to match your trained model's expected features.
    This is a template based on common PCOS risk factors.
    """
    age: int = Field(..., ge=10, le=100, description="Age in years")
    weight: float = Field(..., ge=20, le=300, description="Weight in kg")
    height: float = Field(..., ge=100, le=250, description="Height in cm")
    blood_group: str = Field(...,
                             description="Blood group (A+, A-, B+, B-, O+, O-, AB+, AB-)")
    cycle_length: int = Field(..., ge=1, le=12,
                              description="Cycle length in months")
    recent_weight_gain: bool = Field(..., description="Recent weight gain")
    excess_hair_growth: bool = Field(...,
                                     description="Excessive body/facial hair")
    skin_darkening: bool = Field(..., description="Dark patches on skin")
    hair_loss: bool = Field(..., description="Hair thinning/baldness")
    pimples: bool = Field(..., description="Acne on face/jawline")
    fast_food: bool = Field(..., description="Frequent fast food consumption")
    exercise: bool = Field(..., description="Regular exercise")
    previous_pcos: bool = Field(...,
                                description="Previously diagnosed with PCOS")
    mood_swings: bool = Field(..., description="Mood swings")
    period_regularity: str = Field(..., description="Regular or Irregular")
    period_duration: int = Field(..., ge=1, le=15,
                                 description="Period duration in days")

    @validator('blood_group')
    def validate_blood_group(cls, v):
        valid_groups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
        if v not in valid_groups:
            raise ValueError(f'Blood group must be one of {valid_groups}')
        return v

    @validator('period_regularity')
    def validate_regularity(cls, v):
        if v not in ['Regular', 'Irregular']:
            raise ValueError('Period regularity must be Regular or Irregular')
        return v

    class Config:
        schema_extra = {
            "example": {
                "age": 28,
                "weight": 75,
                "height": 165,
                "blood_group": "O+",
                "cycle_length": 2,
                "recent_weight_gain": True,
                "excess_hair_growth": True,
                "skin_darkening": False,
                "hair_loss": False,
                "pimples": True,
                "fast_food": True,
                "exercise": False,
                "previous_pcos": False,
                "mood_swings": True,
                "period_regularity": "Irregular",
                "period_duration": 3
            }
        }


class PCOSResponse(BaseModel):
    """PCOS prediction response schema"""
    result: str = Field(...,
                        description="Prediction result: Likely PCOS or Unlikely PCOS")
    probability: float = Field(..., ge=0, le=1,
                               description="Prediction probability")
    raw_score: float = Field(..., description="Raw model score")
    explanation: dict = Field(...,
                              description="Feature importance and explanation")

    class Config:
        schema_extra = {
            "example": {
                "result": "Likely PCOS",
                "probability": 0.78,
                "raw_score": 0.78,
                "explanation": {
                    "prediction": "Likely PCOS",
                    "confidence": 0.78,
                    "confidence_level": "High",
                    "top_features": [
                        {
                            "feature": "cycle_length",
                            "value": 2,
                            "importance": 0.25
                        },
                        {
                            "feature": "excess_hair_growth",
                            "value": 1,
                            "importance": 0.18
                        }
                    ],
                    "total_features": 16
                }
            }
        }
