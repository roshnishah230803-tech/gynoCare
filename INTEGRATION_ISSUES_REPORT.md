# GynoCare Integration Issues Report

## Executive Summary
This report identifies critical integration problems between the frontend, backend, and ML service components of the GynoCare application. The main issues include missing API integrations, data format mismatches, authentication gaps, and inconsistent field naming conventions.

---

## 1. CRITICAL: Frontend Not Calling Backend APIs

### Issue
All frontend forms are simulating API calls with `setTimeout` instead of making actual HTTP requests to the backend.

### Affected Files
- `frontend/src/app/signup/page.js` (line 290-293)
- `frontend/src/app/login/page.js` (line 152-153)
- `frontend/src/app/cervical/page.js` (line 406)
- `frontend/src/app/pcos/page.js` (line 375)
- `frontend/src/app/logout/page.js` (line 104)
- `frontend/src/app/Forgotpassword/page.js` (line 108)

### Impact
- **No actual user registration/login**
- **No predictions are being saved**
- **No authentication tokens are generated**
- **Forms appear to work but don't persist data**

### Solution Required
Replace all simulated API calls with actual `fetch` or `axios` calls to backend endpoints.

---

## 2. CRITICAL: Field Name Mismatches - Cervical Cancer

### Issue
Three different naming conventions are used across the stack, causing data transformation failures.

### Field Mapping Problems

| Frontend Form | Backend Validation | ML Service Schema | ML Predictor | Status |
|--------------|-------------------|-------------------|--------------|--------|
| `numPartners` | `numSexualPartners` | `num_sexual_partners` | `numSexualPartners` | ❌ MISMATCH |
| `firstIntercourseAge` | `ageFirstIntercourse` | `age_first_intercourse` | `ageFirstIntercourse` | ❌ MISMATCH |
| `yearsSmoking` | `yearsSmoking` | `years_smoking` | `yearsSmoking` | ✅ OK |
| `yearsContraceptives` | `yearsHormonalContraceptives` | `years_hormonal_contraceptives` | `yearsHormonalContraceptives` | ❌ MISMATCH |
| `yearsIUD` | `yearsIud` | `years_iud` | `yearsIud` | ❌ MISMATCH |
| `numSTDs` | `numStds` | `num_stds` | `numStds` | ❌ MISMATCH |
| `stdHPV` | `stdHpv` | `std_hpv` | `stdHpv` | ❌ MISMATCH |
| `stdHIV` | `stdHiv` | `std_hiv` | `stdHiv` | ❌ MISMATCH |
| `contraceptives` | `hormonalContraceptives` | `hormonal_contraceptives` | `hormonalContraceptives` | ❌ MISMATCH |

### Additional Issues
- Frontend uses string values ("Yes"/"No") but backend expects booleans
- Frontend form doesn't collect all required fields (e.g., missing `hormonalContraceptives` boolean)

### Files Affected
- `frontend/src/app/cervical/page.js` - Form fields
- `backend/src/middleware/validate.js` - Validation schema
- `ml/app/schemas/cervical.py` - ML schema
- `ml/app/models/predictor.py` - ML predictor (uses camelCase, inconsistent with schema)

### Solution Required
1. Standardize field names across all layers
2. Transform frontend form data to match backend expectations
3. Fix ML predictor to use snake_case to match schema, OR update schema to match predictor

---

## 3. CRITICAL: PCOS Form Field Mismatch

### Issue
The PCOS frontend form collects completely different fields than what the backend/ML service expects.

### Frontend Form Fields (Current)
```javascript
{
  age: "",
  menstrualCycle: "",  // "Regular", "Irregular", "Absent"
  acne: false,
  hirsutism: false,
  weightGain: false,
  thinningHair: false,
  fatigue: false,
  ovarianCysts: false,
  insulinResistance: false,
  familyHistory: false
}
```

### Backend/ML Expected Fields
```javascript
{
  age: number,
  weight: number,              // MISSING in frontend
  height: number,              // MISSING in frontend
  bloodGroup: string,         // MISSING in frontend
  cycleLength: number,        // MISSING (frontend has menstrualCycle string)
  recentWeightGain: boolean,  // Similar to weightGain
  excessHairGrowth: boolean,   // Similar to hirsutism
  skinDarkening: boolean,     // MISSING in frontend
  hairLoss: boolean,          // Similar to thinningHair
  pimples: boolean,           // Similar to acne
  fastFood: boolean,          // MISSING in frontend
  exercise: boolean,          // MISSING in frontend
  previousPCOS: boolean,      // MISSING in frontend
  moodSwings: boolean,        // MISSING in frontend
  periodRegularity: string,   // "Regular" or "Irregular" (frontend has 3 options)
  periodDuration: number      // MISSING in frontend
}
```

### Impact
- **PCOS predictions will fail** - form data cannot be mapped to ML model inputs
- **Missing critical fields** like weight, height, blood group
- **Field semantics differ** (e.g., `menstrualCycle` vs `periodRegularity`)

### Files Affected
- `frontend/src/app/pcos/page.js`
- `backend/src/middleware/validate.js`
- `ml/app/schemas/pcos.py`

### Solution Required
1. Update frontend form to collect all required fields
2. Map frontend field names to backend/ML expected names
3. Handle data transformations (e.g., convert `menstrualCycle: "Absent"` to appropriate values)

---

## 4. CRITICAL: No Authentication Implementation

### Issue
Frontend doesn't implement authentication token handling, but backend requires JWT tokens for protected routes.

### Current State
- Backend generates JWT tokens on login/register (`authController.js`)
- Backend requires `Authorization: Bearer <token>` header for protected routes
- Frontend forms don't store or send tokens
- All prediction endpoints require authentication

### Impact
- **Cannot access prediction endpoints** - all will return 401 Unauthorized
- **User sessions not maintained**
- **No way to associate predictions with users**

### Files Affected
- All frontend pages (signup, login, cervical, pcos, etc.)
- `backend/src/middleware/auth.js`
- `backend/src/routes/pcos.js` (line 11: `router.use(authenticateToken)`)
- `backend/src/routes/cervicalCancer.js` (line 11: `router.use(authenticateToken)`)

### Solution Required
1. Implement token storage (httpOnly cookies)
2. Add token to all API requests via Authorization header
3. Handle token expiration and refresh
4. Redirect to login when token is invalid

---

## 5. Health Check Endpoint Mismatch

### Issue
Frontend checks `/api/health` but backend exposes `/health` (without `/api` prefix).

### Files Affected
- `frontend/src/components/HealthGate.tsx` (line 12): `fetch("/api/health")`
- `backend/src/app.js` (line 68): `app.get('/health', ...)`

### Impact
- Health check will fail, causing frontend to show "Service starting..." indefinitely
- Next.js rewrite should handle this, but needs verification

### Solution Required
- Verify Next.js rewrite configuration works correctly
- OR update backend to use `/api/health`
- OR update frontend to use `/health` directly

---

## 6. Data Type Mismatches

### Issue
Frontend sends string values where backend expects booleans/numbers.

### Examples
- Cervical form: `smoking: "Yes"` → Backend expects `smoking: true`
- Cervical form: `age: "35"` (string) → Backend expects `age: 35` (number)
- PCOS form: `age: ""` (empty string) → Backend expects `age: number`

### Impact
- Validation errors on backend
- Data transformation failures

### Solution Required
- Convert form values to correct types before sending to API
- Add client-side validation for required fields

---

## 7. Missing Error Handling

### Issue
Frontend forms don't handle API errors properly.

### Current State
- Forms show generic error messages
- No handling for network errors, validation errors, or server errors
- No retry logic for failed requests

### Solution Required
- Implement comprehensive error handling
- Display specific error messages from backend
- Handle network failures gracefully
- Add retry logic for transient failures

---

## 8. CORS Configuration Issues

### Issue
Backend CORS configuration may not allow frontend origin properly.

### Current Configuration
- `backend/src/app.js` (line 34-41): Uses `config.cors.origins`
- `backend/src/config/config.js` (line 30): Defaults to `http://localhost:3000`
- Docker compose uses different URLs (`http://backend:5000`)

### Impact
- CORS errors in browser when frontend tries to call backend
- Different origins in development vs Docker

### Solution Required
- Verify CORS allows all necessary origins
- Ensure Docker environment variables are set correctly
- Test CORS in both development and Docker environments

---

## 9. ML Service Field Name Inconsistency

### Issue
ML service has inconsistent field naming between schema and predictor.

### Details
- `ml/app/schemas/cervical.py`: Uses snake_case (`num_sexual_partners`)
- `ml/app/models/predictor.py`: Uses camelCase (`numSexualPartners`)

### Impact
- Backend needs to transform data twice (camelCase → snake_case → camelCase)
- Confusion about which format to use
- Potential bugs in data transformation

### Solution Required
- Standardize on one naming convention (recommend snake_case for Python)
- Update predictor to match schema, OR update schema to match predictor

---

## 10. Missing Data Transformation Layer

### Issue
No centralized data transformation between frontend → backend → ML service.

### Impact
- Field name mismatches cause failures
- Inconsistent data formats
- Difficult to maintain

### Solution Required
- Create transformation utilities in backend controllers
- Map frontend field names to backend/ML field names
- Validate data at each layer

---

## Priority Fix Order

1. **P0 - Critical (Blocks Core Functionality)**
   - Implement actual API calls in frontend (Issue #1)
   - Implement authentication token handling (Issue #4)
   - Fix field name mismatches (Issues #2, #3)

2. **P1 - High (Causes Errors)**
   - Fix data type mismatches (Issue #6)
   - Fix health check endpoint (Issue #5)
   - Standardize ML service field names (Issue #9)

3. **P2 - Medium (Improves Reliability)**
   - Add error handling (Issue #7)
   - Fix CORS configuration (Issue #8)
   - Add data transformation layer (Issue #10)

---

## Recommended Implementation Steps

### Step 1: Create API Client Utility
Create `frontend/src/utils/api.js`:
```javascript
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

export const apiClient = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };
    
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }
    
    return response.json();
  },
  
  // Convenience methods
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },
};
```

### Step 2: Fix Field Name Mappings
Create transformation functions in backend controllers to map frontend → ML service field names.

### Step 3: Update Frontend Forms
Replace simulated API calls with actual API client calls.

### Step 4: Implement Authentication Flow
- Store tokens on login/register
- Add token to all requests
- Handle token expiration

---

## Testing Checklist

After fixes, verify:
- [ ] User can register and receive token
- [ ] User can login and receive token
- [ ] Token is stored and sent with requests
- [ ] Cervical cancer form submits successfully
- [ ] PCOS form submits successfully
- [ ] Predictions are saved to database
- [ ] Error messages display correctly
- [ ] Health check works
- [ ] CORS allows frontend requests

---

## Additional Notes

- The ML service expects models to be placed in `ml/models/` directory
- Docker compose configuration looks correct but needs environment variables
- Backend validation schemas are well-defined but don't match frontend forms
- ML service has good error handling but may not receive correct data formats

---

**Report Generated:** $(date)
**Codebase Version:** Current
**Severity:** Critical - Application will not function without these fixes

