import React from 'react';
import './App.css';
import LoginSignup from './Components/LoginSignupPage/LoginSignup';
import HomePage from './Components/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <div>
        <h2>Task Management App</h2>
      </div>
        <LoginSignup/>
        <HomePage/>
    </div>
  );
    
}

export default App;
