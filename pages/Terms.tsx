import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl animate-fade-in-up pb-10">
      <div className="bg-white p-8 md:p-12 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="font-sketch text-5xl mb-8 text-center">Terms & Conditions</h1>
        
        <div className="font-comic text-lg space-y-6 text-gray-800">
          <p>
            Welcome to Mangatoon! These terms and conditions outline the rules and regulations for the use of our application.
          </p>

          <h2 className="font-heading text-2xl mt-6">1. Acceptance of Terms</h2>
          <p>
            By accessing this application, we assume you accept these terms and conditions. Do not continue to use Mangatoon if you do not agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="font-heading text-2xl mt-6">2. Image Usage</h2>
          <p>
            When you upload images to Mangatoon, you retain your rights to your content. We process your images solely for the purpose of generating the cartoon/sketch versions. We do not store your images permanently on our servers; they are processed temporarily by our AI service providers.
          </p>

          <h2 className="font-heading text-2xl mt-6">3. AI Generation</h2>
          <p>
            Mangatoon uses advanced AI models (Google Gemini) to transform your photos. While we strive for high quality, results may vary depending on the input image. We are not responsible for any unexpected or artistic interpretations made by the AI.
          </p>

          <h2 className="font-heading text-2xl mt-6">4. User Conduct</h2>
          <p>
            You agree not to upload any illegal, offensive, or inappropriate content. Mangatoon reserves the right to refuse service to anyone for any reason at any time.
          </p>

          <h2 className="font-heading text-2xl mt-6">5. Disclaimer</h2>
          <p>
            The materials on Mangatoon are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </div>
      </div>
    </div>
  );
};