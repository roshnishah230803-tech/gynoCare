import React from "react";

// Reusable component for buttons
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

// Reusable component for feature cards
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

// New component for detailed information sections
const InfoSection = ({ title, children }) => (
  <section className="py-12 sm:py-16">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-rose-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  </section>
);

const utiSymptomFeatures = [
    {
        icon: "🔥",
        title: "Painful Urination",
        description: "A sharp, burning sensation during urination (dysuria) is one of the most common and telltale signs of a UTI."
    },
    {
        icon: "🚨",
        title: "Frequent Urge",
        description: "Feeling a persistent and intense need to urinate, even right after you’ve emptied your bladder."
    },
    {
        icon: "💧",
        title: "Cloudy Urine",
        description: "Urine may appear cloudy, dark, or have a strong, foul-smelling odor. Blood in the urine (hematuria) is also possible."
    },
    {
        icon: "⚠️",
        title: "Pelvic Pain",
        description: "Women may experience pain or pressure in the lower abdomen and pelvic area."
    },
    {
        icon: "🤒",
        title: "Fever & Chills",
        description: "If the infection spreads to the kidneys, it can cause more severe symptoms like fever, chills, nausea, and back pain."
    },
    {
        icon: "🤢",
        title: "Nausea",
        description: "A general feeling of sickness or nausea can accompany the infection, especially if it's more advanced."
    }
];

export default function UTIDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">
      <title>Understanding UTIs</title>
      <meta name="description" content="Detailed information about Urinary Tract Infections (UTIs), including symptoms, causes, and prevention tips." />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-rose-200/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight mb-6 sm:mb-8">
            Understanding UTIs
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0">
            A urinary tract infection (UTI) is a common infection that affects your urinary system. Knowing the symptoms is key to getting quick treatment.
          </p>

        </section>
        
        {/* What is a UTI Section */}
        <InfoSection title="What is a UTI?">
          <p>
            A **Urinary Tract Infection (UTI)** is an infection in any part of your urinary system. The most common type is a bladder infection (cystitis), but UTIs can also affect the kidneys (pyelonephritis) or the urethra (urethritis). Most UTIs are caused by bacteria, with **Escherichia coli (E. coli)** being the most frequent culprit.
          </p>
          <p>
            While UTIs can affect anyone, they are significantly more common in women due to anatomical differences. The female urethra is shorter and located closer to the rectum, making it easier for bacteria to enter the urinary tract. Early recognition and treatment are important to prevent the infection from spreading to the kidneys.
          </p>
        </InfoSection>

        {/* Symptoms Section */}
        <section className="py-12 sm:py-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Common Symptoms of UTIs
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Symptoms can range from mild discomfort to severe pain. Here are the most common signs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {utiSymptomFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* Causes & Prevention Section */}
        <InfoSection title="Causes & Prevention">
          <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">What Causes a UTI?</h3>
          <p>
            UTIs are most often caused by bacteria entering the urinary tract through the urethra. Factors that can increase your risk include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              **Sexual Activity:** Can introduce bacteria into the urinary tract.
            </li>
            <li>
              **Poor Hygiene:** Wiping from back to front can move bacteria from the anus to the urethra.
            </li>
            <li>
              **Certain Birth Control:** Use of diaphragms or spermicidal agents can increase risk.
            </li>
            <li>
              **Kidney Stones:** Blockages in the urinary tract can trap bacteria.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">How to Prevent UTIs</h3>
          <p>
            Simple lifestyle changes can significantly reduce your risk of getting a UTI:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              **Stay Hydrated:** Drinking plenty of water helps flush bacteria from your urinary system.
            </li>
            <li>
              **Urinate Frequently:** Don't hold your urine for long periods. Urinating after sex is also recommended.
            </li>
            <li>
              **Proper Hygiene:** Always wipe from front to back after using the toilet.
            </li>
            <li>
              **Avoid Irritants:** Steer clear of harsh soaps, feminine hygiene sprays, or douches in the genital area.
            </li>
          </ul>
        </InfoSection>

        {/* When to See a Doctor Section */}
        <section className="py-12 sm:py-16">
          <div className="bg-gradient-to-br from-white/80 to-rose-50/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              When Should You See a Doctor?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              If you suspect you have a UTI, it's important to seek medical advice.
            </p>
            <ul className="text-lg text-gray-700 list-disc list-inside space-y-2 text-left max-w-xl mx-auto">
              <li>
                **Symptoms Persist:** If symptoms don't improve with at-home care or worsen.
              </li>
              <li>
                **Severe Symptoms:** If you experience back pain, fever, chills, or nausea, as these could indicate a more serious kidney infection.
              </li>
              <li>
                **Blood in Urine:** If you notice blood in your urine, seek immediate medical attention.
              </li>
            </ul>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-16">
          <div className="bg-gradient-to-br from-white/80 to-rose-50/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Get the Care You Need
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Don't wait for a UTI to get worse. Consult with a healthcare professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ActionButton href="/" variant="secondary">
              Start your journey
            </ActionButton>
          </div>
          </div>
        </section>

      </main>
    </div>
  );
}
