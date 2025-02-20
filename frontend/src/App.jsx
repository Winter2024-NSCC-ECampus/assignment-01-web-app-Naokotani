import React from 'react';
import TodoLayout from './TodoLayout'
import LoginPage from './LoginPage';
import SignupPage from './SignUpPage';
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/todos" element={<TodoLayout />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
