"""
Tests for PCOS prediction
"""
import pytest
from unittest.mock import Mock, patch
import numpy as np
from app.models.predictor import PCOSPredictor


@pytest.fixture
def sample_pcos_data():
    """Sample PCOS input data"""
    return {
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


def test_pcos_preprocessing(sample_pcos_data):
    """Test PCOS data preprocessing"""
    features = PCOSPredictor.preprocess(sample_pcos_data)

    # Check shape
    assert features.shape[0] == 1
    assert features.shape[1] == len(PCOSPredictor.FEATURE_ORDER)

    # Check types
    assert features.dtype == float

    # Check specific values
    assert features[0][0] == 28  # age
    assert features[0][1] == 75  # weight


def test_pcos_preprocessing_invalid_data():
    """Test PCOS preprocessing with invalid data"""
    invalid_data = {
        "age": 28,
        # Missing required fields
    }

    with pytest.raises(Exception):
        PCOSPredictor.preprocess(invalid_data)


@patch('app.models.loader.model_loader')
def test_pcos_prediction_model_not_loaded(mock_loader, sample_pcos_data):
    """Test PCOS prediction when model is not loaded"""
    mock_loader.is_pcos_model_loaded.return_value = False

    with pytest.raises(RuntimeError):
        PCOSPredictor.predict(sample_pcos_data)


@patch('app.models.loader.model_loader')
def test_pcos_prediction_success(mock_loader, sample_pcos_data):
    """Test successful PCOS prediction"""
    # Mock model
    mock_model = Mock()
    mock_model.predict.return_value = np.array([1])
    mock_model.predict_proba.return_value = np.array([[0.3, 0.7]])

    mock_loader.is_pcos_model_loaded.return_value = True
    mock_loader.pcos_model = mock_model
    mock_loader.pcos_feature_names = []

    result = PCOSPredictor.predict(sample_pcos_data)

    assert "result" in result
    assert "probability" in result
    assert "raw_score" in result
    assert "explanation" in result
    assert result["result"] in ["Likely PCOS", "Unlikely PCOS"]
    assert 0 <= result["probability"] <= 1


def test_feature_order_consistency():
    """Test that feature order is consistent"""
    # This ensures the feature order list is not accidentally modified
    expected_features = [
        'age', 'weight', 'height', 'cycle_length',
        'recent_weight_gain', 'excess_hair_growth', 'skin_darkening',
        'hair_loss', 'pimples', 'fast_food', 'exercise',
        'previous_pcos', 'mood_swings', 'period_duration',
        'period_regularity_encoded', 'blood_group_encoded'
    ]

    assert PCOSPredictor.FEATURE_ORDER == expected_features
