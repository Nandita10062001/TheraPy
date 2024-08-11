// LandingPage.js

import React from 'react';
import './LandingPage.css';
import logo from '../../assets/images/White logo - no background.svg';
import landingImage from '../../assets/images/mentalhealt2.jpg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <nav>
          <img src={logo} alt="Thera.py Logo" className="logo" />
          <ul>
            <li className='list'><a href="#landing-section">Home</a></li>
            <li className='list'><a href="#about-section">About</a></li>
            <li className='list'><a href="#services-section">Services</a></li>
            <li className='list'><a href="#contact-section">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="landing-section">
        <div className="landing-content">
          <h2>Thera.py</h2>
          <p>"Embark on a journey towards inner peace and resilience with Thera.py - where cutting-edge technology meets compassionate support. Begin your transformative path to mental wellness today, guided by personalized insights, empowering resources, and a community dedicated to your growth and healing. Your brighter tomorrow starts now."</p>
        </div>
        <img src={landingImage} alt="Mental Health" className="landing-image" />
      </section>

      <section id="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>Our mission is to provide a safe and inclusive space where individuals can find solace, support, and practical tools to manage their mental well-being.

At Thera.py, we understand that mental health challenges can manifest in myriad ways, affecting every aspect of life. That's why our platform offers a holistic approach, encompassing support, resources, and assistance tailored to individual needs.</p>
        </div>
      </section>

      <section id="services-section">
        <div className="services-content">
          <h2 className='services-title'>Our Services</h2>
          <div className="service-card">
            <h3>Mental Health Virtual Assistant</h3>
            <p>Engage in conversation, ask questions, and receive support from our AI chatbot.</p>
            <Link to="/mental-health-assistant">
          <button>Try the Product</button>
        </Link>
          </div>
          <div className="service-card">
            <h3>MindCare: Your Diagnostic Partner!</h3>
            <p>Answer questions related to anxiety, depression, or PTSD and receive insights on you well-being.</p>
            <Link to="/mind-care">
          <button>Try the product</button>
        </Link>
          </div>
          <div className="service-card">
            <h3>MRI Scan Analysis</h3>
            <p>Unlock insights with Thera.py's AI chatbot by uploading an MRI scan image, detecting potential indications of ADHD, Alzheimer's, or Schizophrenia</p>
            <Link to="/mri-scan">
          <button>Try the Product</button>
        </Link>
          </div>
        </div>
      </section>

      <footer id="contact-section">
        <div className="contact-content">
          <h2>Contact Us</h2>
          <p>Feel free to reach out to us for any inquiries or assistance.</p>
          <p>Email: support@thera.py</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
