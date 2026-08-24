import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import ResumeView from './pages/ResumeView';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export function App() {
  const [toast, setToast] = useState(null);

  // Pre-warm backend service on Render free tier (wakes container in background)
  useEffect(() => {
    try {
      const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      fetch(`${apiBaseUrl}/api/health`, { method: 'GET' }).catch(() => {
        // Silent catch: health ping is best-effort background warming
      });
    } catch {
      // Ignore background warmup errors
    }
  }, []);

  const showToast = ({ type = 'success', title = '', message = '', duration = 6000 }) => {
    setToast({ type, title, message, duration });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact showToast={showToast} />} />
          <Route path="/resume" element={<ResumeView />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Toast Alert */}
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}

export default App;
