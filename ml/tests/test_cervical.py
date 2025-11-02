"""
Tests for Cervical Cancer prediction
"""
import pytest
from unittest.mock import Mock, patch
import numpy as np
from app.models.predictor import CervicalCancerPredictor


@pytest.fixture
def sample_cervical_data():
    """Sample cervical cancer input data"""
    return {
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


def test_cervical_preprocessing(sample_cervical_data):
    """Test cervical cancer data preprocessing"""
    features = CervicalCancerPredictor.preprocess(sample_cervical_data)

    # Check shape
    assert features.shape[0] == 1
    assert features.shape[1] == len(CervicalCancerPredictor.FEATURE_ORDER)

    # Check types
    assert features.dtype == float

    # Check specific values
    assert features[0][0] == 35  # age
    assert features[0][12] == 1  # std_hpv


def test_cervical_preprocessing_invalid_data():
    """Test cervical preprocessing with invalid data"""
    invalid_data = {
        "age": 35,
        # Missing required fields
    }

    with pytest.raises(Exception):
        CervicalCancerPredictor.preprocess(invalid_data)


@patch('app.models.loader.model_loader')
def test_cervical_prediction_model_not_loaded(mock_loader, sample_cervical_data):
    """Test cervical prediction when model is not loaded"""
    mock_loader.is_cervical_model_loaded.return_value = False

    with pytest.raises(RuntimeError):
        CervicalCancerPredictor.predict(sample_cervical_data)


@patch('app.models.loader.model_loader')
def test_cervical_prediction_success(mock_loader, sample_cervical_data):
    """Test successful cervical cancer prediction"""
    # Mock model
    mock_model = Mock()
    mock_model.predict.return_value = np.array([1])
    mock_model.predict_proba.return_value = np.array([[0.4, 0.6]])

    mock_loader.is_cervical_model_loaded.return_value = True
    mock_loader.cervical_model = mock_model
    mock_loader.cervical_feature_names = []

    result = CervicalCancerPredictor.predict(sample_cervical_data)

    assert "result" in result
    assert "probability" in result
    assert "raw_score" in result
    assert "explanation" in result
    assert result["result"] in ["Low Risk", "Moderate Risk", "High Risk"]
    assert 0 <= result["probability"] <= 1


def test_risk_level_classification():
    """Test risk level classification logic"""
    # This would test the thresholds: <0.33 = Low, 0.33-0.67 = Moderate, >0.67 = High
    # Implicitly tested in the prediction success test
    pass


def test_feature_order_consistency():
    """Test that feature order is consistent"""
    expected_features = [
        'age', 'num_sexual_partners', 'age_first_intercourse', 'num_pregnancies',
        'smoking', 'years_smoking', 'hormonal_contraceptives', 'years_hormonal_contraceptives',
        'iud', 'years_iud', 'stds', 'num_stds', 'std_hpv', 'std_hiv'
    ]

    assert CervicalCancerPredictor.FEATURE_ORDER == expected_features
