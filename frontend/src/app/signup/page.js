"use client";
import { useState, useEffect, useRef } from "react";

// Custom SVG Icons
const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Lock = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOff = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const InputField = ({ 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  required = false, 
  icon: Icon,
  placeholder,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  error
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-base font-normal text-gray-800 mb-1">
        {label} {required && <span className="text-rose-600 text-lg">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`block w-full pl-9 sm:pl-10 ${showPasswordToggle ? 'pr-10 sm:pr-12' : 'pr-3 sm:pr-4'} py-2.5 sm:py-3 border ${
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-600 bg-red-50 text-gray-900' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500 text-gray-900'
          } rounded-lg sm:rounded-xl shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-400 text-base sm:text-lg font-normal`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-start space-x-2 p-4 bg-red-100 border-2 border-red-400 rounded-lg shadow-sm">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <span className="text-base text-red-800 font-normal leading-tight">{error}</span>
        </div>
      )}
    </div>
  );
};

const PasswordStrength = ({ password }) => {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters" },
    { regex: /[A-Z]/, text: "One uppercase letter" },
    { regex: /[a-z]/, text: "One lowercase letter" },
    { regex: /[0-9]/, text: "One number" },
    { regex: /[^A-Za-z0-9]/, text: "One special character" }
  ];

  const getStrengthColor = () => {
    const validCount = requirements.filter(req => req.regex.test(password)).length;
    if (validCount <= 2) return "text-red-500";
    if (validCount <= 4) return "text-yellow-500";
    return "text-green-500";
  };

  const getStrengthText = () => {
    const validCount = requirements.filter(req => req.regex.test(password)).length;
    if (validCount <= 2) return "Weak";
    if (validCount <= 4) return "Medium";
    return "Strong";
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-3 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm">
      <div className={`text-base font-normal ${getStrengthColor()}`}>
        Password Strength: {getStrengthText()}
      </div>
      <div className="space-y-2">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-3">
            <CheckCircle 
              className={`h-5 w-5 ${req.regex.test(password) ? 'text-green-600' : 'text-gray-400'}`}
            />
            <span className={`text-base font-normal ${req.regex.test(password) ? 'text-green-800' : 'text-gray-700'}`}>
              {req.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Success Message Component
const SuccessMessage = ({ onRedirect, redirectSeconds }) => (
  <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 flex items-center justify-center p-3 sm:p-4">
    <div className="relative w-full max-w-sm sm:max-w-md">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-green-200 p-6 sm:p-8 text-center">
        <div className="mb-4 sm:mb-6">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Account Created Successfully!</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Welcome to GynoCare! You can now sign in to your account.</p>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-green-700">
              🎉 You're all set! Redirecting you to the sign-in page in <span className="font-semibold">{redirectSeconds}</span> seconds...
            </p>
          </div>
          
          <button
            onClick={onRedirect}
            className="w-full py-3 sm:py-4 px-4 rounded-xl font-semibold text-white text-sm sm:text-base bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 hover:scale-105 shadow-lg active:scale-95 transition-all duration-300 transform"
          >
            Go to Sign In Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    if (isSignedUp) {
      redirectTimerRef.current = setInterval(() => {
        setRedirectSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            handleRedirect();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }
    return () => {
      if (redirectTimerRef.current) {
        clearInterval(redirectTimerRef.current);
      }
    };
  }, [isSignedUp]);

  const handleRedirect = () => {
    if (redirectTimerRef.current) {
      clearInterval(redirectTimerRef.current);
    }
    // In a real app, you would use a router here
    alert("Redirecting to login page...");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[^A-Za-z0-9]/.test(formData.password)) {
      newErrors.password = "Password must meet all strength requirements";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);
    
    if (Object.keys(formErrors).length > 0) {
      // Scroll to first error
      const firstErrorField = Object.keys(formErrors)[0];
      const element = document.querySelector(`input[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Simulated successful sign-up
      setIsSignedUp(true);
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  // Test function to trigger validation - for debugging
  const testValidation = () => {
    const formErrors = validateForm();
    setErrors(formErrors);
    console.log("Validation errors:", formErrors);
  };

  if (isSignedUp) {
    return <SuccessMessage onRedirect={handleRedirect} redirectSeconds={redirectSeconds} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 flex items-center justify-center p-3 sm:p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 sm:-bottom-40 sm:-left-40 w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md">
        {/* Back to Home Link */}
        <div className="mb-4 sm:mb-6 text-center">
          <a 
            href="/" 
            className="inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors text-sm font-medium"
          >
            ← Back to Home
          </a>
        </div>

        {/* Logo and Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl sm:text-2xl">G</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              GynoCare
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-800 font-normal px-4 sm:px-0">Create your account to get started</p>
        </div>

        {/* Sign-up Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-2 sm:mb-3">Sign Up</h2>
            <p className="text-base sm:text-lg text-gray-700 font-normal">Join our community today</p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-6 p-5 bg-red-100 border-2 border-red-400 rounded-xl shadow-md">
              <div className="flex items-center space-x-3 text-red-900">
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                <span className="text-base font-normal">{errors.general}</span>
              </div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              icon={User}
              placeholder="Enter your full name"
              error={errors.name}
            />

            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              icon={Mail}
              placeholder="Enter your email"
              error={errors.email}
            />

            <InputField
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
              icon={Calendar}
              error={errors.dob}
            />

            <div>
              <InputField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={Lock}
                placeholder="Create a password"
                showPasswordToggle
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={errors.password}
              />
              <PasswordStrength password={formData.password} />
            </div>

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              icon={Lock}
              placeholder="Re-enter your password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              error={errors.confirmPassword}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 sm:py-5 px-4 rounded-xl font-normal text-white text-lg sm:text-xl transition-all duration-300 transform ${
                !isLoading
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 hover:scale-105 shadow-xl hover:shadow-2xl active:scale-95"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  <span>Signing Up...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-600">
              Already have an account?{" "}
              <button>
                <a
                  href="/login" 
                className="text-rose-600 hover:text-rose-700 font-semibold transition-colors"
              >
                Sign In
                </a>
              </button>
            </p>
          </div>
        </div>

        {/* only for desiging purpose */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="p-2 sm:p-3 bg-white/50 rounded-lg sm:rounded-xl border border-rose-100">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-100 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <span className="text-rose-600 text-xs sm:text-sm">📊</span>
            </div>
            <p className="text-xs font-medium text-gray-600">Track Cycles</p>
          </div>
          
          <div className="p-2 sm:p-3 bg-white/50 rounded-lg sm:rounded-xl border border-rose-100">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-100 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <span className="text-rose-600 text-xs sm:text-sm">🩺</span>
            </div>
            <p className="text-xs font-medium text-gray-600">Health Insights</p>
          </div>
          
          <div className="p-2 sm:p-3 bg-white/50 rounded-lg sm:rounded-xl border border-rose-100">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-100 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <span className="text-rose-600 text-xs sm:text-sm">👥</span>
            </div>
            <p className="text-xs font-medium text-gray-600">Community</p>
          </div>
        </div>
      </div>
    </div>
  );
}