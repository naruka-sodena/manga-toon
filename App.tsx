import React, { useState } from 'react';
import { Home } from './pages/Home';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'terms' | 'privacy'>('home');

  return (
    <div className="min-h-screen flex flex-col pt-10">
      <main className="flex-grow">
        {currentPage === 'home' && <Home />}
        {currentPage === 'terms' && <Terms />}
        {currentPage === 'privacy' && <Privacy />}
      </main>
      <Footer onNavigate={setCurrentPage} currentPage={currentPage} />
    </div>
  );
};

export default App;