"use client";
import { useState, useEffect, useRef } from "react";
import { removeToken } from "../../utils/api";

// Custom SVG Icons
const LogOut = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const CheckCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const User = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Home = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Success Logout Message Component
const LogoutSuccessMessage = ({ onRedirect, redirectSeconds, userName }) => (
  <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 flex items-center justify-center p-3 sm:p-4">
    <div className="relative w-full max-w-sm sm:max-w-md">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-green-200 p-6 sm:p-8 text-center">
        <div className="mb-4 sm:mb-6">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-normal text-gray-800 mb-1 sm:mb-2">Successfully Logged Out!</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Thank you for using GynoCare. See you again soon!</p>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-green-700">
              👋 Redirecting to homepage in <span className="font-normal">{redirectSeconds}</span> seconds...
            </p>
          </div>
          
          <button
            onClick={onRedirect}
            className="w-full py-3 sm:py-4 px-4 rounded-xl font-normal text-white text-sm sm:text-base bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 hover:scale-105 shadow-lg active:scale-95 transition-all duration-300 transform flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Go to Homepage</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default function LogoutPage() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(5);
  const [userName] = useState("Sarah Johnson"); // Mock user name
  const redirectTimerRef = useRef(null);

  useEffect(() => {
    if (isLoggedOut) {
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
  }, [isLoggedOut]);

  const handleRedirect = () => {
    if (redirectTimerRef.current) {
      clearInterval(redirectTimerRef.current);
    }
    // Redirect to home page
    window.location.href = '/';
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      // Remove token from localStorage (logout is client-side)
      // Note: Backend doesn't have a logout endpoint since JWT tokens are stateless
      // If you want server-side logout, you'd need to implement a token blacklist
      removeToken();
      
      setIsLoggedOut(true);
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, clear tokens
      removeToken();
      setIsLoggedOut(true);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCancel = () => {
    // Stay on the current logout page - don't redirect anywhere
    if (redirectTimerRef.current) {
      clearInterval(redirectTimerRef.current);
    }
    // Just stay on the logout page - no redirect
    console.log("User chose to stay on logout page");
  };

  if (isLoggedOut) {
    return <LogoutSuccessMessage onRedirect={handleRedirect} redirectSeconds={redirectSeconds} userName={userName} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 flex items-center justify-center p-3 sm:p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 sm:-top-40 sm:-right-40 w-48 h-48 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 sm:-bottom-40 sm:-left-40 w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-sm sm:max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-normal text-xl sm:text-2xl">G</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-normal bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              GynoCare
            </h1>
          </div>
        </div>

        {/* Logout Confirmation Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100 p-6 sm:p-8">
          
          {/* User Info Section */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-rose-100 rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-rose-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-normal text-gray-900 mb-1 sm:mb-2">Ready to Sign Out?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-2">Hello, {userName}!</p>
            <p className="text-sm text-gray-500">You are about to log out from your GynoCare account.</p>
          </div>

          {/* Session Info */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6 text-center">
            <div className="text-sm text-rose-700 space-y-1">
              <p className="font-normal">🕐 Session started: Today at 9:30 AM</p>
              <p className="text-xs text-rose-600">Your data has been automatically saved</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full py-3 sm:py-4 px-4 rounded-xl font-normal text-white text-sm sm:text-base transition-all duration-300 transform flex items-center justify-center space-x-2 ${
                !isLoggingOut
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoggingOut ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                  <span>Signing Out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Yes, Sign Me Out</span>
                </>
              )}
            </button>

            <button
              onClick={handleCancel}
              disabled={isLoggingOut}
              className="w-full py-3 sm:py-4 px-4 rounded-xl font-normal text-gray-700 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 border border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Cancel & Stay</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-180" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 mb-3">Need something quick?</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => alert("Opening settings...")}
                className="text-xs text-rose-600 hover:text-rose-700 transition-colors"
              >
                Account Settings
              </button>
              <span className="text-gray-300">•</span>
              <button 
                onClick={() => alert("Opening help...")}
                className="text-xs text-rose-600 hover:text-rose-700 transition-colors"
              >
                Help & Support
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access Features */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="p-2 sm:p-3 bg-white/50 rounded-lg sm:rounded-xl border border-rose-100">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-100 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <span className="text-rose-600 text-xs sm:text-sm">📊</span>
            </div>
            <p className="text-xs font-normal text-gray-600">Your Progress</p>
          </div>
          
          <div className="p-2 sm:p-3 bg-white/50 rounded-lg sm:rounded-xl border border-rose-100">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-100 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <span className="text-rose-600 text-xs sm:text-sm">💾</span>
            </div>
            <p className="text-xs font-normal text-gray-600">Auto Saved</p>
          </div>
          
          <div className="p-2 sm:p-3 bg-white/50 rounded-lg sm:rounded-xl border border-rose-100">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-rose-100 rounded-md sm:rounded-lg flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <span className="text-rose-600 text-xs sm:text-sm">🔒</span>
            </div>
            <p className="text-xs font-normal text-gray-600">Secure</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-xs text-gray-500">
            Your privacy and data security are our top priorities.
          </p>
        </div>
      </div>
    </div>
  );
}