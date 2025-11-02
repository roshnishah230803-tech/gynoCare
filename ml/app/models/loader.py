"""
Model loader - loads joblib models with error handling
"""
import joblib
import os
from typing import Tuple, Any, List
from config import settings
from utils.logger import logger


class ModelLoader:
    """Handles loading and validation of joblib models"""

    def __init__(self):
        self.pcos_model = None
        self.cervical_model = None
        self.pcos_feature_names = []
        self.cervical_feature_names = []

    def load_models(self) -> Tuple[bool, str]:
        """
        Load all models at startup

        Returns:
            Tuple of (success: bool, message: str)
        """
        # Load PCOS model
        pcos_success, pcos_msg = self._load_model(
            settings.pcos_model_path,
            'PCOS'
        )

        if pcos_success:
            logger.info(
                f"PCOS model loaded successfully from {settings.pcos_model_path}")
        else:
            logger.error(f"Failed to load PCOS model: {pcos_msg}")

        # Load Cervical Cancer model
        cervical_success, cervical_msg = self._load_model(
            settings.cervical_model_path,
            'Cervical Cancer'
        )

        if cervical_success:
            logger.info(
                f"Cervical Cancer model loaded successfully from {settings.cervical_model_path}")
        else:
            logger.error(
                f"Failed to load Cervical Cancer model: {cervical_msg}")

        # Overall status
        if not pcos_success and not cervical_success:
            return False, "Failed to load both models"
        elif not pcos_success:
            return True, f"Cervical model loaded, but PCOS model failed: {pcos_msg}"
        elif not cervical_success:
            return True, f"PCOS model loaded, but Cervical model failed: {cervical_msg}"
        else:
            return True, "All models loaded successfully"

    def _load_model(self, model_path: str, model_name: str) -> Tuple[bool, str]:
        """
        Load a single model from joblib file

        Args:
            model_path: Path to joblib file
            model_name: Name of the model (for logging)

        Returns:
            Tuple of (success: bool, message: str)
        """
        try:
            # Check if file exists
            if not os.path.exists(model_path):
                return False, f"Model file not found at {model_path}. Please place your trained {model_name} model at this location."

            # Load model
            model = joblib.load(model_path)

            # Validate model has predict method
            if not hasattr(model, 'predict'):
                return False, f"Loaded object is not a valid sklearn model (missing 'predict' method)"

            # Try to get feature names if available
            feature_names = self._extract_feature_names(model)

            # Store model
            if model_name == 'PCOS':
                self.pcos_model = model
                self.pcos_feature_names = feature_names
            elif model_name == 'Cervical Cancer':
                self.cervical_model = model
                self.cervical_feature_names = feature_names

            return True, f"{model_name} model loaded successfully"

        except Exception as e:
            return False, f"Error loading model: {str(e)}"

    def _extract_feature_names(self, model: Any) -> List[str]:
        """
        Try to extract feature names from model

        Args:
            model: Loaded model

        Returns:
            List of feature names if available, empty list otherwise
        """
        try:
            # Check for feature_names_in_ (sklearn 1.0+)
            if hasattr(model, 'feature_names_in_'):
                return list(model.feature_names_in_)

            # Check for n_features_in_
            if hasattr(model, 'n_features_in_'):
                n_features = model.n_features_in_
                return [f"feature_{i}" for i in range(n_features)]

            logger.warning("Could not extract feature names from model")
            return []

        except Exception as e:
            logger.warning(f"Error extracting feature names: {str(e)}")
            return []

    def is_pcos_model_loaded(self) -> bool:
        """Check if PCOS model is loaded"""
        return self.pcos_model is not None

    def is_cervical_model_loaded(self) -> bool:
        """Check if Cervical Cancer model is loaded"""
        return self.cervical_model is not None


# Global model loader instance
model_loader = ModelLoader()
