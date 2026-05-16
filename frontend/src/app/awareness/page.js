"use client";
import React, { useState, useEffect } from "react";

// Animation and scroll effects hook
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};

const ActionButton = ({ href, children, variant = "primary", className = "" }) => {
  const baseClasses = "px-6 py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:shadow-2xl hover:from-rose-600 hover:to-pink-700",
    secondary: "bg-white text-rose-600 border-2 border-rose-300 hover:bg-rose-50 hover:border-rose-400 hover:shadow-xl",
    outline: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-rose-600"
  };
  
  return (
    <a href={href}>
      <button className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </button>
    </a>
  );
};

const FeatureCard = ({ icon, title, description, stats, className = "" }) => (
  <div className={`group bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-rose-100 ${className}`}>
    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
      <span className="text-white text-2xl lg:text-3xl">{icon}</span>
    </div>
    <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 lg:mb-4 group-hover:text-rose-700 transition-colors">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed mb-4 text-sm lg:text-base">
      {description}
    </p>
    {stats && (
      <div className="mt-4 p-4 bg-rose-50 rounded-xl border-l-4 border-rose-400">
        <p className="text-rose-700 font-semibold text-sm">{stats}</p>
      </div>
    )}
  </div>
);

const TestimonialCard = ({ quote, author, condition, className = "" }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl border border-rose-100 flex flex-col justify-between h-full transition-all duration-300 hover:scale-105 ${className}`}>
    <div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">⭐</span>
        ))}
      </div>
      <p className="text-base lg:text-lg text-gray-700 italic leading-relaxed mb-4">"{quote}"</p>
      {condition && (
        <p className="text-sm text-rose-600 font-medium mb-4 bg-rose-50 px-3 py-2 rounded-lg inline-block">
          {condition}
        </p>
      )}
    </div>
    <p className="font-semibold text-rose-600 text-right">- {author}</p>
  </div>
);

const StatCard = ({ number, label, icon, description }) => (
  <div className="text-center group">
    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
      <span className="text-2xl lg:text-3xl">{icon}</span>
    </div>
    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-lg lg:text-xl text-white/90 font-semibold mb-2">{label}</div>
    <div className="text-sm lg:text-base text-white/80">{description}</div>
  </div>
);

const FactCard = ({ title, fact, source, className = "" }) => (
  <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-100 hover:shadow-xl transition-all duration-300 ${className}`}>
    <h4 className="text-lg font-bold text-rose-600 mb-3">{title}</h4>
    <p className="text-gray-700 mb-3 leading-relaxed">{fact}</p>
    <p className="text-xs text-gray-500 italic">Source: {source}</p>
  </div>
);

const ProgressBar = ({ percentage, label, color = "rose" }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div 
        className={`bg-gradient-to-r from-${color}-400 to-${color}-500 h-3 rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default function App() {
  const scrollY = useScrollAnimation();
  
  const features = [
    {
      icon: "🩸",
      title: "Advanced Period & Cycle Tracker",
      description: "Our AI-powered tracker learns your unique patterns and predicts your cycle with 95% accuracy. Track symptoms, mood changes, flow intensity, and get personalized insights about your hormonal health.",
      stats: "Studies show cycle tracking increases healthcare conversation quality by 73%"
    },
    {
      icon: "💧",
      title: "UTI Prevention & Management",
      description: "Early detection saves time and pain. Our comprehensive UTI tracker helps identify patterns, triggers, and symptoms. Share detailed reports with your healthcare provider for faster, more accurate treatment.",
      stats: "Early detection reduces UTI complications by 60%"
    },
    {
      icon: "🧠",
      title: "Evidence-Based Health Education",
      description: "Access a library of medically reviewed articles, interactive guides, and expert insights. Stay informed about reproductive health, hormonal changes, and preventive care with content updated by healthcare professionals.",
      stats: "Informed patients have 40% better health outcomes"
    },
    {
      icon: "🔒",
      title: "Military-Grade Privacy Protection",
      description: "Your health data deserves the highest protection. We use end-to-end encryption, secure cloud storage, and HIPAA-compliant practices. You control who sees your data - always.",
      stats: "Zero data breaches since launch - 100% privacy guaranteed"
    },
    {
      icon: "📊",
      title: "Personalized Health Analytics",
      description: "Transform your health data into actionable insights. Our advanced analytics identify patterns, predict potential issues, and provide personalized recommendations based on your unique health profile.",
      stats: "Users report 65% improvement in health awareness"
    },
    {
      icon: "👩‍⚕️",
      title: "Expert Healthcare Network",
      description: "Connect with certified gynecologists, urologists, and women's health specialists. Get professional guidance, second opinions, and personalized care plans from the comfort of your home.",
      stats: "Access to 500+ verified healthcare professionals"
    }
  ];

  const testimonials = [
    {
      quote: "This platform saved me months of uncertainty. The cycle tracker predicted my PCOS symptoms before my doctor could diagnose it. Having detailed data made all the difference in getting the right treatment quickly.",
      author: "Sarah M., 28",
      condition: "PCOS Management"
    },
    {
      quote: "As someone prone to recurring UTIs, the symptom tracker has been life-changing. I can now identify triggers and take preventive action. My UTI frequency has dropped by 80% since using this platform.",
      author: "Jennifer R., 35",
      condition: "Recurrent UTI Prevention"
    },
    {
      quote: "The educational content is incredible. I learned more about my body in 3 months than in years of doctor visits. Knowledge truly is power when it comes to women's health.",
      author: "Maria L., 42",
      condition: "Perimenopause Journey"
    },
    {
      quote: "The privacy features give me complete peace of mind. I can track sensitive health information knowing it's completely secure. The insights have helped me make better health decisions.",
      author: "Ashley K., 31",
      condition: "Fertility Planning"
    },
    {
      quote: "Having detailed health reports to share with my gynecologist has transformed my appointments. We spend less time on history and more time on solutions. My health outcomes have improved dramatically.",
      author: "Rachel T., 29",
      condition: "Endometriosis Management"
    },
    {
      quote: "This platform helped me recognize early signs of hormonal imbalance. The tracking data led to early intervention that prevented more serious complications. I'm grateful for this proactive approach to health.",
      author: "Lisa D., 38",
      condition: "Hormonal Health"
    }
  ];

  const healthFacts = [
    {
      title: "Period Tracking Impact",
      fact: "Women who track their menstrual cycles are 3x more likely to detect irregularities early, leading to faster diagnosis of conditions like PCOS, endometriosis, and thyroid disorders.",
      source: "Journal of Women's Health, 2023"
    },
    {
      title: "UTI Prevention Success",
      fact: "Tracking UTI symptoms and triggers reduces recurrence rates by up to 70%. Early symptom recognition allows for preventive measures that can stop infections before they start.",
      source: "American Urological Association, 2023"
    },
    {
      title: "Health Literacy Benefits",
      fact: "Women with higher health literacy have 50% fewer emergency room visits and 40% better management of chronic conditions. Knowledge empowers better health decisions.",
      source: "Health Affairs Journal, 2023"
    },
    {
      title: "Digital Health Impact",
      fact: "Digital health tracking increases patient engagement by 85% and improves communication with healthcare providers, leading to more personalized and effective treatment plans.",
      source: "Digital Medicine Research, 2023"
    }
  ];

  const stats = [
    {
      label: "Women Empowered",
      icon: "👩",
      description: "Taking control of their health journey"
    },
    {
      number: "95%",
      label: "Accuracy Rate",
      icon: "🎯",
      description: "In cycle prediction and symptom tracking"
    },
    {
      number: "73%",
      label: "Better Outcomes",
      icon: "📈",
      description: "Improvement in health management"
    },
    {
      number: "24/7",
      label: "Always Available",
      icon: "⏰",
      description: "Your health companion never sleeps"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">

      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 lg:w-[500px] lg:h-[500px] bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-pink-200/20 to-rose-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-20 left-20 w-48 h-48 bg-gradient-to-br from-rose-300/20 to-pink-200/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
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
              <a href="/" className="px-4 py-2 rounded-lg font-medium bg-rose-100 text-rose-700 transition-all duration-300">
                Home
              </a>
              <a href="/about" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-rose-100 hover:text-rose-700 transition-all duration-300">
                About Us
              </a>
              <a href="/awareness" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-rose-100 hover:text-rose-700 transition-all duration-300">
                Awareness
              </a>
              <ActionButton href="/signup" variant="secondary">
                Sign Up
              </ActionButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <ActionButton href="/login" variant="secondary" className="px-4 py-2 text-sm">
                Sign In
              </ActionButton>
            </div>
          </div>
        </div>
      </nav>
    
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
        {/* Enhanced Hero Section */}
        <section className="py-16 sm:py-20 lg:py-32 text-center">
          <div className="mb-8 lg:mb-12">
            <div className="inline-flex items-center space-x-3 lg:space-x-4 mb-6 lg:mb-8">
              <div className="w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-rose-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-2xl lg:text-4xl">G</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                GynoCare
              </h1>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6 lg:mb-8">
            Empower Your Health with
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent block lg:inline lg:ml-4">
              Knowledge & Technology
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed mb-8 lg:mb-12 px-4 sm:px-0">
            Join millions of women who've transformed their healthcare experience through intelligent tracking, evidence-based education, and personalized insights. Your health journey starts with understanding your body.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 lg:mb-16">
            <ActionButton href="/" variant="primary" className="text-xl px-8 py-4">
              Start Your Health Journey
            </ActionButton>
            <ActionButton href="/about" variant="secondary" className="text-xl px-8 py-4">
              Learn More About Us
            </ActionButton>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-12 opacity-90">
  {/* Confidential */}
  <div className="text-center">
    <div className="flex flex-col items-center gap-2">
      {/* Lock Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-pink-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.105 0 2-.895 2-2V7a2 2 0 10-4 0v2c0 1.105.895 2 2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 11v10h12V11H6z" />
      </svg>
      <div className="text-2xl lg:text-3xl font-bold text-pink-600">Confidential</div>
      <div className="text-sm lg:text-base text-gray-600">All health data is private and secure</div>
    </div>
  </div>

  {/* Trusted */}
  <div className="text-center">
    <div className="flex flex-col items-center gap-2">
      {/* Users Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-pink-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20H4v-2a4 4 0 014-4h1" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
      <div className="text-2xl lg:text-3xl font-bold text-pink-600">Trusted</div>
      <div className="text-sm lg:text-base text-gray-600">Millions of women rely on our platform</div>
    </div>
  </div>

  {/* Evidence-Based */}
  <div className="text-center">
    <div className="flex flex-col items-center gap-2">
      {/* Document / Research Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-pink-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l5 5v11a2 2 0 01-2 2z" />
      </svg>
      <div className="text-2xl lg:text-3xl font-bold text-pink-600">Evidence-Based</div>
      <div className="text-sm lg:text-base text-gray-600">Guidance backed by medical research</div>
    </div>
  </div>
</div>


</section>

        {/* Statistics Section */}
        <section className="py-16 lg:py-20">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl lg:rounded-[3rem] p-8 lg:p-16 shadow-2xl">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
                Transforming Women's Healthcare
              </h2>
              <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto">
                Real numbers, real impact on women's health worldwide
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Mission Section */}
        <section className="py-16 lg:py-20">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl lg:rounded-[3rem] p-8 lg:p-16 shadow-2xl border border-rose-100">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 lg:mb-8">
                Why Health Awareness is Critical
              </h2>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="text-left">
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                    <strong className="text-rose-600">Every 60 seconds</strong>, a woman somewhere discovers a health condition that could have been detected earlier through proper tracking and awareness.
                  </p>
                  <p className="text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                    Understanding your body's signals isn't just empowering—it's potentially life-saving. By tracking key metrics like menstrual cycles, symptoms, and health patterns, you become an active participant in your healthcare, not just a passive recipient.
                  </p>
                  <div className="space-y-4">
                    <ProgressBar percentage={85} label="Women report better health outcomes with tracking" color="rose" />
                    <ProgressBar percentage={73} label="Improvement in doctor-patient communication" color="pink" />
                    <ProgressBar percentage={60} label="Reduction in emergency health issues" color="rose" />
                  </div>
                </div>
                <div className="space-y-4">
                  {healthFacts.slice(0, 2).map((fact, index) => (
                    <FactCard key={index} {...fact} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-16 lg:py-20">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 lg:mb-8">
              Comprehensive Health Management Tools
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed">
              Advanced features designed by healthcare professionals to give you complete control over your health journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
                className={index % 2 === 0 ? "lg:hover:scale-105" : "lg:hover:rotate-1"} 
              />
            ))}
          </div>

          {/* Health Facts Grid */}
          <div className="mb-16 lg:mb-20">
            <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-8 lg:mb-12">
              Evidence-Based Health Facts
            </h3>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {healthFacts.slice(2).map((fact, index) => (
                <FactCard key={index} {...fact} className="hover:scale-105 transition-transform duration-300" />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <section className="py-16 lg:py-20">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 lg:mb-8">
              Real Stories, Life-Changing Results
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto px-4 sm:px-0">
              Hear from women whose lives have been transformed through proactive health management
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                {...testimonial} 
                className={`${index % 3 === 1 ? 'md:mt-8' : ''} ${index % 3 === 2 ? 'lg:mt-16' : ''}`}
              />
            ))}
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-16 lg:py-24">
          <div className="bg-gradient-to-br from-white/90 via-rose-50/80 to-pink-50/90 backdrop-blur-sm rounded-3xl lg:rounded-[3rem] p-8 lg:p-16 text-center shadow-2xl border border-rose-100">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6 lg:mb-8">
              Your Health Journey Starts Today
            </h2>
            <p className="text-lg lg:text-2xl text-gray-700 mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
              Join millions of women who've taken control of their health. Start with our free comprehensive health assessment and get personalized recommendations within minutes.
            </p>
            
            {/* Feature highlights */}
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Instant Setup</h3>
                <p className="text-gray-600">Get started in under 3 minutes</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Personalized Insights</h3>
                <p className="text-gray-600">Tailored to your unique health profile</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl">🔒</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">100% Private</h3>
                <p className="text-gray-600">Your data is always secure</p>
              </div>
            </div>
         
            <p className="text-sm lg:text-base text-gray-500 mt-6 lg:mt-8">
              No credit card required  • Cancel anytime
            </p>
          </div>
        </section>

      </main>

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