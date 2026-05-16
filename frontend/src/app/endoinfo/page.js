// components/EndometriosisDetailPageFinal.js
import React from "react";
import Head from "next/head";

// --- Reusable Components (Styles based on Rose/Pink) ---

// Custom Button Component
const ActionButton = ({ href, children, variant = "primary" }) => {
  const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variants = {
    // Primary: Rose and Pink gradient
    primary: "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:from-rose-600 hover:to-pink-700",
    // Secondary: White with Rose text/border
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

// Symptom/Feature Card Component
const SymptomCard = ({ icon, title, description }) => (
  <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-rose-100">
    <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      <span className="text-white text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-700 transition-colors">
      {title}
    </h3>
    <p className="text-gray-700 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

// General Information Section Wrapper
const InfoSection = ({ title, children, isTinted = false }) => (
  <section className={`py-12 sm:py-16 ${isTinted ? 'bg-rose-50' : 'bg-transparent'}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-10 shadow-xl border border-rose-100">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">{title}</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
            {children}
            </div>
        </div>
    </div>
  </section>
);

// Detail Point for Staging
const DetailPoint = ({ icon, title, children }) => (
    <div className="flex items-start space-x-3">
        <span className="text-xl text-rose-500 pt-1 flex-shrink-0">{icon}</span>
        <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-gray-700 text-sm mt-0.5">{children}</p>
        </div>
    </div>
);


// --- Data Definitions ---

const endometriosisSymptoms = [
    { icon: "🩸", title: "Dysmenorrhea (Painful Periods)", description: "Severe, debilitating pelvic pain and cramping that may start before and extend after menstruation." },
    { icon: "⚡", title: "Chronic Pelvic Pain", description: "Pain in the lower abdomen or back that occurs outside of menstruation and can be persistent." },
    { icon: "🚽", title: "Pain with Bowel/Bladder", description: "Painful bowel movements (dyschezia) or urination (dysuria), especially during the menstrual cycle." },
    { icon: "💔", title: "Painful Intercourse", description: "Pain during or after sexual intercourse (dyspareunia) due to endometrial tissue deposits." },
    { icon: "🤰", title: "Infertility", description: "Endometriosis is a common cause of fertility issues, affecting 30–50% of women with the condition." },
    { icon: "😴", title: "Fatigue", description: "Persistent tiredness and low energy levels, often linked to chronic pain and inflammation." }
];

// --- Main Component ---

export default function EndometriosisDetailPage() {
  return (
    // Main background uses a rose-based gradient
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50">
      <Head>
        <title>Understanding Endometriosis</title>
        <meta name="description" content="Detailed information about Endometriosis, including symptoms, stages, diagnosis, and treatment options." />
      </Head>

      {/* Animated Background Elements (Decorative for visual depth) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-rose-300/20 rounded-full blur-3xl animate-slow-spin"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/20 rounded-full blur-3xl animate-slow-spin" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">

        {/* Hero Section */}
        <section className="pt-12 pb-8 sm:pt-16 lg:pt-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent leading-tight mb-6 sm:mb-8">
            Endometriosis: Beyond the Pain
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0">
            A complex chronic disease where tissue similar to the lining of the uterus grows outside of it. Understanding it is the first step toward effective management.
          </p>
        </section>
        
        {/* What is Endometriosis Section */}
        <InfoSection title="What is Endometriosis?">
            <p>
                **Endometriosis** is a disorder in which tissue similar to the tissue that normally lines the inside of your uterus (the endometrium) grows outside your uterus. These growths are called **implants** or **lesions**. They most commonly occur on the ovaries, fallopian tubes, and the tissue lining the pelvis.
            </p>
            <p>
                When a person with endometriosis has their menstrual period, these misplaced patches of tissue also react to the hormonal changes of the menstrual cycle, causing them to thicken, break down, and bleed. Because this blood has nowhere to go, it becomes trapped, leading to **inflammation, scar tissue (adhesions)**, and severe chronic pain.
            </p>
        </InfoSection>

        {/* Symptoms Section */}
        <InfoSection title="Key Symptoms" isTinted={true}>
          <div className="text-center mb-12">
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto px-4 sm:px-0">
              The severity of pain does not always correlate with the extent of the disease.
            </p>
          </div>

          {/* Responsive grid for symptom cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {endometriosisSymptoms.map((feature, index) => (
              <SymptomCard key={index} {...feature} />
            ))}
          </div>
        </InfoSection>

        {/* Stages and Complications Section */}
        <InfoSection title="Stages & Potential Complications">
            <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">The ASRM Staging System</h3>
            <p>
                Endometriosis is surgically staged based on the location, extent, and depth of the implants, adhesions, and presence of ovarian endometriomas. It is important to note that **the stage does not always correlate with the level of pain**.
            </p>
            {/* Responsive two-column layout for stages */}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <DetailPoint icon="I" title="Stage I: Minimal">Few, small, superficial implants. Little to no scar tissue.</DetailPoint>
                <DetailPoint icon="II" title="Stage II: Mild">More and deeper implants, but still sparse involvement.</DetailPoint>
                <DetailPoint icon="III" title="Stage III: Moderate">Many deep implants, small cysts (endometriomas) on the ovaries, and filmy adhesions.</DetailPoint>
                <DetailPoint icon="IV" title="Stage IV: Severe">Many deep, widespread implants, large cysts on one or both ovaries, and dense adhesions throughout the pelvic area.</DetailPoint>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Key Complications</h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
                <li>**Infertility:** Scar tissue (adhesions) can block the fallopian tubes or distort the pelvic anatomy, making conception difficult.</li>
                <li>**Endometriomas:** Cysts on the ovaries filled with old, dark blood (often called "chocolate cysts").</li>
                <li>**Bowel/Bladder Issues:** Deep infiltrating endometriosis can involve the rectum, bladder, or ureters, causing pain, bleeding, or, in severe cases, kidney damage.</li>
            </ul>
        </InfoSection>
        
        {/* Causes & Diagnosis Section */}
        <InfoSection title="Causes & Diagnosis" isTinted={true}>
          <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">Potential Causes (Theories)</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>**Retrograde Menstruation:** Menstrual blood flows back through the fallopian tubes into the pelvic cavity.</li>
            <li>**Genetic/Immune Factors:** A family history and a compromised immune system's inability to destroy misplaced cells likely play a role.</li>
            <li>**Cell Transformation:** Non-endometrial cells in the abdomen or pelvis transform into endometrial-like tissue.</li>
          </ul>

          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">How is it Diagnosed?</h3>
          <p>
            Diagnosis is challenging. The gold standard for definitive diagnosis is **laparoscopic surgery**, which allows for direct visual confirmation and removal of lesions.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>**Medical History:** Detailed review of symptoms and menstrual pain patterns.</li>
            <li>**Imaging:** Ultrasound or MRI may find endometriomas or deep lesions, but cannot rule out the disease.</li>
            <li>**Laparoscopy:** Surgical procedure to definitively confirm and stage the disease.</li>
          </ul>
        </InfoSection>

        {/* Lifestyle and Self-Care Section */}
        <InfoSection title="Lifestyle & Self-Care Management">
            <p>
                Managing a chronic inflammatory condition like Endometriosis requires a holistic approach that complements medical treatment.
            </p>
            
            {/* Responsive two-column layout for lifestyle tips */}
            <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div>
                    <h4 className="text-lg font-semibold text-rose-700 mb-2 border-b-2 border-pink-300 pb-1">Dietary Focus (Anti-Inflammatory)</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>**Increase Omega-3s:** Foods like fatty fish, nuts, and seeds to help reduce systemic inflammation.</li>
                        <li>**Eat the Rainbow:** Maximize intake of fruits and vegetables (antioxidants).</li>
                        <li>**Limit Triggers:** Reduce red meat, processed foods, and trans-fats, which are pro-inflammatory.</li>
                        <li>**Hydration & Fiber:** Essential for bowel regularity, which helps manage pelvic pain and bloating.</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-semibold text-rose-700 mb-2 border-b-2 border-pink-300 pb-1">Pain & Mental Wellness</h4>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>**Heat Therapy:** Applying a heating pad or taking a warm bath can relax pelvic muscles and offer immediate pain relief.</li>
                        <li>**Gentle Movement:** Low-impact exercises like yoga, swimming, or walking can release endorphins and reduce pain.</li>
                        <li>**Stress Management:** Chronic pain and stress are linked. Incorporate mindfulness, deep breathing, or CBT (Cognitive Behavioral Therapy).</li>
                        <li>**Pelvic Floor Therapy:** Can be highly beneficial for chronic pelvic pain caused by muscle tension that often accompanies Endometriosis.</li>
                    </ul>
                </div>
            </div>
        </InfoSection>

        {/* Management & Treatment Section */}
        <InfoSection title="Medical Treatment Pillars">
          <p>
            Treatment for endometriosis focuses on managing symptoms, stopping disease progression, and addressing fertility issues.
          </p>
          
          {/* Responsive two-column layout for treatment types */}
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
                <h4 className="text-lg font-semibold text-rose-700 mb-2 border-b-2 border-pink-300 pb-1">Hormone Therapy</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>**Combined Oral Contraceptives:** Used continuously to suppress menstruation and the growth of endometrial tissue.</li>
                    <li>**Progestins:** Medications that can stop menstrual cycles and reduce pain.</li>
                    <li>**GnRH Agonists/Antagonists:** Temporarily induce a menopausal state to dramatically reduce estrogen, shrinking lesions.</li>
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-rose-700 mb-2 border-b-2 border-pink-300 pb-1">Surgical Intervention</h4>
                <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>**Laparoscopic Excision:** Precision surgery to cut out (excise) all visible endometriosis tissue, which offers the best chance for long-term relief.</li>
                    <li>**Pain Management:** NSAIDs and specialized pain medication (sometimes including nerve blocks) are often necessary.</li>
                    <li>**Hysterectomy (Last Resort):** Removal of the uterus (and often the ovaries) may be considered when all other treatments fail, but recurrence is still possible.</li>
                </ul>
            </div>
          </div>
        </InfoSection>
        
        {/* NEW SECTION: Seeking Specialized Care (Replaced Advocacy & Support) */}
        <section className="py-12 sm:py-16">
          <div className="bg-gradient-to-br from-white/90 to-rose-50/70 backdrop-blur-sm rounded-3xl p-12 text-center shadow-2xl border-4 border-rose-200">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Seeking Specialized Care 👩‍⚕️
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Due to the complexity of Endometriosis, finding a specialist is crucial for an accurate diagnosis and effective long-term treatment plan.
            </p>
            {/* Responsive two-column layout for advice points */}
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                <div>
                    <h3 className="font-bold text-lg text-rose-700 mb-2">When to Seek Help</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>Pain that is **debilitating** or worsens over time.</li>
                        <li>Symptoms that prevent you from attending **work or school**.</li>
                        <li>Painful sex or pain with **bowel/bladder** movements.</li>
                        <li>**Difficulty conceiving** after trying for one year.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-rose-700 mb-2">Who to Consult</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                        <li>**Endometriosis Excision Specialists:** Surgeons dedicated to the disease who use deep excision techniques.</li>
                        <li>**Reproductive Endocrinologists:** If fertility is a primary concern.</li>
                        <li>**Pain Management Specialists:** For complex, chronic pain that doesn't respond to standard treatment.</li>
                    </ul>
                </div>
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-16">
  <div className="bg-gradient-to-br from-white/80 to-pink-50/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-pink-100">
    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
      Understand & Manage Endometriosis
    </h2>
    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
      Endometriosis affects millions of women worldwide — but awareness and early diagnosis can make a difference. 
      Learn about symptoms, diagnosis, and treatment options to take control of your well-being.
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