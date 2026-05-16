"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Custom SVG Icons
const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
  </svg>
);

const Heart = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Activity = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

const Moon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const Sparkles = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const Droplets = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l8 8-8 8-8-8 8-8z" />
  </svg>
);

// Enhanced FormField component
const FormField = ({ label, name, type = "text", value, onChange, required = false, options = null, placeholder, description, radioOptions = null }) => {
  const isCheckbox = type === "checkbox";
  const isRadio = type === "radio";

  if (isCheckbox) {
    return (
      <div className="group">
        <div className="flex items-start space-x-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-pink-200 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-rose-50/50">
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
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 border-pink-500 scale-110'
                : 'border-gray-300 hover:border-pink-400 bg-white'
            }`}
              onClick={() => onChange({ target: { name, checked: !value, type: 'checkbox' } })}
            >
              {value && <CheckCircle className="h-4 w-4 text-white" />}
            </div>
          </div>
          <label htmlFor={name} className="flex-1 cursor-pointer">
            <span className="block text-base font-bold text-gray-900 group-hover:text-pink-900 transition-colors">
              {label}
            </span>
            {description && (
              <p className="text-sm text-gray-600 mt-1 group-hover:text-pink-700 transition-colors">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                  ? 'border-pink-500 bg-gradient-to-r from-pink-50 to-rose-50 shadow-lg shadow-pink-200/50'
                  : 'border-gray-200 hover:border-pink-300 bg-white hover:bg-pink-50/30'
              }`}>
                <div className={`text-sm font-semibold transition-colors ${
                  value === option.value ? 'text-pink-700' : 'text-gray-700 group-hover:text-pink-600'
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
            className="block w-full px-4 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-0 focus:border-pink-500 transition-all duration-300 hover:border-pink-300 text-base font-medium text-gray-900 bg-white appearance-none cursor-pointer group-hover:shadow-lg group-hover:shadow-pink-100/50"
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
            className="block w-full px-4 py-4 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-0 focus:border-pink-500 transition-all duration-300 hover:border-pink-300 text-base font-medium text-gray-900 bg-white placeholder-gray-400 hover:shadow-lg hover:shadow-pink-100/50"
            min={type === "number" ? "0" : undefined}
          />
        )}
      </div>
    </div>
  );
};

// Enhanced FormSection with animated backgrounds
const FormSection = ({ title, icon: Icon, children, gradient = "from-pink-500 to-rose-600" }) => (
  <div className="group">
    <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gray-100 shadow-xl shadow-gray-200/20 hover:shadow-2xl hover:shadow-pink-200/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      <div className="relative">
        <div className="flex items-center space-x-4 mb-6">
          <div className={`p-3 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-pink-900 transition-colors">
            {title}
          </h3>
          <div className="flex-1"></div>
          <Sparkles className="h-5 w-5 text-pink-400 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
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
        <span className="text-base text-pink-600 font-bold">{current} of {total}</span>
      </div>
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 h-3 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-3 rounded-full bg-gradient-to-r from-pink-200/0 via-pink-200/20 to-pink-200/0 animate-pulse"></div>
      </div>
    </div>
  );
};

const CycleTracker = ({ onClose }) => {
  // State management
  const [formData, setFormData] = useState({
    // Period Info
    lastPeriodDate: "",
    periodLength: "",
    cycleLength: "",
    flow: "",
    
    // Symptoms
    cramps: false,
    headaches: false,
    moodChanges: false,
    bloating: false,
    breastTenderness: false,
    fatigue: false,
    backPain: false,
    acne: false,
    
    // Sleep & Mood
    sleepQuality: "",
    energyLevel: "",
    stressLevel: "",
    
    // Additional tracking
    exerciseLevel: "",
    waterIntake: "",
    notes: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictions, setPredictions] = useState(null);

  const totalPages = 4;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Page validation
  const validateCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return formData.lastPeriodDate !== "" && formData.periodLength !== "" && formData.cycleLength !== "" && formData.flow !== "";
      case 2:
        return true; // Symptoms are optional
      case 3:
        return formData.sleepQuality !== "" && formData.energyLevel !== "" && formData.stressLevel !== "";
      case 4:
        return formData.exerciseLevel !== "" && formData.waterIntake !== "";
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

  // Calculate predictions
  const calculatePredictions = () => {
    const lastPeriod = new Date(formData.lastPeriodDate);
    const cycleLength = parseInt(formData.cycleLength);
    
    // Next period prediction
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLength);
    
    // Ovulation prediction (14 days before next period)
    const ovulation = new Date(nextPeriod);
    ovulation.setDate(nextPeriod.getDate() - 14);
    
    // Fertility window (5 days before ovulation to 1 day after)
    const fertilityStart = new Date(ovulation);
    fertilityStart.setDate(ovulation.getDate() - 5);
    const fertilityEnd = new Date(ovulation);
    fertilityEnd.setDate(ovulation.getDate() + 1);
    
    // PMS window (5-7 days before period)
    const pmsStart = new Date(nextPeriod);
    pmsStart.setDate(nextPeriod.getDate() - 7);
    
    // Symptom insights
    const symptoms = [];
    if (formData.cramps) symptoms.push("Menstrual cramps");
    if (formData.headaches) symptoms.push("Headaches");
    if (formData.moodChanges) symptoms.push("Mood changes");
    if (formData.bloating) symptoms.push("Bloating");
    if (formData.breastTenderness) symptoms.push("Breast tenderness");
    if (formData.fatigue) symptoms.push("Fatigue");
    if (formData.backPain) symptoms.push("Back pain");
    if (formData.acne) symptoms.push("Acne breakouts");
    
    return {
      nextPeriod: nextPeriod.toISOString().split('T')[0],
      ovulation: ovulation.toISOString().split('T')[0],
      fertilityWindow: {
        start: fertilityStart.toISOString().split('T')[0],
        end: fertilityEnd.toISOString().split('T')[0]
      },
      pmsWindow: pmsStart.toISOString().split('T')[0],
      symptoms,
      cycleLength,
      periodLength: parseInt(formData.periodLength),
      flow: formData.flow
    };
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const cyclePredictions = calculatePredictions();
    setPredictions(cyclePredictions);

    setIsSubmitting(false);
    setShowResults(true);
  };

  // Results modal
  if (showResults && predictions) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white p-6 sm:p-8 rounded-t-3xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative flex items-center justify-between mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Calendar className="h-8 w-8" />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-2xl transition-colors backdrop-blur-sm"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Your Cycle Insights</h2>
            <p className="text-pink-100 text-base sm:text-lg">Personalized predictions based on your cycle data</p>
          </div>

          {/* Results Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Cycle Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-3xl border-2 border-pink-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-6 w-6 text-pink-600" />
                  <h3 className="text-lg font-bold text-pink-900">Cycle Length</h3>
                </div>
                <p className="text-3xl font-bold text-pink-700">{predictions.cycleLength} days</p>
              </div>
              
              <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-3xl border-2 border-rose-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Droplets className="h-6 w-6 text-rose-600" />
                  <h3 className="text-lg font-bold text-rose-900">Period Length</h3>
                </div>
                <p className="text-3xl font-bold text-rose-700">{predictions.periodLength} days</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-3xl border-2 border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-bold text-purple-900">Flow</h3>
                </div>
                <p className="text-2xl font-bold text-purple-700">{predictions.flow}</p>
              </div>
            </div>

            {/* Predictions */}
            <div className="space-y-6">
              {/* Next Period */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-3xl border-2 border-red-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-900">Next Period</h3>
                </div>
                <p className="text-2xl font-bold text-red-700 mb-2">
                  {new Date(predictions.nextPeriod).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-red-600">
                  {Math.ceil((new Date(predictions.nextPeriod) - new Date()) / (1000 * 60 * 60 * 24))} days away
                </p>
              </div>

              {/* Ovulation & Fertility */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-3xl border-2 border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Fertility Window</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-green-800 mb-1">Ovulation Day</p>
                    <p className="text-lg font-bold text-green-700">
                      {new Date(predictions.ovulation).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800 mb-1">Fertile Window</p>
                    <p className="text-lg font-bold text-green-700">
                      {new Date(predictions.fertilityWindow.start).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })} - {new Date(predictions.fertilityWindow.end).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* PMS Warning */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-3xl border-2 border-yellow-200">
                <div className="flex items-center space-x-3 mb-4">
                  <Moon className="h-6 w-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-yellow-900">PMS Alert</h3>
                </div>
                <p className="text-lg font-bold text-yellow-700 mb-2">
                  {new Date(predictions.pmsWindow).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-yellow-600">Be prepared for potential PMS symptoms</p>
              </div>
            </div>

            {/* Symptom Summary */}
            {predictions.symptoms.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-3xl border-2 border-purple-200">
                <h4 className="text-xl font-bold text-purple-900 mb-4">Your Tracked Symptoms</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {predictions.symptoms.map((symptom, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-white/80 rounded-2xl">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-purple-800 font-medium text-sm">{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Insights */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-3xl border-2 border-blue-200">
              <h4 className="text-xl font-bold text-blue-900 mb-4">Health Insights</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/80 rounded-2xl">
                  <p className="text-sm text-blue-800 font-semibold">Sleep Quality</p>
                  <p className="text-lg font-bold text-blue-700">{formData.sleepQuality}</p>
                </div>
                <div className="text-center p-4 bg-white/80 rounded-2xl">
                  <p className="text-sm text-blue-800 font-semibold">Energy Level</p>
                  <p className="text-lg font-bold text-blue-700">{formData.energyLevel}</p>
                </div>
                <div className="text-center p-4 bg-white/80 rounded-2xl">
                  <p className="text-sm text-blue-800 font-semibold">Stress Level</p>
                  <p className="text-lg font-bold text-blue-700">{formData.stressLevel}</p>
                </div>
              </div>
            </div>

            {/* Notes */}
            {formData.notes && (
              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-3xl border-2 border-gray-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Your Notes</h4>
                <p className="text-gray-700 italic">"{formData.notes}"</p>
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-pink-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-pink-200/50 text-lg"
            >
              Close Tracker
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main form interface
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b-2 border-pink-200 p-4 sm:p-6 z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Cycle Tracker</h1>
                <p className="text-gray-600 text-sm sm:text-base font-medium">Track your cycle and predict future dates</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-pink-100 rounded-2xl transition-colors group"
            >
              <X className="h-6 w-6 text-gray-600 group-hover:text-pink-600 transition-colors" />
            </button>
          </div>
          <ProgressBar current={currentPage} total={totalPages} />
        </div>

        {/* Form Content */}
        <div className="p-4 sm:p-8 overflow-y-auto" style={{maxHeight: 'calc(95vh - 200px)'}}>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Page 1 - Basic Cycle Info */}
              {currentPage === 1 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <FormSection title="Period Information" icon={Calendar} gradient="from-pink-500 to-rose-600">
                    <FormField
                      label="Last Period Start Date"
                      name="lastPeriodDate"
                      type="date"
                      value={formData.lastPeriodDate}
                      onChange={handleChange}
                      required
                      description="When did your last period start?"
                    />
                    <FormField
                      label="Period Length"
                      name="periodLength"
                      type="number"
                      value={formData.periodLength}
                      onChange={handleChange}
                      required
                      placeholder="5"
                      description="How many days does your period typically last?"
                    />
                    <FormField
                      label="Cycle Length"
                      name="cycleLength"
                      type="number"
                      value={formData.cycleLength}
                      onChange={handleChange}
                      required
                      placeholder="28"
                      description="Days from first day of one period to first day of next"
                    />
                    <FormField
                      label="Flow Intensity"
                      name="flow"
                      type="radio"
                      value={formData.flow}
                      onChange={handleChange}
                      required
                      radioOptions={[
                        { value: "Light", label: "Light" },
                        { value: "Normal", label: "Normal" },
                        { value: "Heavy", label: "Heavy" },
                      ]}
                      description="How would you describe your typical flow?"
                    />
                  </FormSection>
                </div>
              )}

              {/* Page 2 - Physical Symptoms */}
              {currentPage === 2 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <FormSection title="Physical Symptoms" icon={Activity} gradient="from-rose-500 to-red-600">
                    <FormField
                      label="Menstrual Cramps"
                      name="cramps"
                      type="checkbox"
                      value={formData.cramps}
                      onChange={handleChange}
                      description="Do you experience cramping during your period?"
                    />
                    <FormField
                      label="Headaches"
                      name="headaches"
                      type="checkbox"
                      value={formData.headaches}
                      onChange={handleChange}
                      description="Headaches or migraines during your cycle"
                    />
                    <FormField
                      label="Mood Changes"
                      name="moodChanges"
                      type="checkbox"
                      value={formData.moodChanges}
                      onChange={handleChange}
                      description="Mood swings, irritability, or emotional changes"
                    />
                    <FormField
                      label="Bloating"
                      name="bloating"
                      type="checkbox"
                      value={formData.bloating}
                      onChange={handleChange}
                      description="Abdominal bloating or water retention"
                    />
                    <FormField
                      label="Breast Tenderness"
                      name="breastTenderness"
                      type="checkbox"
                      value={formData.breastTenderness}
                      onChange={handleChange}
                      description="Breast soreness or sensitivity"
                    />
                    <FormField
                      label="Fatigue"
                      name="fatigue"
                      type="checkbox"
                      value={formData.fatigue}
                      onChange={handleChange}
                      description="Unusual tiredness or low energy"
                    />
                    <FormField
                      label="Back Pain"
                      name="backPain"
                      type="checkbox"
                      value={formData.backPain}
                      onChange={handleChange}
                      description="Lower back pain during menstruation"
                    />
                    <FormField
                      label="Acne Breakouts"
                      name="acne"
                      type="checkbox"
                      value={formData.acne}
                      onChange={handleChange}
                      description="Skin breakouts related to your cycle"
                    />
                  </FormSection>
                </div>
              )}

              {/* Page 3 - Sleep & Mood */}
              {currentPage === 3 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <FormSection title="Sleep & Wellbeing" icon={Moon} gradient="from-purple-500 to-pink-600">
                    <div className="lg:col-span-2">
                      <FormField
                        label="Sleep Quality"
                        name="sleepQuality"
                        type="radio"
                        value={formData.sleepQuality}
                        onChange={handleChange}
                        required
                        radioOptions={[
                          { value: "Poor", label: "Poor" },
                          { value: "Fair", label: "Fair" },
                          { value: "Good", label: "Good" },
                          { value: "Excellent", label: "Excellent" },
                        ]}
                        description="How would you rate your recent sleep quality?"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <FormField
                        label="Energy Level"
                        name="energyLevel"
                        type="radio"
                        value={formData.energyLevel}
                        onChange={handleChange}
                        required
                        radioOptions={[
                          { value: "Low", label: "Low" },
                          { value: "Moderate", label: "Moderate" },
                          { value: "High", label: "High" },
                          { value: "Very High", label: "Very High" },
                        ]}
                        description="What's your typical energy level?"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <FormField
                        label="Stress Level"
                        name="stressLevel"
                        type="radio"
                        value={formData.stressLevel}
                        onChange={handleChange}
                        required
                        radioOptions={[
                          { value: "Low", label: "Low" },
                          { value: "Moderate", label: "Moderate" },
                          { value: "High", label: "High" },
                          { value: "Very High", label: "Very High" },
                        ]}
                        description="How stressed have you been feeling lately?"
                      />
                    </div>
                  </FormSection>
                </div>
              )}

              {/* Page 4 - Lifestyle & Notes */}
              {currentPage === 4 && (
                <div className="space-y-8 animate-in slide-in-from-right duration-500">
                  <FormSection title="Lifestyle & Notes" icon={Heart} gradient="from-indigo-500 to-purple-600">
                    <div className="lg:col-span-2">
                      <FormField
                        label="Exercise Level"
                        name="exerciseLevel"
                        type="radio"
                        value={formData.exerciseLevel}
                        onChange={handleChange}
                        required
                        radioOptions={[
                          { value: "Sedentary", label: "Sedentary" },
                          { value: "Light", label: "Light" },
                          { value: "Moderate", label: "Moderate" },
                          { value: "Active", label: "Active" },
                          { value: "Very Active", label: "Very Active" },
                        ]}
                        description="How active are you on average?"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <FormField
                        label="Water Intake"
                        name="waterIntake"
                        type="radio"
                        value={formData.waterIntake}
                        onChange={handleChange}
                        required
                        radioOptions={[
                          { value: "Poor", label: "Poor" },
                          { value: "Fair", label: "Fair" },
                          { value: "Good", label: "Good" },
                          { value: "Excellent", label: "Excellent" },
                        ]}
                        description="How would you rate your daily water intake?"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <FormField
                        label="Additional Notes"
                        name="notes"
                        type="text"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any additional symptoms, observations, or notes about your cycle..."
                        description="Optional: Share any other details about your cycle or symptoms"
                      />
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
                      : 'bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50 hover:shadow-lg'
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
                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 hover:scale-105 hover:shadow-xl hover:shadow-pink-200/50'
                        : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Next Step
                  </button>
                )}
                {currentPage === totalPages && (
                  <button
                    type="submit"
                    disabled={isSubmitting || !validateCurrentPage()}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 text-lg ${
                      isSubmitting || !validateCurrentPage()
                        ? 'bg-pink-300 text-pink-100 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 hover:scale-105 hover:shadow-xl hover:shadow-pink-200/50'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Get My Cycle Insights'
                    )}
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
  const [showTracker, setShowTracker] = useState(false);
  const router = useRouter();

  const handleCloseTracker = () => {
    setShowTracker(false);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-xl text-center border-2 border-pink-200">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center shadow-lg">
            <Calendar className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Cycle Tracker
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Track your menstrual cycle, log symptoms, and get personalized predictions for your next period, ovulation, and fertility window.
        </p>
        <button
          onClick={() => setShowTracker(true)}
          className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-pink-200/50"
        >
          Start Tracking
        </button>
      </div>
      {showTracker && <CycleTracker onClose={handleCloseTracker} />}
    </div>
  );
};

export default App;