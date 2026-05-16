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

export default function PeriodTrackerDetails() {

  const trackerFeatures = [
    {
      icon: "📅",
      title: "Cycle Prediction",
      description: "Our smart algorithm analyzes your data to accurately predict the start date of your next period and fertile window, helping you plan ahead."
    },
    {
      icon: "📝",
      title: "Symptom Logging",
      description: "Record daily symptoms, mood changes, and physical sensations to understand how your cycle impacts your overall well-being. This creates a valuable record for you and your doctor."
    },
    {
      icon: "🥚",
      title: "Ovulation Tracking",
      description: "Track ovulation symptoms like basal body temperature and cervical mucus to pinpoint your most fertile days. This is an essential tool for family planning."
    },
    {
      icon: "🔔",
      title: "Personalized Reminders",
      description: "Set custom reminders for upcoming periods, fertile days, and medication to stay on top of your health, all tailored to your unique cycle."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">
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
            Understanding Your Cycle
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0">
            A period tracker is more than just a calendar. It’s a powerful tool for understanding your body, managing your health, and feeling empowered.
          </p>
        
        </section>
        
        {/* What is a Period Tracker? Section */}
        <InfoSection title="What is a Period Tracker?">
          <p>
            A period tracker is a digital tool designed to help you monitor and log your menstrual cycle, as well as related symptoms. By consistently logging data, the app can learn your unique patterns and provide personalized insights, predictions, and health information. This creates a detailed record of your health that can be incredibly useful.
          </p>
        </InfoSection>

        {/* Features Section */}
        <section className="py-12 sm:py-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Core Features for Your Health
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              Our tracker is designed with your needs in mind.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {trackerFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* Why Tracking is Important Section */}
        <InfoSection title="Why Tracking is Important for Your Health">
          <p>
            Tracking your cycle is a key part of proactive health management. Here’s why it’s so beneficial:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Identify Irregularities:</strong> Your tracker can help you spot irregular patterns in your cycle, which might be a sign of underlying health conditions like PCOS or thyroid issues.
            </li>
            <li>
              <strong>Manage Symptoms:</strong> Knowing when to expect symptoms like cramps, mood swings, or fatigue allows you to prepare and manage them more effectively.
            </li>
            <li>
              <strong>Empower Your Doctor's Visits:</strong> Instead of relying on memory, you can share a clear, detailed log of your cycles and symptoms with your healthcare provider. This provides them with the data they need to make a faster, more accurate diagnosis.
            </li>
          </ul>
        </InfoSection>
        
        {/* --- */}

        {/* Menstrual Cycle Phases Section */}
        <InfoSection title="The Phases of Your Menstrual Cycle">
          <p>
            Your menstrual cycle is a complex biological process that can be divided into four distinct phases. Tracking these phases helps you understand the physical and emotional changes that happen throughout the month.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Menstrual Phase:</strong> This is the first phase, marked by the start of your period. It's when the uterine lining sheds. This phase typically lasts 3 to 7 days.
            </li>
            <li>
              <strong>Follicular Phase:</strong> This phase begins on the first day of your period and lasts until ovulation. During this time, your body prepares to release an egg. Estrogen levels rise, and the uterine lining thickens.
            </li>
            <li>
              <strong>Ovulation Phase:</strong> This is the shortest phase, typically lasting about 24 hours. The egg is released from the ovary, and this is your most fertile period.
            </li>
            <li>
              <strong>Luteal Phase:</strong> Following ovulation, the follicle transforms into the corpus luteum, which releases progesterone and some estrogen. This prepares the uterus for a potential pregnancy. If no pregnancy occurs, hormone levels drop, leading to the start of your next period.
            </li>
          </ul>
        </InfoSection>

        {/* --- */}

        {/* Fertility and Family Planning Section */}
        <InfoSection title="Tracking for Fertility and Family Planning">
          <p>
            For those who are trying to conceive, a period tracker is an invaluable tool. By logging key data points, you can accurately identify your fertile window, the days when pregnancy is most likely. This includes tracking:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Basal Body Temperature ($BBT$):</strong> Your body's resting temperature, which slightly rises after ovulation. Tracking this helps confirm that you have ovulated.
            </li>
            <li>
              <strong>Cervical Mucus:</strong> Changes in cervical mucus can signal when you are nearing ovulation and are most fertile.
            </li>
          </ul>
          <p className="mt-4">
            By combining these data points with your cycle predictions, you get a much clearer picture of your fertility and can time intercourse for the best chance of conception.
          </p>
        </InfoSection>

        {/* --- */}

        {/* Doctor's Visits Section */}
        <InfoSection title="Empowering Your Doctor's Visits">
          <p>
            One of the most powerful benefits of a period tracker is the ability to provide your doctor with concrete data. Instead of trying to recall your last period or symptoms from memory, you can share a detailed log. This data can help your doctor:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Identify Patterns:</strong> Your logs can reveal patterns in your cycle or symptoms that you might not have noticed, such as an irregular cycle length or a specific symptom that always appears before your period.
            </li>
            <li>
              <strong>Diagnose Conditions:</strong> Detailed data on irregular cycles, pain, or other symptoms can be crucial in diagnosing conditions like PCOS, endometriosis, or thyroid disorders.
            </li>
            <li>
              <strong>Monitor Treatment:</strong> If you are on medication or following a specific treatment plan, your tracker can help both you and your doctor monitor its effectiveness over time.
            </li>
          </ul>
        </InfoSection>

        {/* --- */}

        {/* Call to Action */}
        <section className="py-12 sm:py-16">
          <div className="bg-gradient-to-br from-white/80 to-rose-50/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Ready to Take Control?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Knowledge is the first step. Our platform is the next.
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
