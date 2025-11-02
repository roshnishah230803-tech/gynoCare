/**
 * Score-based detection logic for Endometriosis and UTI
 * These are rule-based algorithms using weighted symptom scoring
 * MEDICAL DISCLAIMER: This is a risk assessment only and not a medical diagnosis. 
 * Consult a medical professional for proper evaluation.
 */

/**
 * Endometriosis Risk Scoring
 * 
 * SCORING WEIGHTS:
 * - Cycle Irregularity: 2 points
 * - Menstrual Pain (Severe): 3, Moderate: 2, Mild: 1
 * - Pain Before Period: 1 point
 * - Pain During Ovulation: 1 point
 * - Pain During Sex: (Severe): 3, Moderate: 2, Mild: 1
 * - Pelvic Pain (Severe): 3, Moderate: 2, Mild: 1
 * - Excessive Bleeding: 2 points
 * - Spotting: 1 point
 * - Digestive Symptoms: 1 point (if present)
 * - Infertility: 3 points
 * - Family/Personal History: 2 points
 * 
 * THRESHOLDS:
 * - Low Risk: 0-20 points
 * - Medium Risk: 21-40 points
 * - High Risk: 41+ points
 * 
 * Rationale: Based on common clinical indicators of endometriosis including
 * severe dysmenorrhea, chronic pelvic pain, and family history.
 */
function calculateEndometriosisRisk(symptoms) {
  let score = 0;
  
  // Cycle regularity
  if (symptoms.cycleRegularity === 'Irregular') {
    score += 2;
  }
  
  // Menstrual pain
  const menstrualPainScores = { 'None': 0, 'Mild': 1, 'Moderate': 2, 'Severe': 3 };
  score += menstrualPainScores[symptoms.menstrualPain] || 0;
  
  // Pain timing
  if (symptoms.painBeforePeriod) score += 1;
  if (symptoms.painDuringOvulation) score += 1;

  const painDuringSexScores = { 'None': 0, 'Mild': 1, 'Moderate': 2, 'Severe': 3 };
  score += painDuringSexScores[symptoms.painDuringSex] || 0;

  
  // Pelvic pain
  const pelvicPainScores = { 'None': 0, 'Mild': 1, 'Moderate': 2, 'Severe': 3 };
  score += pelvicPainScores[symptoms.pelvicPain] || 0;
  
  // Bleeding patterns
  if (symptoms.excessiveBleeding) score += 2;
  if (symptoms.spotting) score += 1;
  
  // Digestive symptoms
  if (symptoms.digestiveSymptom && symptoms.digestiveSymptom !== 'None') {
    score += 1;
  }
  
  // Fertility and history
  if (symptoms.infertility) score += 3;
  if (symptoms.historyEndometriosis) score += 2;
  
  // Determine risk level
  let result;
  if (score <= 5) {
    result = 'Low';
  } else if (score <= 10) {
    result = 'Medium';
  } else {
    result = 'High';
  }
  
  return { riskScore: score, result };
}

/**
 * UTI Risk Scoring
 * 
 * SCORING WEIGHTS:
 * - Burning Pain (Severe): 3, Moderate: 2, Mild: 1
 * - High Frequency (>8/day): 2
 * - Urgency with Little Urine: 2 points
 * - Cloudy/Smelly Urine: 1 point
 * - Blood in Urine: 3 points
 * - Abdominal/Pelvic Pain (Severe): 3, Moderate: 2, Mild: 1
 * - Fever/Chills: 3 points (indicates possible kidney involvement)
 * - Nausea/Vomiting: 2 points
 * - History of Recurrent UTI: 1 point
 * - Sexual Activity: 1 point
 * - Comorbidities (diabetes, kidney disease): 1 points
 * 
 * THRESHOLDS:
 * - Low Risk: <=4 points
 * - Medium Risk: <=8 points
 * - High Risk: >8 points
 * 
 * Rationale: Based on classic UTI symptoms (dysuria, frequency, urgency)
 * with higher weights for severe symptoms and systemic signs.
 */
function calculateUTIRisk(symptoms) {
  let score = 0;
  
  // Burning pain during urination (hallmark symptom)
  const burningPainScores = { 'None': 0, 'Mild': 1, 'Moderate': 2, 'Severe': 3 };
  score += burningPainScores[symptoms.burningPainUrination] || 0;
  
  // Urination frequency
  const frequency = symptoms.frequencyUrination24hrs;
  if (frequency > 8) {
    score += 2;
  } else{
    score += 0;
  }
  
  // Urgency
  if (symptoms.urgencyLittleUrine) score += 2;
  
  // Urine appearance
  if (symptoms.cloudySmellyUrine) score += 1;
  if (symptoms.bloodInUrine) score += 3; // Hematuria is significant
  
  // Abdominal/pelvic pain
  const abdominalPainScores = { 'None': 0, 'Mild': 1, 'Moderate': 2, 'Severe': 3 };
  score += abdominalPainScores[symptoms.painLowerAbdomenPelvic] || 0;
  
  // Systemic symptoms (may indicate upper UTI/pyelonephritis)
  if (symptoms.feverChills) score += 3;
  if (symptoms.nauseaVomiting) score += 2;
  
  // Risk factors
  if (symptoms.historyRecurrentUTI) score += 1;
  if (symptoms.sexualActivityStatus) score += 1;
  
  // Comorbidities
  if (symptoms.comorbidities && 
      (symptoms.comorbidities.includes('diabetes') || 
       symptoms.comorbidities.includes('kidney'))) {
    score += 1;
  }
  
  // Determine risk level
  let result;
  if (score <= 4) {
    result = 'Low Risk';
  } else if (score <= 8) {
    result = 'Medium Risk';
  } else {
    result = 'High Risk';
  }
  
  return { riskScore: score, result };
}

module.exports = {
  calculateEndometriosisRisk,
  calculateUTIRisk
};