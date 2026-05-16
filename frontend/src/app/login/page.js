"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient, setToken } from "../../utils/api";

// Custom SVG Icons
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
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-rose-500">*</span>}
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
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
          } rounded-lg sm:rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-gray-400 text-sm sm:text-base bg-white text-gray-900`}
          style={{ color: '#111827' }}
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
        <div className="flex items-center space-x-1 text-red-600 text-sm">
          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="text-xs sm:text-sm">{error}</span>
        </div>
      )}
    </div>
  );
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false); // Changed to false by default
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      // Call actual API
      const response = await apiClient.post('/auth/login', {
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.success && response.data.token) {
        // Store authentication token
        setToken(response.data.token);
        
        // Redirect to the return URL with fromLogin parameter if it's the PCOS page
        if (returnUrl === '/pcos') {
          router.push('/pcos?fromLogin=true');
        } else {
          router.push(returnUrl);
        }
      } else {
        setErrors({ general: response.message || "Login failed. Please check your credentials." });
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.status === 401) {
        setErrors({ general: "Invalid email or password. Please try again." });
      } else if (error.status === 400) {
        if (error.data && error.data.errors) {
          const fieldErrors = {};
          error.data.errors.forEach(err => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          setErrors({ general: error.data?.message || error.message || "Invalid input. Please check your information." });
        }
      } else {
        setErrors({ general: error.message || "Something went wrong. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">Welcome back! Please sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">Sign In</h2>
            <p className="text-sm sm:text-base text-gray-600">Access your health dashboard</p>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 sm:p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">{errors.general}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              icon={Lock}
              placeholder="Enter your password"
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              error={errors.password}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-rose-600 border-gray-300 rounded focus:ring-rose-500"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a
                href="/Forgotpassword"
                className="text-sm text-rose-600 hover:text-rose-700 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 sm:py-4 px-4 rounded-xl font-semibold text-white text-sm sm:text-base transition-all duration-300 transform ${
                !isLoading
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Feature Highlights */}
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