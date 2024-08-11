import React, { useState } from 'react';
import './MindCare.css';

const conditions = [
  { label: "Depression", value: "depression" },
  { label: "Anxiety", value: "anxiety" },
  { label: "PTSD", value: "ptsd" }
];

const MessageBubble = ({ text, isUser }) => (
  <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
    <p>{text}</p>
  </div>
);

const MindCare = () => {
  const [stage, setStage] = useState('selectCondition');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [analysis, setAnalysis] = useState('');

  const fetchQuestions = (condition) => {
    const dummyQuestions = {
      depression: [
        "How often do you feel sad or down?",
        "How often do you feel hopeless about the future?",
        "How often do you lose interest in activities you used to enjoy?",
        "How often do you have trouble sleeping or oversleeping?",
        "How often do you feel tired or have low energy?",
        "How often do you have difficulty concentrating or making decisions?",
        "How often do you have thoughts of self-harm or suicide?",
        "How often do you feel worthless or guilty?"
      ],
      anxiety: [
        "How often do you feel excessive worry or apprehension about various aspects of your life?",
        "Do you experience physical symptoms such as trembling, sweating, or palpitations when feeling anxious?",
        "How often do you avoid certain situations or activities due to fear or anxiety?",
        "Do you have difficulty controlling your worries or feelings of restlessness?",
        "How often do you experience sudden and intense panic attacks?",
        "Do you often feel tense or on edge?",
        "How does anxiety affect your ability to concentrate or focus?",
        "Do you experience difficulties falling or staying asleep due to anxious thoughts?"],
      ptsd: [
        "How often do you have intrusive thoughts or memories about a traumatic event?",
        "How often do you experience flashbacks or nightmares related to a traumatic event?",
        "How often do you feel emotionally numb or detached from others?",
        "How often do you avoid people, places, or activities that remind you of a traumatic event?",
        "How often do you experience heightened arousal, such as being easily startled or having difficulty sleeping?",
        "How often do you have trouble remembering important aspects of a traumatic event?",
        "How often do you feel irritable or have angry outbursts?",
        "How often do you experience feelings of guilt or shame related to a traumatic event?"
      ]
    };
    setQuestions(dummyQuestions[condition]);
  };

  const addToChatHistory = (message, isUser = false) => {
    const newMessage = { text: message, isUser };
    setChatHistory(prevHistory => [newMessage, ...prevHistory]);
  };

  const handleConditionSelect = (condition) => {
    setSelectedCondition(condition);
    fetchQuestions(condition);
    addToChatHistory(`Selected condition: ${condition}`);
    setStage('showQuestions');
  };

  const handleAnswer = (answer) => {
    // Add the user's answer to the chat history first
    addToChatHistory(answer, true);

    // Check if there's a next question
    if (currentQuestionIndex < questions.length - 1) {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Then add the next question to the chat history
      addToChatHistory(questions[currentQuestionIndex + 1]);
    } else {
      // If there are no more questions, proceed to the analysis stage
      setStage('showAnalysis');

      fetch('http://127.0.0.1:5000/'+selectedCondition, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: answers }),
    })
      .then(response => response.json())
      .then(data => {
        setAnalysis(data.analysis);
    })
      .catch((error) => {
        console.error('Error:', error);
      });

    }

    // Finally, add the current answer to the answers array
    setAnswers([...answers, answer]);
  };


  const handleContinue = (decision) => {
    if (decision === 'Y') {
      setStage('selectCondition');
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setChatHistory([]);
    } else {
      setStage('end');
    }
  };

  return (
    <div className="mind-care-container">
      <h2 className='heading'>MindCare: Your Diagnostic Partner</h2>
      {stage === 'selectCondition' && (
        <div className="condition-selection">
          <p>Which condition would you like to check for?</p>
          {conditions.map((condition) => (
            <button className='btnq' key={condition.value} onClick={() => handleConditionSelect(condition.value)}>
              {condition.label}
            </button>
          ))}
        </div>
      )}
      {stage === 'showQuestions' && (
        <div className="question-display">
          <p>{questions[currentQuestionIndex]}</p>
          <button className='btnq' onClick={() => handleAnswer('Often')}>Often</button>
          <button className='btnq' onClick={() => handleAnswer('Sometimes')}>Sometimes</button>
          <button className='btnq' onClick={() => handleAnswer('Rarely')}>Rarely</button>
          <button className='btnq' onClick={() => handleAnswer('Never')}>Never</button>
        </div>
      )}
      {stage === 'showAnalysis' && (
        <div className="analysis-display">
          <p>{analysis} Would you like to continue? (Y/N)</p>
          <button className='btnq' onClick={() => handleContinue('Y')}>Yes</button>
          <button className='btnq' onClick={() => handleContinue('N')}>No</button>
        </div>
      )}
      {stage === 'end' && <p>Thank you for using MindCare.</p>}
      <div className="chat-history">
        <h3>Chat History</h3>
        {chatHistory.map((message, index) => (
          <MessageBubble key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>
    </div>
  );
};

export default MindCare;
