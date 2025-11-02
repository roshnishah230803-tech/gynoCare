"""
Model explainability utilities
Provides feature importance and contribution analysis
"""
import numpy as np
from typing import Dict, List, Any, Optional
from utils.logger import logger


def get_feature_importance(model: Any, feature_names: List[str]) -> Optional[Dict[str, float]]:
    """
    Extract feature importance from model if available

    Args:
        model: Trained scikit-learn model
        feature_names: List of feature names

    Returns:
        Dictionary of feature names and their importance scores
    """
    try:
        # Try to get feature_importances_ (tree-based models)
        if hasattr(model, 'feature_importances_'):
            importances = model.feature_importances_
            importance_dict = {
                name: float(importance)
                for name, importance in zip(feature_names, importances)
            }
            # Sort by importance
            return dict(sorted(importance_dict.items(), key=lambda x: x[1], reverse=True))

        # Try to get coef_ (linear models)
        elif hasattr(model, 'coef_'):
            # Handle both binary and multiclass
            if len(model.coef_.shape) == 1:
                coefficients = np.abs(model.coef_)
            else:
                coefficients = np.abs(model.coef_[0])

            importance_dict = {
                name: float(coef)
                for name, coef in zip(feature_names, coefficients)
            }
            return dict(sorted(importance_dict.items(), key=lambda x: x[1], reverse=True))

        else:
            logger.warning(
                "Model does not support feature importance extraction")
            return None

    except Exception as e:
        logger.error(f"Error extracting feature importance: {str(e)}")
        return None


def get_top_contributing_features(
    model: Any,
    feature_names: List[str],
    feature_values: np.ndarray,
    top_n: int = 5
) -> Dict[str, Any]:
    """
    Get top contributing features for a prediction

    Args:
        model: Trained model
        feature_names: List of feature names
        feature_values: Feature values for the prediction
        top_n: Number of top features to return

    Returns:
        Dictionary with top contributing features
    """
    try:
        importance = get_feature_importance(model, feature_names)

        if importance is None:
            return {
                "message": "Feature importance not available for this model type",
                "top_features": []
            }

        # Get top N features
        top_features = list(importance.items())[:top_n]

        # Add actual values
        feature_contributions = []
        for feature_name, importance_score in top_features:
            feature_idx = feature_names.index(feature_name)
            feature_contributions.append({
                "feature": feature_name,
                "value": float(feature_values[feature_idx]),
                "importance": importance_score
            })

        return {
            "top_features": feature_contributions,
            "total_features": len(feature_names)
        }

    except Exception as e:
        logger.error(f"Error getting top contributing features: {str(e)}")
        return {
            "error": str(e),
            "top_features": []
        }


def generate_explanation(
    model: Any,
    feature_names: List[str],
    feature_values: np.ndarray,
    prediction: str,
    probability: float
) -> Dict[str, Any]:
    """
    Generate comprehensive explanation for a prediction

    Args:
        model: Trained model
        feature_names: List of feature names
        feature_values: Feature values used for prediction
        prediction: Prediction result
        probability: Prediction probability

    Returns:
        Explanation dictionary
    """
    explanation = {
        "prediction": prediction,
        "confidence": float(probability),
        "confidence_level": "High" if probability > 0.75 else "Medium" if probability > 0.5 else "Low"
    }

    # Add top contributing features
    contributions = get_top_contributing_features(
        model, feature_names, feature_values, top_n=5)
    explanation.update(contributions)

    return explanation
