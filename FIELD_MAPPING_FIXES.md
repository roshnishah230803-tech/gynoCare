# Cervical Cancer Field Mapping Fixes

## Summary
Fixed all field name mismatches between frontend, backend, and ML service for cervical cancer predictions.

## Changes Made

### 1. Backend Controller (`backend/src/controllers/cervicalCancerController.js`)
- **Added transformation function** `transformToSnakeCase()` to convert camelCase (from frontend/backend) to snake_case (for ML service)
- **Updated** `predictCervicalCancer()` to transform data before sending to ML service

### 2. ML Predictor (`ml/app/models/predictor.py`)
- **Updated** `CervicalCancerPredictor.FEATURE_ORDER` to use snake_case (matching schema)
- **Updated** `preprocess()` method to use snake_case field names
- **Fixed inconsistency** between schema (snake_case) and predictor (was camelCase)

### 3. Frontend Form (`frontend/src/app/cervical/page.js`)
- **Already correct** - transforms form data to backend camelCase format
- **Handles** "Yes"/"No"/"Unknown" string values → boolean conversion
- **Maps** all field names correctly:
  - `numPartners` → `numSexualPartners`
  - `firstIntercourseAge` → `ageFirstIntercourse`
  - `yearsContraceptives` → `yearsHormonalContraceptives`
  - `yearsIUD` → `yearsIud`
  - `numSTDs` → `numStds`
  - `stdHPV` → `stdHpv`
  - `stdHIV` → `stdHiv`
  - `contraceptives` → `hormonalContraceptives`

## Data Flow (Fixed)

```
Frontend Form (camelCase with "Yes"/"No" strings)
    ↓
Frontend Transformation (camelCase booleans)
    ↓
Backend Validation (camelCase booleans) ✅
    ↓
Backend Transformation (camelCase → snake_case)
    ↓
ML Service Schema (snake_case booleans) ✅
    ↓
ML Predictor (snake_case booleans) ✅
```

## Field Mapping Table (After Fix)

| Frontend Form | Backend Validation | Backend→ML Transform | ML Schema | ML Predictor | Status |
|--------------|-------------------|---------------------|-----------|--------------|--------|
| `numPartners` | `numSexualPartners` | `num_sexual_partners` | `num_sexual_partners` | `num_sexual_partners` | ✅ FIXED |
| `firstIntercourseAge` | `ageFirstIntercourse` | `age_first_intercourse` | `age_first_intercourse` | `age_first_intercourse` | ✅ FIXED |
| `yearsSmoking` | `yearsSmoking` | `years_smoking` | `years_smoking` | `years_smoking` | ✅ OK |
| `yearsContraceptives` | `yearsHormonalContraceptives` | `years_hormonal_contraceptives` | `years_hormonal_contraceptives` | `years_hormonal_contraceptives` | ✅ FIXED |
| `yearsIUD` | `yearsIud` | `years_iud` | `years_iud` | `years_iud` | ✅ FIXED |
| `numSTDs` | `numStds` | `num_stds` | `num_stds` | `num_stds` | ✅ FIXED |
| `stdHPV` | `stdHpv` | `std_hpv` | `std_hpv` | `std_hpv` | ✅ FIXED |
| `stdHIV` | `stdHiv` | `std_hiv` | `std_hiv` | `std_hiv` | ✅ FIXED |
| `contraceptives` | `hormonalContraceptives` | `hormonal_contraceptives` | `hormonal_contraceptives` | `hormonal_contraceptives` | ✅ FIXED |

## Boolean Conversion

All string values ("Yes"/"No"/"Unknown") are properly converted to booleans:
- `"Yes"` → `true`
- `"No"` or `"Unknown"` → `false`

## Testing

The ML service tests (`ml/tests/test_cervical.py`) already use snake_case, so they will work correctly with the updated predictor.

## Next Steps

1. ✅ Field name mismatches fixed
2. ✅ Data type conversions (string → boolean) implemented
3. ✅ Transformation layer added in backend
4. ✅ ML predictor standardized to snake_case

All integration issues for cervical cancer field mappings have been resolved!

