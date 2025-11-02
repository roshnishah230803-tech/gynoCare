"use client";
import { useState } from "react";

// Custom SVG Icons
const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const AlertCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowLeft = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  error
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`block w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-3 sm:py-4 border ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
          } rounded-xl sm:rounded-2xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-400 text-sm sm:text-base bg-white text-gray-900`}
          style={{ color: '#111827' }}
        />
      </div>
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm animate-slide-in">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // Reset form when going back
    setFormData({ email: "" });
    setErrors({});
    setIsSubmitted(false);
    // In a real app, you'd use router.push('/login') or similar
    window.location.href = '/login';
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative w-full max-w-md animate-fade-in">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-rose-100 p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Check Your Email!</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We've sent a password reset link to <br />
                <span className="font-semibold text-rose-600">{formData.email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 text-left">
                <h3 className="font-semibold text-blue-800 mb-2">What's next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Check your email inbox</li>
                  <li>• Look for an email from GynoCare</li>
                  <li>• Click the reset link to set a new password</li>
                  <li>• Link expires in 24 hours</li>
                </ul>
              </div>

              <button
                onClick={handleBackToLogin}
                className="w-full py-4 px-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Back to Login
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Didn't receive the email? Check your spam folder or{" "}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-rose-600 hover:text-rose-700 font-semibold underline"
                >
                  try again
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-pink-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-rose-300/50 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400/50 rounded-full animate-bounce" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-orange-300/50 rounded-full animate-bounce" style={{ animationDelay: '5s' }}></div>
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Back to Login Link */}
        <div className="mb-6 text-center">
          <button 
            onClick={handleBackToLogin}
            className="inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 transition-all duration-300 font-medium group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Login</span>
          </button>
        </div>

        {/* Enhanced Logo and Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-400 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              GynoCare
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Reset your password to regain access to your health journey</p>
        </div>

        {/* Enhanced Forgot Password Form */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-rose-100 p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-rose-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200 animate-shake">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm font-medium">{errors.general}</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              icon={Mail}
              placeholder="Enter your email address"
              error={errors.email}
            />

            {/* Enhanced Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 px-4 rounded-xl font-semibold text-white text-base transition-all duration-300 transform ${
                !isLoading
                  ? "bg-gradient-to-r from-rose-500 via-pink-600 to-orange-600 hover:from-rose-600 hover:via-pink-700 hover:to-orange-700 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-rose-600 hover:text-rose-700 font-semibold transition-colors hover:underline"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            🔒 Your data is secure and encrypted. The reset link will expire in 24 hours for your security.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}