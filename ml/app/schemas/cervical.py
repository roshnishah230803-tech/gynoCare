"""
Cervical cancer prediction request/response schemas
"""
from pydantic import BaseModel, Field, validator
from typing import Optional


class CervicalCancerRequest(BaseModel):
    """
    Cervical cancer prediction request schema

    Based on standard cervical cancer risk assessment features
    """
    age: int = Field(..., ge=18, le=100, description="Age in years")
    num_sexual_partners: int = Field(..., ge=0,
                                     description="Number of sexual partners")
    age_first_intercourse: int = Field(..., ge=10,
                                       le=50, description="Age at first intercourse")
    num_pregnancies: int = Field(..., ge=0,
                                 description="Number of pregnancies")
    smoking: bool = Field(...,
                          description="Currently smoking or history of smoking")
    years_smoking: int = Field(
        0, ge=0, description="Years of smoking (0 if non-smoker)")
    hormonal_contraceptives: bool = Field(...,
                                          description="Use of hormonal contraceptives")
    years_hormonal_contraceptives: int = Field(
        0, ge=0, description="Years using hormonal contraceptives")
    iud: bool = Field(..., description="Use of IUD")
    years_iud: int = Field(0, ge=0, description="Years using IUD")
    stds: bool = Field(..., description="History of STDs")
    num_stds: int = Field(0, ge=0, description="Number of STDs")
    std_hpv: bool = Field(..., description="HPV infection")
    std_hiv: bool = Field(..., description="HIV infection")

    @validator('years_smoking')
    def validate_smoking_years(cls, v, values):
        if 'smoking' in values and not values['smoking'] and v > 0:
            raise ValueError('years_smoking must be 0 if smoking is False')
        return v

    @validator('num_stds')
    def validate_num_stds(cls, v, values):
        if 'stds' in values and not values['stds'] and v > 0:
            raise ValueError('num_stds must be 0 if stds is False')
        return v

    class Config:
        schema_extra = {
            "example": {
                "age": 35,
                "num_sexual_partners": 3,
                "age_first_intercourse": 18,
                "num_pregnancies": 2,
                "smoking": True,
                "years_smoking": 10,
                "hormonal_contraceptives": True,
                "years_hormonal_contraceptives": 5,
                "iud": False,
                "years_iud": 0,
                "stds": True,
                "num_stds": 1,
                "std_hpv": True,
                "std_hiv": False
            }
        }


class CervicalCancerResponse(BaseModel):
    """Cervical cancer prediction response schema"""
    result: str = Field(...,
                        description="Risk level: Low Risk, Moderate Risk, or High Risk")
    probability: float = Field(..., ge=0, le=1,
                               description="Prediction probability")
    raw_score: float = Field(..., description="Raw model score")
    explanation: dict = Field(...,
                              description="Feature importance and explanation")

    class Config:
        schema_extra = {
            "example": {
                "result": "Moderate Risk",
                "probability": 0.65,
                "raw_score": 0.65,
                "explanation": {
                    "prediction": "Moderate Risk",
                    "confidence": 0.65,
                    "confidence_level": "Medium",
                    "top_features": [
                        {
                            "feature": "std_hpv",
                            "value": 1,
                            "importance": 0.35
                        },
                        {
                            "feature": "age",
                            "value": 35,
                            "importance": 0.22
                        }
                    ],
                    "total_features": 14
                }
            }
        }
