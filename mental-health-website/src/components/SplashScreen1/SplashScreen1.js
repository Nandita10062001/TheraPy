import React from 'react';
import './SplashScreen1.css';
import loadingIcon from '../../assets/images/loading.gif';
import logo from '../../assets/images/logo.png';

const SplashScreen1 = () => {
  return (
    <div className="splash-screen">
      <img src={logo} alt="Thera.py Logo" className="logo-splash" />
      <img src={loadingIcon} alt="Loading Icon" className="loading-icon" />
    </div>
  );
}

export default SplashScreen1;