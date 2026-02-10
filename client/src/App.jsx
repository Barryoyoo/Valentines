import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import YesPage from './pages/YesPage.jsx';

async function logVisit(pathname) {
  try {
    await fetch('/api/log-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: pathname })
    });
  } catch (err) {
    // Non-critical: ignore logging errors
    console.error('Visit logging failed', err);
  }
}

function AppInner() {
  const location = useLocation();

  useEffect(() => {
    logVisit(location.pathname);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/yes" element={<YesPage />} />
    </Routes>
  );
}

export default function App() {
  return <AppInner />;
}

