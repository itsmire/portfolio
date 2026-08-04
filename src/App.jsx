import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './router';
import MainLayout from './layouts/MainLayout';
import useDarkMode from './hooks/useDarkMode';
import Preloader from './components/Preloader';

/**
 * Root App component.
 * Integrates global Router, Theme Provider (Dark/Light mode), Preloader Intro with sessionStorage, and Main Layout structure.
 */
function App() {
  const [isDark, toggleTheme] = useDarkMode();
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <Router>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <MainLayout isDark={isDark} toggleTheme={toggleTheme}>
        <AppRoutes />
      </MainLayout>
    </Router>
  );
}

export default App;
