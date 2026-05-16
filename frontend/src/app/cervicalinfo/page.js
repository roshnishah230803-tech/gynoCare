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

export default function CervicalCancerPage() {
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
            Understanding Cervical Cancer
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4 sm:px-0">
            Cervical cancer is a preventable disease. Knowledge, regular screening, and vaccination are your best defenses.
          </p>
        </section>
        
        {/* What is Cervical Cancer? Section */}
        <InfoSection title="What is Cervical Cancer?">
          <p>
            Cervical cancer is a type of cancer that occurs in the cells of the cervix, the lower part of the uterus that connects to the vagina. It usually develops slowly over time, often beginning as abnormal cell changes on the cervix's surface. These precancerous changes can be detected with regular screening and can be treated to prevent cancer from developing.
          </p>
        </InfoSection>
        
        {/* Causes and Risk Factors Section */}
        <InfoSection title="Causes and Key Risk Factors">
          <p>
            Nearly all cases of cervical cancer are caused by a long-term infection with certain types of the **human papillomavirus (HPV)**. HPV is a common sexually transmitted infection. While most HPV infections clear up on their own, some strains can lead to cancer.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>HPV Infection:</strong> The single most important risk factor.
            </li>
            <li>
              <strong>Multiple Sexual Partners:</strong> Increases your risk of exposure to high-risk HPV types.
            </li>
            <li>
              <strong>Weakened Immune System:</strong> The body is less able to fight off HPV infections, allowing them to persist.
            </li>
            <li>
              <strong>Smoking:</strong> Women who smoke are about twice as likely to develop cervical cancer as non-smokers.
            </li>
          </ul>
        </InfoSection>

        {/* Symptoms Section */}
        <InfoSection title="Recognizing the Symptoms">
          <p>
            In its early stages, cervical cancer often has no symptoms. As the cancer progresses, you may notice some of the following signs:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Vaginal bleeding</strong> after intercourse, between periods, or after menopause.
            </li>
            <li>
              <strong>Watery, bloody vaginal discharge</strong> that may be heavy and have a foul odor.
            </li>
            <li>
              Pelvic pain or pain during sexual intercourse.
            </li>
          </ul>
          <p className="mt-4">
            It's important to note that these symptoms can also be caused by other conditions. Always consult a healthcare professional if you experience any of these signs.
          </p>
        </InfoSection>

        {/* --- NEW SECTIONS --- */}

        {/* Diagnosis Section */}
        <InfoSection title="How is Cervical Cancer Diagnosed?">
          <p>
            If a routine Pap test shows abnormal results, your doctor will likely recommend further testing. These diagnostic steps are crucial for confirming a diagnosis and determining the stage of the cancer.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Colposcopy:</strong> A procedure in which a doctor uses a magnifying device called a colposcope to get a closer look at the cervix.
            </li>
            <li>
              <strong>Biopsy:</strong> During the colposcopy, the doctor may take a small tissue sample from any abnormal areas. This sample is sent to a lab to be examined for cancer cells.
            </li>
            <li>
              <strong>Imaging Tests:</strong> If cancer is found, tests such as an MRI, CT scan, or PET scan may be used to see if the cancer has spread to other parts of the body.
            </li>
          </ul>
        </InfoSection>

        {/* Treatment Section */}
        <InfoSection title="Treatment Options">
          <p>
            Treatment for cervical cancer depends on several factors, including the stage of the cancer, your age, and your overall health. Common treatments include:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Surgery:</strong> For early-stage cancer, surgical removal of the tumor, and sometimes the cervix and uterus, may be an option.
            </li>
            <li>
              <strong>Radiation Therapy:</strong> Uses high-energy rays to destroy cancer cells. It can be used alone or in combination with other treatments.
            </li>
            <li>
              <strong>Chemotherapy:</strong> Uses drugs to kill cancer cells throughout the body. It is often used to treat more advanced stages of cancer.
            </li>
            <li>
              <strong>Targeted Therapy and Immunotherapy:</strong> Newer treatments that target specific cancer cells or boost your body's immune system to fight the cancer.
            </li>
          </ul>
        </InfoSection>

        {/* Living with Cervical Cancer Section */}
        <InfoSection title="Living with and Beyond Cervical Cancer">
          <p>
            A cervical cancer diagnosis can be overwhelming. It's important to remember that support is available. Joining a support group, seeking counseling, and leaning on family and friends can make a significant difference.
          </p>
          <p>
            After treatment, regular follow-up appointments and monitoring are essential to ensure the cancer does not return. A healthy lifestyle, including a balanced diet, exercise, and not smoking, can also improve your overall health and well-being.
          </p>
        </InfoSection>

        {/* --- */}

        {/* Prevention and Screening Section */}
        <InfoSection title="Prevention and Early Detection">
          <p>
            The good news is that cervical cancer is highly preventable. The two most effective tools are:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>HPV Vaccination:</strong> The HPV vaccine protects against the most common types of HPV that cause cervical cancer. It's most effective when given before sexual activity begins.
            </li>
            <li>
              <strong>Regular Pap Tests and HPV Tests:</strong>
              <ul className="list-circle list-inside ml-4 mt-2 space-y-1">
                <li>
                  A **Pap test** (Papanicolaou test) collects cells from the cervix to check for abnormal changes.
                </li>
                <li>
                  An **HPV test** checks for the presence of the virus itself.
                </li>
              </ul>
            </li>
          </ul>
          <p className="mt-4">
            Regular screening can detect precancerous cells early, when they are easiest to treat.
          </p>
        </InfoSection>
        
        {/* Call to Action */}
        <section className="py-12 sm:py-16">
          <div className="bg-gradient-to-br from-white/80 to-rose-50/50 backdrop-blur-sm rounded-3xl p-12 text-center shadow-xl border border-rose-100">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Take Control of Your Health
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your health is in your hands. Talk to your doctor about your screening schedule and the HPV vaccine.
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
