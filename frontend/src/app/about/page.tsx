"use client";
import { useState } from "react";

const ActionButton = ({ href, children, variant = "primary" }) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variants = {
    primary: "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg hover:shadow-xl hover:from-rose-500 hover:to-pink-600",
    secondary: "bg-white text-rose-600 border-2 border-rose-200 hover:bg-rose-50 hover:border-rose-300"
  };
  
  return (
    <a href={href}>
      <button className={`${baseClasses} ${variants[variant]}`}>
        {children}
      </button>
    </a>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
    <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <span className="text-white text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-700 transition-colors">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">
      {description}
    </p>
  </div>
);

const StatCard = ({ number, label, description }) => (
  <div className="text-center group">
    <div className="bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl p-6 mb-4 group-hover:scale-105 transition-transform duration-300">
      <div className="text-4xl font-bold text-white">{number}</div>
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{label}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const TeamMember = ({ name, role, description, image }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
    <div className="w-24 h-24 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
      <img src={image} alt={name} className="w-20 h-20 rounded-full object-cover" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{name}</h3>
    <p className="text-rose-600 font-medium text-center mb-3">{role}</p>
    <p className="text-gray-700 text-sm text-center leading-relaxed">{description}</p>
  </div>
);

export default function AboutUS() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/awareness", label: "Awareness" },
    { href: "/login", label: "Sign In" },
  ];

  const features = [
    {
      icon: "📊",
      title: "Smart Period Tracking",
      description: "Advanced algorithms that learn your unique cycle patterns, providing personalized predictions and insights for better health management."
    },
    {
      icon: "🩺",
      title: "Medical-Grade Information",
      description: "Awareness  by certified gynecologists and healthcare professionals, ensuring accuracy and reliability in every piece of information."
    },
    {
      icon: "🔔",
      title: "Intelligent Alerts",
      description: "Receive timely reminders for medication, appointments, and important health milestones based on your personal health profile."
    },
    {
      icon: "👥",
      title: "Supportive Community",
      description: "Connect with thousands of women sharing similar experiences in a safe, moderated environment that promotes understanding and support."
    },
    {
      icon: "📱",
      title: "Cross-Platform Access",
      description: "Seamlessly access your health data across all devices with secure cloud synchronization and offline capabilities."
    },
    {
      icon: "🎯",
      title: "Personalized Insights",
      description: "AI-powered analysis of your health patterns provides personalized recommendations and early warning signs for potential health issues."
    }
  ];

  const stats = [
    { number: "98%", label: "Accuracy Rate", description: "In cycle predictions and symptoms" },
    { number: "24/7", label: "Support Available", description: "Expert guidance when needed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-rose-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Back to Home Button - Fixed Position */}
      <div className="fixed top-4 left-4 z-50">
        <a href="/" className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-rose-600 px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white group border border-rose-100">
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </a>
      </div>

      {/* Navigation */}
      <nav className="relative z-40 bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                GynoCare
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    item.label === "About Us" 
                      ? "bg-rose-100 text-rose-700" 
                      : "text-gray-700 hover:bg-rose-100 hover:text-rose-700"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <ActionButton href="/logout" variant="secondary">
                Logout
              </ActionButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-rose-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`h-0.5 bg-gray-700 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 py-4 border-t border-rose-100 space-y-2">
              {/* Back to Home - Mobile */}
              <a
                href="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-rose-600 font-medium transition-colors hover:bg-rose-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </a>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors hover:bg-rose-100"
                >
                  {item.label}
                </a>
              ))}
              <div className="px-4 pt-2">
                <ActionButton href="/logout" variant="secondary">
                  Logout
                </ActionButton>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight mb-6 sm:mb-8">
            About GynoCare
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0">
            Revolutionizing women's healthcare through innovative technology, comprehensive education, and compassionate community support.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-white/80 to-rose-50/50 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-xl border border-rose-100">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                GynoCare is dedicated to transforming women's health through cutting-edge technology and evidence-based education. We believe every woman deserves access to comprehensive, personalized healthcare information and tools.
              </p>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Our platform combines advanced medical research with user-friendly technology to provide accurate period tracking, symptom monitoring, and health insights that empower women to take control of their reproductive health journey.
              </p>
              <ActionButton href="/awareness">
                Explore Our Resources
              </ActionButton>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-rose-200 to-pink-200 rounded-2xl lg:rounded-3xl flex items-center justify-center">
                <span className="text-4xl sm:text-6xl">🌸</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">Our Vision</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
            To create a world where women feel informed, confident, and supported at every stage of their health journey. We envision a future where healthcare barriers are eliminated through technology and community.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16 max-w-4xl mx-auto px-4 sm:px-0">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">What We Offer</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Comprehensive tools and resources designed specifically for women's unique healthcare needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* Approach Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Approach</h2>
              <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
                We combine cutting-edge technology, medical expertise, and community support to create a holistic platform that addresses all aspects of women's health.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">Evidence-Based</h3>
                <p className="opacity-90 text-sm sm:text-base">All information is medically reviewed and scientifically validated</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">Community-Driven</h3>
                <p className="opacity-90 text-sm sm:text-base">Built with input from thousands of women sharing their experiences</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">Privacy-First</h3>
                <p className="opacity-90 text-sm sm:text-base">Your health data is encrypted and never shared without permission</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Core Values</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">E</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Empowerment</h3>
                <p className="text-gray-700">We believe knowledge is power. Our platform empowers women with the information and tools they need to make informed health decisions.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">I</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Inclusivity</h3>
                <p className="text-gray-700">Healthcare should be accessible to everyone. We design our platform to be inclusive and welcoming to all women, regardless of background.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">C</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Compassion</h3>
                <p className="text-gray-700">We understand that health journeys can be challenging. Our community and support systems are built on empathy and understanding.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Accuracy</h3>
                <p className="text-gray-700">Medical accuracy is non-negotiable. Every piece of information on our platform is reviewed by qualified healthcare professionals.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">I</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-700">We continuously innovate to provide better tools and insights, staying at the forefront of women's health technology.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">T</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Transparency</h3>
                <p className="text-gray-700">We believe in open communication about our methods, data usage, and the science behind our recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-white/80 to-rose-50/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands of women who trust GynoCare for their health management needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton href="/">
              Get Started Today
            </ActionButton>
            <ActionButton href="/awareness" variant="secondary">
              Learn More
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <h3 className="text-2xl font-bold">GynoCare</h3>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            © 2025 GynoCare. All rights reserved. Dedicated to women's health education and empowerment. 
            Breaking barriers, building bridges to better healthcare.
          </p>
          <div className="mt-6 flex justify-center space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-rose-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-gray-400 hover:text-rose-400 transition-colors">Terms of Service</a>
            <a href="/contact" className="text-gray-400 hover:text-rose-400 transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}