import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State to manage error messages
  const history = useNavigate(); // Get the history object for redirection
  const apiUrl = import.meta.env.VITE_DEV_API_URL

  const handleSignup = async () => {
    try {
      // Check for empty fields
      if (!email || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        return;
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post(`${apiUrl}auth/signup`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      history('/todos');
    } catch (error) {
      console.error('Signup failed:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="box" style={{ width: '600px', height: 'auto' }}>
        <div className="p-4">
          <h2 className="title is-4 has-text-centered mb-4">Sign Up Page</h2>
          {error && <p className="has-text-danger">{error}</p>}
          <div className="field">
            <label className="label" htmlFor="email">Email Address</label>
            <div className="control">
              <input
                className="input"
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <div className="control">
              <input
                className="input"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-primary is-fullwidth"
                style={{ height: '40px' }}
                onClick={handleSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
          <div className="has-text-centered">
            <p>Already Register? <a href="/">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
