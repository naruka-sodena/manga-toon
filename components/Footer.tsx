import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'terms' | 'privacy') => void;
  currentPage: 'home' | 'terms' | 'privacy';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentPage }) => {
  return (
    <footer className="mt-auto py-8 text-center bg-white border-t-4 border-black relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="font-comic text-toon-dark text-lg font-bold">
            © {new Date().getFullYear()} Mangatoon.
          </div>

          <nav className="flex items-center gap-8 font-heading text-xl">
            <button 
              onClick={() => onNavigate('home')}
              className={`transition-all hover:scale-110 ${currentPage === 'home' ? 'text-toon-blue underline decoration-4 underline-offset-4 decoration-black' : 'text-gray-500 hover:text-black'}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('terms')}
              className={`transition-all hover:scale-110 ${currentPage === 'terms' ? 'text-toon-blue underline decoration-4 underline-offset-4 decoration-black' : 'text-gray-500 hover:text-black'}`}
            >
              Terms
            </button>
            <button 
              onClick={() => onNavigate('privacy')}
              className={`transition-all hover:scale-110 ${currentPage === 'privacy' ? 'text-toon-blue underline decoration-4 underline-offset-4 decoration-black' : 'text-gray-500 hover:text-black'}`}
            >
              Privacy
            </button>
          </nav>

        </div>
      </div>
    </footer>
  );
};