import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 max-w-4xl animate-fade-in-up pb-10">
      <div className="bg-white p-8 md:p-12 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="font-sketch text-5xl mb-8 text-center">Privacy Policy</h1>
        
        <div className="font-comic text-lg space-y-6 text-gray-800">
          <p>
            At Mangatoon, accessible from our application, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Mangatoon and how we use it.
          </p>

          <h2 className="font-heading text-2xl mt-6">Data Collection</h2>
          <p>
            We do not collect personal identifiable information like names, emails, or phone numbers unless explicitly provided by you. We do not require account registration to use our basic features.
          </p>

          <h2 className="font-heading text-2xl mt-6">Image Processing</h2>
          <p>
            Images uploaded to Mangatoon are transmitted to Google's Generative AI API for processing. These images are not used to train Google's models without your permission, following their API data privacy policies. We do not store your uploaded photos or the generated results on our own servers after the session is complete.
          </p>

          <h2 className="font-heading text-2xl mt-6">Cookies</h2>
          <p>
            Like any other website, Mangatoon may use 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="font-heading text-2xl mt-6">Third Party Privacy Policies</h2>
          <p>
            Mangatoon's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
          </p>
        </div>
      </div>
    </div>
  );
};