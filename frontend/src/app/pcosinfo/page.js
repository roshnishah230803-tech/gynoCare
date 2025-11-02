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

export default function App() {

  const symptomFeatures = [
    {
      icon: "⏰",
      title: "Irregular Periods",
      description: "Infrequent, irregular, or prolonged menstrual cycles are a common sign of hormonal imbalance in PCOS."
    },
    {
      icon: "🧔",
      title: "Excess Androgen",
      description: "High levels of male hormones (androgens) can lead to physical signs like excess body and facial hair, or severe acne."
    },
    {
      icon: "🔬",
      title: "Polycystic Ovaries",
      description: "Ovaries may develop numerous small follicles and fail to release eggs regularly, disrupting ovulation."
    },
    {
      icon: "⚖️",
      title: "Weight Gain",
      description: "PCOS can make it difficult to maintain a healthy weight due to insulin resistance and metabolic issues."
    },
    {
      icon: "😴",
      title: "Fatigue & Sleep Issues",
      description: "Many women with PCOS experience persistent fatigue, and there is a higher prevalence of sleep apnea."
    },
    {
      icon: "💇",
      title: "Hair Thinning",
      description: "While excess hair growth can occur, some individuals may also experience thinning of scalp hair."
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
            Understanding PCOS
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0">
            Polycystic Ovary Syndrome (PCOS) is a complex condition affecting millions of women. Get the facts you need to take control of your health.
          </p>
        </section>
        
        {/* What is PCOS Section */}
        <InfoSection title="What is PCOS?">
          <p>
            PCOS is a common hormonal disorder among women of reproductive age. It is often characterized by a combination of irregular or absent menstrual periods, high levels of male hormones (androgens), and the presence of small cysts on the ovaries. The exact cause is unknown, but it is believed to be a combination of genetic and environmental factors.
          </p>
          <p>
            While the name "polycystic ovaries" suggests cysts are the primary issue, the core problem is an imbalance of hormones that can disrupt the menstrual cycle and lead to a range of symptoms. Early diagnosis and management are crucial for preventing long-term complications.
          </p>
        </InfoSection>

        {/* Symptoms Section */}
        <section className="py-12 sm:py-16">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">
              Common Symptoms of PCOS
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
              PCOS symptoms can vary widely among individuals. Here are some of the most common signs to look out for.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {symptomFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* Causes & Diagnosis Section */}
        <InfoSection title="Causes & Diagnosis">
          <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">Potential Causes</h3>
          <p>
            The precise cause of PCOS is not fully understood, but it is often linked to several factors:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Insulin Resistance:</strong> The body's cells don't respond well to insulin, leading to elevated insulin levels. This can increase androgen production, affecting ovulation.
            </li>
            <li>
              <strong>Genetics:</strong> A family history of PCOS or Type 2 diabetes may increase a person's risk.
            </li>
            <li>
              <strong>Inflammation:</strong> Women with PCOS often have low-grade chronic inflammation, which can trigger ovaries to produce androgens.
            </li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">How is PCOS Diagnosed?</h3>
          <p>
            Diagnosing PCOS is a process of elimination and typically involves a physical exam, a review of your medical history, and blood tests to check hormone levels. An ultrasound may also be used to examine the ovaries for cysts. A diagnosis of PCOS is made if you meet at least two of the three criteria from the Rotterdam Criteria:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Irregular or absent periods (anovulation).</li>
            <li>Clinical signs of excess androgens (acne, excess hair growth) or elevated androgen levels in blood tests.</li>
            <li>Polycystic ovaries on an ultrasound.</li>
          </ul>
        </InfoSection>

        {/* Management & Lifestyle Section */}
        <InfoSection title="Management & Lifestyle">
          <p>
            While there is no "cure" for PCOS, it can be effectively managed through a combination of lifestyle changes and medical treatment. The goal is to manage symptoms and reduce the risk of long-term health problems like Type 2 diabetes and heart disease.
          </p>
          <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">Key Management Strategies:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Healthy Diet:</strong> Focus on whole, unprocessed foods, lean proteins, and complex carbohydrates to manage insulin levels and promote a healthy weight.
            </li>
            <li>
              <strong>Regular Exercise:</strong> Physical activity helps improve insulin sensitivity and can aid in weight management.
            </li>
            <li>
              <strong>Medication:</strong> Your doctor may prescribe medication to manage specific symptoms, such as birth control pills to regulate your cycle or drugs to improve insulin resistance.
            </li>
          </ul>
        </InfoSection>

        {/* How Our Platform Helps Section */}
        <section className="py-12 sm:py-16">
          <div className="bg-gradient-to-br from-white/80 to-rose-50/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              How Our Platform Can Help
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our health trackers are invaluable tools for managing PCOS.
            </p>
            <ul className="text-lg text-gray-700 list-disc list-inside space-y-2 text-left max-w-xl mx-auto">
              <li>
                <strong>Symptom Tracking:</strong> Documenting symptoms like irregular periods, acne, and weight fluctuations provides a clear, shareable record for your doctor.
              </li>
              <li>
                <strong>Cycle Insights:</strong> Understand your unique cycle patterns, even if they are irregular, to help anticipate and manage symptoms.
              </li>
              <li>
                <strong>Data for Your Doctor:</strong> Your detailed logs provide concrete data, helping your healthcare provider make a more accurate diagnosis and create a tailored treatment plan.
              </li>
            </ul>
          </div>
        </section>

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
              <ActionButton href="/home" variant="secondary">
                Explore More
              </ActionButton>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
