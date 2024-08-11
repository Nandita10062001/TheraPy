import React, { useState, useEffect } from 'react';
import './HealthAssistant.css';

const HealthAssistant = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([{ text: "Hi, How can I help you Today?", sender: 'bot', meme: null }]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [inputActive, setInputActive] = useState(false); // New state to control the input form's visibility


  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages(prevMessages => [...prevMessages, { text: inputValue, sender: 'user', meme: null }]);
    setInputValue('');
    setMessages(prevMessages => [...prevMessages, { text: "typing...", sender: 'bot' }]);


    // Here you can add logic to send the message to your AI backend and get the response
    // Send the most recent message to the FLASK server
    fetch('http://127.0.0.1:5000/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: inputValue }),
    })
      .then(response => response.json())
      .then(data => {
      setTimeout(() => {
        //replace typing... with the response from the server
        setMessages(prevMessages => [...prevMessages.slice(0, -1), { text: data.message, sender: 'bot', meme: data.meme }]);
      }, 500); // Adjust the delay time as needed
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (firstLoad) {
      setTimeout(() => {
        setFirstLoad(false);
        setInputActive(true); // Activate the input form after the first load

      }, 600);
    }
  }, [firstLoad]);

  return (
    <div className={`mental-health-assistant ${firstLoad ? 'first-load-animation' : ''}`}>
      <h2 className="assistant-heading">Mental Health Virtual Assistant</h2>
      <div className="messages">
  {messages.map((message, index) => (
    <div key={index} className={`message ${message.sender}`}>
      {message.meme && (
        <img
          src={message.meme}
          alt="Meme"
          className="meme-image"
        />
      )}
      {message.text && <p className="message-text">{message.text}</p>}
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
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </div>
  );
};

export default HealthAssistant;
