import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SplashScreen1 from './components/SplashScreen1/SplashScreen1';
import SplashScreen2 from './components/SplashScreen2/SplashScreen2';
import MentalHealthAssistant from './components/MentalhealthAssistant/HealthAssistant';
import MindCare from './components/MindCare/MindCare';
import MriScan from './components/MriScan/MriScan';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [showSplashScreen2, setShowSplashScreen2] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowSplashScreen2(true);
    }, 4000); 
    return () => clearTimeout(timer1);
  }, []);

  useEffect(() => {
    if (showSplashScreen2) {
      const timer2 = setTimeout(() => {
        setShowLandingPage(true);
      }, 5000); 
      return () => clearTimeout(timer2);
    }
  }, [showSplashScreen2]);

  return (
    <div className="App">
      {!showSplashScreen2 ? (
        <SplashScreen1 />
      ) : !showLandingPage ? (
        <SplashScreen2 />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Default route */}
            <Route exact path="/landingpage" element={<LandingPage />} />
            <Route exact path="/mental-health-assistant" element={<MentalHealthAssistant />} />
            <Route exact path="/mind-care" element={<MindCare />} />
            <Route exact path="/mri-scan" element={<MriScan />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;


