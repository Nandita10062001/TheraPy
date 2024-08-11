// MRIScanAnalysis.js
import React, { useState, useEffect } from 'react';
import './MriScan.css'; // Reusing the same styling

const MRIScan = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: "Which disorder do you want to check for? (ADHD, Alzheimers, Schizophrenia)", sender: 'bot' }
  ]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [inputActive, setInputActive] = useState(false);
  const [disease, setDisease] = useState('');

  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        setFirstLoad(false);
        setInputActive(true); // Activate the input form after the first load

      }, 600);
    }
  }, [firstLoad]);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setMessages(prevMessages => [...prevMessages, { text: "Uploaded MRI Scan:", sender: 'bot', image: reader.result }]);
        
        fetch('http://127.0.0.1:5000/predict/' + disease, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageData: reader.result }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Server error: ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          setMessages(prevMessages => [...prevMessages, { text: data.prediction, sender: 'bot' }]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setMessages(prevMessages => [...prevMessages, { text: 'There was an error processing your request. Please try again later.', sender: 'bot' }]);
        });
  
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
  
    setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: 'user' }]);
    setInputValue('');
  
    const userMessage = inputValue.toLowerCase();
    if (userMessage.includes('adhd') || userMessage.includes('schizophrenia') || userMessage.includes('alzheimers')) {
      if (userMessage.includes('adhd')) {
        setDisease('adhd');
      }
      else if (userMessage.includes('schizophrenia')) {
        setDisease('schizophrenia');
      }
        else if (userMessage.includes('alzheimers')) {
          setDisease('alzheimers')
      }
      setMessages(prevMessages => [...prevMessages, { text: "Please upload your MRI scan.", sender: 'bot' }]);
    } else {
      // Handle other responses
      setMessages(prevMessages => [...prevMessages, { text: "I'm sorry, we currently support analysis for ADHD, Schizophrenia, and Alzheimer's only.", sender: 'bot' }]);
    }
  };
  

  return (
    <div className="mental-health-assistant">
      <h2 className="assistant-heading">MRI Scan Analysis</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
            {message.image && <img src={message.image} alt="Uploaded MRI Scan" className="uploaded-image" />}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={`input-form ${inputActive ? 'active' : ''}`}>
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type Something..."
            className="form-control"
        />
        <label className="btn btn-primary file-input-label">
            <input type="file" accept="image/*" onChange={handleUpload} />
        </label>
        <button type="submit" className="btn btn-primary">
            Send
        </button>
        </form>

    </div>
  );
};

export default MRIScan;
