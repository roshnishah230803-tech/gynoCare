/**
 * Scoring logic tests
 */
const { calculateEndometriosisRisk, calculateUTIRisk } = require('../src/utils/scoringLogic');

describe('Endometriosis Scoring Logic', () => {
  it('should calculate low risk correctly', () => {
    const symptoms = {
      cycleRegularity: 'Regular',
      menstrualPain: 'Mild',
      painBeforePeriod: false,
      painDuringOvulation: false,
      painDuringSex: false,
      pelvicPain: 'None',
      excessiveBleeding: false,
      spotting: false,
      digestiveSymptom: 'None',
      infertility: false,
      historyEndometriosis: false
    };

    const result = calculateEndometriosisRisk(symptoms);
    
    expect(result.riskScore).toBe(5);
    expect(result.result).toBe('Low');
  });

  it('should calculate high risk correctly', () => {
    const symptoms = {
      cycleRegularity: 'Irregular',
      menstrualPain: 'Severe',
      painBeforePeriod: true,
      painDuringOvulation: true,
      painDuringSex: true,
      pelvicPain: 'Severe',
      excessiveBleeding: true,
      spotting: true,
      digestiveSymptom: 'Bloating',
      infertility: true,
      historyEndometriosis: true
    };

    const result = calculateEndometriosisRisk(symptoms);
    
    expect(result.riskScore).toBeGreaterThan(50);
    expect(result.result).toBe('High');
  });

  it('should calculate medium risk correctly', () => {
    const symptoms = {
      cycleRegularity: 'Irregular',
      menstrualPain: 'Moderate',
      painBeforePeriod: true,
      painDuringOvulation: false,
      painDuringSex: true,
      pelvicPain: 'Mild',
      excessiveBleeding: false,
      spotting: true,
      digestiveSymptom: 'None',
      infertility: false,
      historyEndometriosis: false
    };

    const result = calculateEndometriosisRisk(symptoms);
    
    expect(result.riskScore).toBeGreaterThan(25);
    expect(result.riskScore).toBeLessThanOrEqual(50);
    expect(result.result).toBe('Medium');
  });
});

describe('UTI Scoring Logic', () => {
  it('should calculate low risk correctly', () => {
    const symptoms = {
      burningPainUrination: 'None',
      frequencyUrination24hrs: 5,
      urgencyLittleUrine: false,
      cloudySmellyUrine: false,
      bloodInUrine: false,
      painLowerAbdomenPelvic: 'None',
      feverChills: false,
      nauseaVomiting: false,
      historyRecurrentUTI: false,
      sexualActivityStatus: false,
      comorbidities: null
    };

    const result = calculateUTIRisk(symptoms);
    
    expect(result.riskScore).toBeLessThanOrEqual(30);
    expect(result.result).toBe('Low Risk');
  });

  it('should calculate high risk correctly', () => {
    const symptoms = {
      burningPainUrination: 'Severe',
      frequencyUrination24hrs: 15,
      urgencyLittleUrine: true,
      cloudySmellyUrine: true,
      bloodInUrine: true,
      painLowerAbdomenPelvic: 'Severe',
      feverChills: true,
      nauseaVomiting: true,
      historyRecurrentUTI: true,
      sexualActivityStatus: true,
      comorbidities: 'diabetes'
    };

    const result = calculateUTIRisk(symptoms);
    
    expect(result.riskScore).toBeGreaterThan(60);
    expect(result.result).toBe('High Risk');
  });

  it('should calculate medium risk correctly', () => {
    const symptoms = {
      burningPainUrination: 'Moderate',
      frequencyUrination24hrs: 8,
      urgencyLittleUrine: true,
      cloudySmellyUrine: true,
      bloodInUrine: false,
      painLowerAbdomenPelvic: 'Mild',
      feverChills: false,
      nauseaVomiting: false,
      historyRecurrentUTI: true,
      sexualActivityStatus: true,
      comorbidities: null
    };

    const result = calculateUTIRisk(symptoms);
    
    expect(result.riskScore).toBeGreaterThan(30);
    expect(result.riskScore).toBeLessThanOrEqual(60);
    expect(result.result).toBe('Medium Risk');
  });
});