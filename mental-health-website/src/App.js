import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import './App.css';
import MentalHealthAssistant from './components/MentalhealthAssistant/HealthAssistant';
import MindCare from './components/MindCare/MindCare';
import MriScan from './components/MriScan/MriScan'
import LandingPage from './components/LandingPage/LandingPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes> {/* Wrap Routes around Route components */}
          <Route path="/" element={<LandingPage />} /> {/* Default route */}
          <Route exact path="/landing" element={<LandingPage />} />
          <Route exact path="/mental-health-assistant" element={<MentalHealthAssistant />} />
          <Route exact path="/mind-care" element={<MindCare />} />
          <Route exact path="/mri-scan" element={<MriScan />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;