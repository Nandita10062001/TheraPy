import React, { useState, useEffect } from 'react';
import './SplashScreen2.css';
import logo from '../../assets/images/mental-health-1.jpg';

const SplashScreen2 = () => {
  const sentence = "Welcome to Thera.py! Your mental health companion. We're here to support you!";
  const typingSpeed = 30;

  const [currentSentence, setCurrentSentence] = useState("");
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentCharacterIndex < sentence.length) {
        setCurrentSentence(sentence.substring(0, currentCharacterIndex + 1));
        setCurrentCharacterIndex(currentCharacterIndex + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentCharacterIndex, sentence, typingSpeed]);

  return (
    <div className="splash-screen-2">
        <img src={logo} alt="Mental Health" className="circular-image" />
        <div className="typing-effect">{currentSentence}</div>
    </div>
  );
}

export default SplashScreen2;