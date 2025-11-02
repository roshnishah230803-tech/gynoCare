"use client";
import { useState } from "react";

// Custom SVG Icons with enhanced styling
const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Heart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Shield = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const X = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const AlertTriangle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

// Enhanced FormField component with better styling
const FormField = ({ label, name, type = "text", value, onChange, required = false, options = null, placeholder, description, radioOptions = null }) => {
  const isCheckbox = type === "checkbox";
  const isRadio = type === "radio";

  if (isCheckbox) {
    return (
      <div className="group">
        <div className="flex items-start space-x-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50">
          <div className="relative mt-1">
            <input
              id={name}
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
              value
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 border-rose-500 scale-110'
                : 'border-gray-300 hover:border-rose-400 bg-white'
            }`}
              onClick={() => onChange({ target: { name, checked: !value, type: 'checkbox' } })}
            >
              {value && <CheckCircle className="h-4 w-4 text-white" />}
            </div>
          </div>
          <label htmlFor={name} className="flex-1 cursor-pointer">
            <span className="block text-base font-bold text-gray-900 group-hover:text-rose-900 transition-colors">
              {label}
            </span>
            {description && (
              <p className="text-sm text-gray-600 mt-1 group-hover:text-rose-700 transition-colors">
                {description}
              </p>
            )}
          </label>
        </div>
      </div>
    );
  }

  if (isRadio && radioOptions) {
    return (
      <div className="space-y-3">
        <label className="block text-base font-bold text-gray-900">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {description && <p className="text-sm text-gray-600 -mt-2">{description}</p>}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {radioOptions.map((option) => (
            <label key={option.value} className="group cursor-pointer">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                className="sr-only"
              />
              <div className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-105 ${
                value === option.value
                  ? 'border-rose-500 bg-gradient-to-r from-rose-50 to-pink-50 shadow-lg shadow-rose-200/50'
                  : 'border-gray-200 hover:border-rose-300 bg-white hover:bg-rose-50/30'
              }`}>
                <div className={`text-sm font-semibold transition-colors ${
                  value === option.value ? 'text-rose-700' : 'text-gray-700 group-hover:text-rose-600'
                }`}>
                  {option.label}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <label htmlFor={name} className="block">
        <span className="text-base font-bold text-gray-900">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </label>
      <div className="relative group">
        {options ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="block w-full px-4 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-0 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 text-base font-medium text-gray-900 bg-white appearance-none cursor-pointer group-hover:shadow-lg group-hover:shadow-rose-100/50"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value} className="text-gray-900 font-medium py-2">
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className="block w-full px-4 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-0 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 text-base font-medium text-gray-900 bg-white placeholder-gray-400 hover:shadow-lg hover:shadow-rose-100/50"
            min={type === "number" ? "0" : undefined}
          />
        )}
      </div>
    </div>
  );
};

// Enhanced FormSection with animated backgrounds
const FormSection = ({ title, icon: Icon, children, gradient = "from-rose-500 to-pink-600" }) => (
  <div className="group">
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-rose-200/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
          <div className="relative">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`p-3 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-rose-900 transition-colors">
            {title}
          </h3>
          <div className="flex-1"></div>
          <Sparkles className="h-5 w-5 text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// Enhanced Progress bar with animations
const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-base font-bold text-gray-800">Progress</span>
        <span className="text-base text-rose-600 font-bold">{current} of {total}</span>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-3 rounded-full bg-gradient-to-r from-rose-200/0 via-rose-200/20 to-rose-200/0 animate-pulse"></div>
      </div>
    </div>
  );
};

const EndometriosisForm = ({ onClose }) => {
  // State management
  const [formData, setFormData] = useState({
    age: "",
    cycleRegularity: "Regular",
    menstrualPain: "None",
    painBeforePeriod: false,
    painDuringOvulation: false,
    painDuringSex: "None",
    pelvicPain: "None",
    heavyBleeding: false,
    spotting: false,
    digestiveSymptoms: [],
    infertility: false,
    familyHistory: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [riskPrediction, setRiskPrediction] = useState(null);

  const totalPages = 3;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name === "digestiveSymptoms") {
        let updatedSymptoms;
        if (checked) {
          updatedSymptoms = [...formData.digestiveSymptoms, value];
        } else {
          updatedSymptoms = formData.digestiveSymptoms.filter((item) => item !== value);
        }
        setFormData((prev) => ({ ...prev, digestiveSymptoms: updatedSymptoms }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Page validation
  const validateCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return formData.age !== "" && formData.menstrualPain !== "";
      case 2:
        return formData.painDuringSex !== "" && formData.pelvicPain !== "";
      case 3:
        return true;
      default:
        return true;
    }
  };

  // Navigation
  const nextPage = () => {
    if (currentPage < totalPages && validateCurrentPage()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Risk calculation
  const calculateRiskPrediction = () => {
    let riskScore = 0;
    let riskFactors = [];

    const painLevels = { "None": 0, "Mild": 1, "Moderate": 3, "Severe": 5 };

    // Menstrual cycle scoring
    if (formData.cycleRegularity !== "Regular") {
      riskScore += 2;
      riskFactors.push("Irregular or absent periods");
    }

    // Pain scoring
    if (painLevels[formData.menstrualPain] > 0) {
      riskScore += painLevels[formData.menstrualPain] * 1.5;
      riskFactors.push(`Menstrual pain (${formData.menstrualPain})`);
    }
    if (formData.painBeforePeriod) {
      riskScore += 2;
      riskFactors.push("Pain before period starts");
    }
    if (formData.painDuringOvulation) {
      riskScore += 2;
      riskFactors.push("Pain during ovulation");
    }
    if (painLevels[formData.painDuringSex] > 0) {
      riskScore += painLevels[formData.painDuringSex] * 2;
      riskFactors.push(`Pain during sexual intercourse (${formData.painDuringSex})`);
    }
    if (painLevels[formData.pelvicPain] > 0) {
      riskScore += painLevels[formData.pelvicPain] * 2;
      riskFactors.push(`Chronic pelvic or back pain (${formData.pelvicPain})`);
    }

    // Other symptoms
    if (formData.heavyBleeding) {
      riskScore += 3;
      riskFactors.push("Heavy menstrual bleeding");
    }
    if (formData.spotting) {
      riskScore += 1;
      riskFactors.push("Spotting between periods");
    }
    if (formData.digestiveSymptoms.length > 0) {
      riskScore += 2;
      riskFactors.push("Digestive symptoms during period");
    }
    if (formData.infertility) {
      riskScore += 4;
      riskFactors.push("Infertility issues");
    }
    if (formData.familyHistory) {
      riskScore += 3;
      riskFactors.push("Family history of endometriosis");
    }

    let riskLevel, riskColor, recommendations;
    let riskPercentage = Math.min(95, Math.max(5, (riskScore * 3) + 10));

    if (riskScore <= 10) {
      riskLevel = "Low";
      riskColor = "green";
      recommendations = [
        "Continue to monitor your symptoms and overall health.",
        "Maintain a healthy lifestyle to support your body.",
        "Consult a doctor if your symptoms worsen or new ones appear.",
      ];
      riskPercentage = Math.min(35, riskPercentage);
    } else if (riskScore <= 20) {
      riskLevel = "Moderate";
      riskColor = "yellow";
      recommendations = [
        "Schedule an appointment with a gynecologist to discuss your symptoms.",
        "Keep a detailed symptom diary to help with diagnosis.",
        "Consider lifestyle adjustments that may help manage pain and inflammation.",
      ];
      riskPercentage = Math.min(70, Math.max(36, riskPercentage));
    } else {
      riskLevel = "Higher";
      riskColor = "red";
      recommendations = [
        "It is strongly recommended you consult a gynecologist immediately.",
        "Discuss your symptoms with a healthcare professional for proper diagnosis.",
        "Consider diagnostic procedures such as pelvic exam or ultrasound as advised.",
      ];
      riskPercentage = Math.max(71, riskPercentage);
    }

    return {
      level: riskLevel,
      color: riskColor,
      percentage: Math.round(riskPercentage),
      score: riskScore,
      factors: riskFactors,
      recommendations: recommendations,
    };
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const prediction = calculateRiskPrediction();
    setRiskPrediction(prediction);

    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  // Results modal
  if (showConfirmation && riskPrediction) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Animated Header */}
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white p-6 sm:p-8 rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative flex items-center justify-between mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <CheckCircle className="h-8 w-8" />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-2xl transition-colors backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Assessment Complete!</h2>
            <p className="text-rose-100 text-base sm:text-lg">Your personalized endometriosis risk analysis is ready.</p>
          </div>

          {/* Results Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Risk Level Display */}
            <div className={`p-6 sm:p-8 rounded-3xl border-2 relative overflow-hidden ${
              riskPrediction.color === 'green' ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' :
              riskPrediction.color === 'yellow' ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200' :
              'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <Sparkles className="w-full h-full" />
              </div>
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <h3 className={`text-2xl sm:text-3xl font-bold mb-2 sm:mb-0 ${
                  riskPrediction.color === 'green' ? 'text-green-800' :
                  riskPrediction.color === 'yellow' ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  Risk Level: {riskPrediction.level}
                </h3>
                <div className={`text-4xl sm:text-5xl font-bold ${
                  riskPrediction.color === 'green' ? 'text-green-600' :
                  riskPrediction.color === 'yellow' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {riskPrediction.percentage}%
                </div>
              </div>
              {riskPrediction.color === 'red' && (
                <div className="flex items-center space-x-3 p-4 bg-red-100 rounded-2xl border border-red-200">
                  <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 font-semibold">High risk detected - Medical consultation recommended</p>
                </div>
              )}
            </div>

            {/* Risk Factors */}
            {riskPrediction.factors.length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full mr-3"></div>
                  Identified Risk Factors
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {riskPrediction.factors.map((factor, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-2xl shadow-sm">
                      <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-800 font-medium text-sm">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-3xl border-2 border-blue-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                <Heart className="w-full h-full" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-6 flex items-center relative">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></div>
                Personalized Recommendations
              </h4>
              <div className="space-y-4 relative">
                {riskPrediction.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm">
                    <div className="p-1 bg-blue-100 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-blue-800 font-medium flex-1">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-amber-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-amber-800 font-bold mb-2">Important Disclaimer</p>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    This assessment is for informational purposes only and does not constitute a medical diagnosis. 
                    Please consult with a qualified healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-rose-200/50 text-lg"
            >
              Close Assessment
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main form interface
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-rose-200 p-4 sm:p-6 z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Endometriosis Risk Assessment</h1>
                <p className="text-gray-600 text-sm sm:text-base font-medium">Comprehensive reproductive health evaluation tool</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-rose-100 rounded-2xl transition-colors group"
            >
              <X className="h-6 w-6 text-gray-600 group-hover:text-rose-600 transition-colors" />
            </button>
          </div>
          <ProgressBar current={currentPage} total={totalPages} />
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-8 overflow-y-auto" style={{maxHeight: 'calc(95vh - 200px)'}}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Page 1 */}
              {currentPage === 1 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <FormSection title="General & Menstrual Health" icon={User} gradient="from-rose-500 to-pink-600">
                    <FormField
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      placeholder="Enter your age"
                      description="Your current age in years"
                    />
                    <FormField
                      label="Family History of Endometriosis"
                      name="familyHistory"
                      type="checkbox"
                      value={formData.familyHistory}
                      onChange={handleChange}
                      description="Mother, sister, or close relatives with endometriosis"
                    />
                    <div className="lg:col-span-2 space-y-6">
                      <FormField
                        label="Menstrual Pain Severity"
                        name="menstrualPain"
                        type="radio"
                        value={formData.menstrualPain}
                        onChange={handleChange}
                        radioOptions={[
                          { value: "None", label: "None" },
                          { value: "Mild", label: "Mild" },
                          { value: "Moderate", label: "Moderate" },
                          { value: "Severe", label: "Severe" },
                        ]}
                        description="How would you describe your menstrual pain?"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          label="Menstrual Cycle Regularity"
                          name="cycleRegularity"
                          value={formData.cycleRegularity}
                          onChange={handleChange}
                          options={[
                            { value: "Regular", label: "Regular" },
                            { value: "Irregular", label: "Irregular" },
                            { value: "Absent", label: "Absent" },
                          ]}
                          description="Frequency and regularity of your periods"
                        />
                        <FormField
                          label="Pain Before Period Starts"
                          name="painBeforePeriod"
                          type="checkbox"
                          value={formData.painBeforePeriod}
                          onChange={handleChange}
                          description="Pain a few days before period"
                        />
                      </div>
                    </div>
                  </FormSection>
                </div>
              )}

              {/* Page 2 */}
              {currentPage === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <FormSection title="Pain & Physical Symptoms" icon={Heart} gradient="from-pink-500 to-rose-600">
                    <FormField
                      label="Pain During Ovulation"
                      name="painDuringOvulation"
                      type="checkbox"
                      value={formData.painDuringOvulation}
                      onChange={handleChange}
                      description="Mid-cycle pain during ovulation"
                    />
                    <FormField
                      label="Heavy Menstrual Bleeding"
                      name="heavyBleeding"
                      type="checkbox"
                      value={formData.heavyBleeding}
                      onChange={handleChange}
                      description="Heavy bleeding lasting longer than 7 days"
                    />
                    <div className="lg:col-span-2 space-y-6">
                      <FormField
                        label="Pain During Sexual Intercourse"
                        name="painDuringSex"
                        type="radio"
                        value={formData.painDuringSex}
                        onChange={handleChange}
                        radioOptions={[
                          { value: "None", label: "None" },
                          { value: "Mild", label: "Mild" },
                          { value: "Moderate", label: "Moderate" },
                          { value: "Severe", label: "Severe" },
                        ]}
                        description="Pain during or after sexual intercourse"
                      />
                      <FormField
                        label="Chronic Pelvic/Back Pain"
                        name="pelvicPain"
                        type="radio"
                        value={formData.pelvicPain}
                        onChange={handleChange}
                        radioOptions={[
                          { value: "None", label: "None" },
                          { value: "Mild", label: "Mild" },
                          { value: "Moderate", label: "Moderate" },
                          { value: "Severe", label: "Severe" },
                        ]}
                        description="Persistent pelvic or back pain outside of periods"
                      />
                    </div>
                  </FormSection>
                </div>
              )}

              {/* Page 3 */}
              {currentPage === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <FormSection title="Additional Symptoms & History" icon={Shield} gradient="from-rose-500 to-pink-600">
                    <FormField
                      label="Spotting Between Periods"
                      name="spotting"
                      type="checkbox"
                      value={formData.spotting}
                      onChange={handleChange}
                      description="Bleeding between menstrual cycles"
                    />
                    <FormField
                      label="Infertility Issues"
                      name="infertility"
                      type="checkbox"
                      value={formData.infertility}
                      onChange={handleChange}
                      description="Difficulty conceiving for more than 1 year"
                    />
                    <div className="lg:col-span-2 space-y-4">
                      <h4 className="text-lg font-bold text-gray-900 flex items-center">
                        <div className="w-2 h-5 bg-gradient-to-b from-rose-500 to-pink-600 rounded-full mr-3"></div>
                        Digestive Symptoms During Period
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {['Diarrhea', 'Constipation', 'Bloating'].map((symptom) => (
                          <div key={symptom} className="group">
                            <div className="flex items-start space-x-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-rose-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-rose-50/50 hover:to-pink-50/50">
                              <div className="relative mt-1">
                                <input
                                  id={symptom}
                                  type="checkbox"
                                  name="digestiveSymptoms"
                                  value={symptom}
                                  checked={formData.digestiveSymptoms.includes(symptom)}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                                  formData.digestiveSymptoms.includes(symptom)
                                    ? 'bg-gradient-to-r from-rose-500 to-pink-600 border-rose-500 scale-110'
                                    : 'border-gray-300 hover:border-rose-400 bg-white'
                                }`}
                                  onClick={() => {
                                    const event = {
                                      target: {
                                        name: 'digestiveSymptoms',
                                        value: symptom,
                                        type: 'checkbox',
                                        checked: !formData.digestiveSymptoms.includes(symptom)
                                      }
                                    };
                                    handleChange(event);
                                  }}
                                >
                                  {formData.digestiveSymptoms.includes(symptom) && <CheckCircle className="h-4 w-4 text-white" />}
                                </div>
                              </div>
                              <label htmlFor={symptom} className="flex-1 cursor-pointer">
                                <span className="block text-base font-bold text-gray-900 group-hover:text-rose-900 transition-colors">
                                  {symptom}
                                </span>
                                <p className="text-sm text-gray-600 mt-1 group-hover:text-rose-700 transition-colors">
                                  {symptom === 'Diarrhea' && 'Loose bowel movements during period'}
                                  {symptom === 'Constipation' && 'Difficulty with bowel movements during period'}
                                  {symptom === 'Bloating' && 'Abdominal bloating and discomfort during period'}
                                </p>
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FormSection>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 text-lg ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'bg-white text-rose-500 border-2 border-rose-500 hover:bg-rose-50 hover:shadow-lg'
                  }`}
                >
                  Previous
                </button>
                {currentPage < totalPages && (
                  <button
                    type="button"
                    onClick={nextPage}
                    disabled={!validateCurrentPage()}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 text-lg ${
                      validateCurrentPage()
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 hover:scale-105 hover:shadow-xl hover:shadow-rose-200/50'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Next Step
                  </button>
                )}
                {currentPage === totalPages && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 text-lg ${
                      isSubmitting
                        ? 'bg-rose-300 text-rose-100 cursor-not-allowed'
                        : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 hover:scale-105 hover:shadow-xl hover:shadow-rose-200/50'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-xl text-center border-2 border-rose-200">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Heart className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to the Endometriosis Risk Assessment
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          This tool helps you evaluate your potential risk of endometriosis based on your symptoms and medical history.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-rose-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-rose-200/50"
        >
          Start Assessment
        </button>
      </div>
      {showForm && <EndometriosisForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default App;