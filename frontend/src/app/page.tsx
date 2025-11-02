"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import React from "react";

// Health topics data - moved to separate constant for better maintainability
const HEALTH_TOPICS = [
  {
    id: "tracker",
    title: "Menstrual Cycle Tracker",
    description: "A period tracker is a tool used by women to monitor menstrual cycles. It helps track cycle length, fertile days, ovulation, and symptoms like mood or cramps. Period tracking is useful for predicting upcoming periods, managing health, and planning pregnancy or birth control.",
    image: "/images/image1.png",
    color: "from-pink-100 to-rose-100"
  },
  {
    id: "pcos",
    title: "PCOS Prediction",
    description: "Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder in women of reproductive age that affects ovulation, leading to irregular or missed periods, infertility, and the presence of multiple small cysts on the ovaries. It is often associated with excess androgen levels, causing symptoms such as weight gain, acne, excess hair growth, and hair thinning.",
    image: "/images/image2.png",
    color: "from-pink-100 to-rose-100"
  },
  {
    id: "cervical",
    title: "Cervical Cancer Prediction",
    description: "Cervical cancer develops in the cells of the cervix, often caused by long-term infection with HPV. Early stages may not show symptoms, but later signs include abnormal vaginal bleeding, pelvic pain, or unusual discharge. Regular screening, HPV vaccination, and early detection significantly reduce risks and improve outcomes.",
    image: "/images/image1.png",
    color: "from-pink-100 to-rose-100"
  },
  {
    id: "uti",
    title: "UTI Detection",
    description: "A UTI is an infection in any part of the urinary system, usually caused by bacteria. It commonly affects the bladder and urethra, leading to symptoms like burning while urinating, frequent urge to urinate, cloudy or strong-smelling urine, and lower abdominal pain.",
    image: "/images/image2.png",
    color: "from-pink-100 to-rose-100"
  },
  {
    id: "endometriosis ",
    title: "Endometriosis Detection",
    description: "Endometriosis is a condition where tissue similar to the lining of the uterus grows outside it, often on ovaries, fallopian tubes, or pelvic lining. This can cause painful periods, pelvic pain, heavy bleeding, and sometimes infertility.",
    image: "/images/image1.png",
    color: "from-pink-100 to-rose-100"
  }
];

interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const ActionButton = ({ href, children, variant = "primary" }: ActionButtonProps) => {
  const baseClasses = "px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base";
  const variants: Record<"primary" | "secondary", string> = {
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

interface HealthTopic {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
}

interface HealthTopicCardProps {
  topic: HealthTopic;
  index: number;
}

const HealthTopicCard = ({ topic, index }: HealthTopicCardProps) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br ${topic.color}`}
      style={{
        animationDelay: `${index * 150}ms`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>

      <div className="relative p-4 sm:p-6 lg:p-8">
        <div className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
          <div className="relative order-first lg:order-none">
            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 relative mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-xl sm:rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
              <Image
                src={topic.image}
                alt={topic.title}
                fill
                className="relative rounded-xl sm:rounded-2xl shadow-xl object-cover transform group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          <div className={`flex-1 space-y-3 sm:space-y-4 text-center lg:text-left ${isEven ? 'lg:text-right' : ''}`}>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-rose-700 transition-colors">
              {topic.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-base">
              {topic.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
              <ActionButton href={topic.id === "pcos" ? "/login?returnUrl=/pcos" : "/login"}>
                Get Started
              </ActionButton>
              <ActionButton href="/awareness" variant="secondary">
                Learn More
              </ActionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const slogans = useMemo(
    () => [
      "Empowering Women, Tracking Health, Transforming Lives.",
      "Know your cycle. Own your health.",
      "Smart insights for every phase.",
      "Your wellness, simplified and secure.",
      "From awareness to action—GynoCare.",
      "Small steps today. Stronger health tomorrow.",
      "Predict, prevent, and thrive with confidence.",
    ],
    []
  );

  const [sloganIndex, setSloganIndex] = useState(0);
  const [sloganVisible, setSloganVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoized slogan change function
  const changeslogan = useCallback((newIndex: number) => {
    setSloganVisible(false);
    setTimeout(() => {
      setSloganIndex(newIndex);
      setSloganVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      changeslogan((sloganIndex + 1) % slogans.length);
    }, 5000); // Changed to 5s for better user experience

    return () => clearInterval(interval);
  }, [sloganIndex, slogans.length, changeslogan]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/awareness", label: "Awareness" },
    { href: "/login", label: "Sign In" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">G</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                GynoCare
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 xl:px-4 py-2 rounded-lg text-gray-700 font-medium transition-all duration-300 hover:bg-rose-100 hover:text-rose-700 text-sm xl:text-base"
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
              aria-label="Toggle menu"
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
            <div className="lg:hidden mt-4 py-4 border-t border-rose-100 space-y-2 animate-fade-in">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 rounded-lg text-gray-700 font-medium transition-colors hover:bg-rose-100"
                  onClick={() => setIsMenuOpen(false)}
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
          <div
            className={`transition-all duration-500 ease-in-out transform ${sloganVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
              }`}
          >
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight mb-6 sm:mb-8 px-2 sm:px-0">
              {slogans[sloganIndex]}
            </h2>
          </div>

          {/* Enhanced Dots Navigation */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {slogans.map((_, i) => (
              <button
                key={i}
                onClick={() => changeslogan(i)}
                className={`transition-all duration-300 rounded-full ${i === sloganIndex
                    ? "w-6 sm:w-8 h-2.5 sm:h-3 bg-gradient-to-r from-rose-400 to-pink-500"
                    : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-rose-200 hover:bg-rose-300"
                  }`}
                aria-label={`Go to slogan ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <ActionButton href="/about" variant="secondary">
              Learn More About Us
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Health Topics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
            Your Health, Our Priority
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            Comprehensive information and tools to support your gynecological health journey
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {HEALTH_TOPICS.map((topic, index) => (
            <HealthTopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of women who trust GynoCare for their health management
            </p>
            <ActionButton href="/awareness">
              Get More Information
            </ActionButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">G</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">GynoCare</h3>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4 sm:px-0">
            &copy; 2025 GynoCare. All rights reserved. Dedicated to women's health education and empowerment.
          </p>
        </div>
      </footer>
    </div>
  );
}