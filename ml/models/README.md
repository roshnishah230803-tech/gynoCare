# Model Files

## Required Models

Place your trained joblib model files in this directory:

1. **pcos_model.joblib** - PCOS prediction model
2. **cervical_model.joblib** - Cervical cancer prediction model

## Model Requirements

### PCOS Model

- **Type**: Binary classification (scikit-learn compatible)
- **Expected Features** (in order):
  age, weight, height, cycle_length, recent_weight_gain, excess_hair_growth,
  skin_darkening, hair_loss, pimples, fast_food, exercise, previous_pcos,
  mood_swings, period_duration, period_regularity_encoded, blood_group_encoded

- **Output**: 0 (Unlikely PCOS) or 1 (Likely PCOS)
- **Methods Required**: `predict()`, optionally `predict_proba()`

### Cervical Cancer Model

- **Type**: Binary classification (scikit-learn compatible)
- **Expected Features** (in order):
  age, num_sexual_partners, age_first_intercourse, num_pregnancies,
  smoking, years_smoking, hormonal_contraceptives, years_hormonal_contraceptives,
  iud, years_iud, stds, num_stds, std_hpv, std_hiv

- **Output**: 0 (Low/No Risk) or 1 (Risk Present)
- **Methods Required**: `predict()`, optionally `predict_proba()`

## Training Your Models

If you don't have pre-trained models, here's how to create them:

```python
from sklearn.ensemble import RandomForestClassifier
import joblib
import numpy as np

# Example: Train a simple PCOS model
# Replace with your actual training data
X_train = np.random.rand(100, 16)  # 100 samples, 16 features
y_train = np.random.randint(0, 2, 100)  # Binary labels

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'pcos_model.joblib')
```
