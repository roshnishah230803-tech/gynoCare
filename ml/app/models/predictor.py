"""
Predictor - handles predictions with preprocessing and post-processing
"""
import numpy as np
from typing import Dict, Any, List
from models.loader import model_loader
from utils.logger import logger
from utils.explainer import generate_explanation
from config import settings


class PCOSPredictor:
    """PCOS prediction handler"""

    # Feature mapping - adjust this to match your trained model
    # This is a template showing how to map API input to model features
    FEATURE_ORDER = [
        'age', 'weight', 'height', 'blood_group_encoded', 'cycle_length',
        'recent_weight_gain', 'excess_hair_growth', 'skin_darkening',
        'hair_loss', 'pimples', 'fast_food', 'exercise',
        'previous_pcos', 'mood_swings', 'period_regularity_encoded', 'period_duration'
    ]

    @staticmethod
    def preprocess(data: Dict[str, Any]) -> np.ndarray:
        """
        Preprocess input data for model

        Args:
            data: Input dictionary from API request

        Returns:
            Numpy array ready for model prediction
        """
        try:
            # Calculate BMI
            bmi = data['weight'] / ((data['height'] / 100) ** 2)

            # Encode categorical variables
            # Period regularity: Regular=0, Irregular=1
            period_regularity_encoded = 1 if data['period_regularity'] == 'Irregular' else 0

            # Blood group encoding (one-hot or label encoding based on your model)
            # This is a simple ordinal encoding example
            blood_group_map = {
                'A+': 0, 'A-': 1, 'B+': 2, 'B-': 3,
                'O+': 4, 'O-': 5, 'AB+': 6, 'AB-': 7
            }
            blood_group_encoded = blood_group_map.get(data['blood_group'], 0)

            # Create feature array
            # IMPORTANT: Adjust this array to match your model's exact feature order and count
            features = np.array([[
                data['age'],
                data['weight'],
                data['height'],
                blood_group_encoded,
                data['cycle_length'],
                int(data['recent_weight_gain']),
                int(data['excess_hair_growth']),
                int(data['skin_darkening']),
                int(data['hair_loss']),
                int(data['pimples']),
                int(data['fast_food']),
                int(data['exercise']),
                int(data['previous_pcos']),
                int(data['mood_swings']),
                period_regularity_encoded,
                data['period_duration']
            ]], dtype=float)

            logger.debug(f"Preprocessed features shape: {features.shape}")
            return features

        except Exception as e:
            logger.error(f"Preprocessing error: {str(e)}")
            raise ValueError(f"Failed to preprocess input data: {str(e)}")

    @staticmethod
    def predict(data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make PCOS prediction

        Args:
            data: Input data dictionary

        Returns:
            Prediction result dictionary
        """
        if not model_loader.is_pcos_model_loaded():
            raise RuntimeError(
                "PCOS model is not loaded. Please ensure the model file exists at the configured path.")

        try:
            # Preprocess input
            features = PCOSPredictor.preprocess(data)

            # Get model
            model = model_loader.pcos_model

            # Make prediction
            prediction = model.predict(features)[0]

            # Get probability if available
            if hasattr(model, 'predict_proba'):
                probabilities = model.predict_proba(features)[0]
                # Assuming binary classification: class 0 = Unlikely, class 1 = Likely
                probability = float(probabilities[1] if len(
                    probabilities) > 1 else probabilities[0])
            else:
                # Fallback: use decision function or prediction as proxy
                if hasattr(model, 'decision_function'):
                    decision = model.decision_function(features)[0]
                    # Normalize to 0-1 range using sigmoid
                    probability = float(1 / (1 + np.exp(-decision)))
                else:
                    probability = float(prediction)

            # Determine result label
            result = "Likely PCOS" if prediction == 1 or probability > settings.confidence_threshold else "Unlikely PCOS"

            # Generate explanation
            explanation = generate_explanation(
                model=model,
                feature_names=PCOSPredictor.FEATURE_ORDER if model_loader.pcos_feature_names == [
                ] else model_loader.pcos_feature_names,
                feature_values=features[0],
                prediction=result,
                probability=probability
            ) if settings.enable_explainability else {"message": "Explainability disabled"}

            logger.info(
                f"PCOS prediction completed: {result} (probability: {probability:.2f})")

            return {
                "result": result,
                "probability": probability,
                "raw_score": float(prediction),
                "explanation": explanation
            }

        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            raise


class CervicalCancerPredictor:
    """Cervical cancer prediction handler"""

    # Feature order for cervical cancer model (using snake_case to match schema)
    FEATURE_ORDER = [
        'age', 'num_sexual_partners', 'age_first_intercourse', 'num_pregnancies',
        'smoking', 'years_smoking', 'hormonal_contraceptives', 'years_hormonal_contraceptives',
        'iud', 'years_iud', 'stds', 'num_stds', 'std_hpv', 'std_hiv'
    ]

    @staticmethod
    def preprocess(data: Dict[str, Any]) -> np.ndarray:
        """
        Preprocess input data for cervical cancer model

        Args:
            data: Input dictionary from API request (in snake_case to match schema)

        Returns:
            Numpy array ready for model prediction
        """
        try:
            # Create feature array in the correct order (using snake_case field names)
            features = np.array([[
                data['age'],
                data['num_sexual_partners'],
                data['age_first_intercourse'],
                data['num_pregnancies'],
                int(data['smoking']),
                data['years_smoking'],
                int(data['hormonal_contraceptives']),
                data['years_hormonal_contraceptives'],
                int(data['iud']),
                data['years_iud'],
                int(data['stds']),
                data['num_stds'],
                int(data['std_hpv']),
                int(data['std_hiv'])
            ]], dtype=float)

            logger.debug(f"Preprocessed features shape: {features.shape}")
            return features

        except Exception as e:
            logger.error(f"Preprocessing error: {str(e)}")
            raise ValueError(f"Failed to preprocess input data: {str(e)}")

    @staticmethod
    def predict(data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make cervical cancer risk prediction

        Args:
            data: Input data dictionary

        Returns:
            Prediction result dictionary
        """
        if not model_loader.is_cervical_model_loaded():
            raise RuntimeError(
                "Cervical Cancer model is not loaded. Please ensure the model file exists at the configured path.")

        try:
            # Preprocess input
            features = CervicalCancerPredictor.preprocess(data)

            # Get model
            model = model_loader.cervical_model

            # Make prediction
            prediction = model.predict(features)[0]

            # Get probability if available
            if hasattr(model, 'predict_proba'):
                probabilities = model.predict_proba(features)[0]
                probability = float(probabilities[1] if len(
                    probabilities) > 1 else probabilities[0])
            else:
                if hasattr(model, 'decision_function'):
                    decision = model.decision_function(features)[0]
                    probability = float(1 / (1 + np.exp(-decision)))
                else:
                    probability = float(prediction)

            # Determine risk level
            if probability < 0.33:
                result = "Low Risk"
            elif probability < 0.67:
                result = "Moderate Risk"
            else:
                result = "High Risk"

            # Generate explanation
            explanation = generate_explanation(
                model=model,
                feature_names=CervicalCancerPredictor.FEATURE_ORDER if model_loader.cervical_feature_names == [
                ] else model_loader.cervical_feature_names,
                feature_values=features[0],
                prediction=result,
                probability=probability
            ) if settings.enable_explainability else {"message": "Explainability disabled"}

            logger.info(
                f"Cervical cancer prediction completed: {result} (probability: {probability:.2f})")

            return {
                "result": result,
                "probability": probability,
                "raw_score": float(prediction),
                "explanation": explanation
            }

        except Exception as e:
            logger.error(f"Prediction error: {str(e)}")
            raise
