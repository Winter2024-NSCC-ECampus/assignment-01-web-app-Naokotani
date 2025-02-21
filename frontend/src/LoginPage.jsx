import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();
  const apiUrl = import.meta.env.VITE_DEV_API_URL

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      const response = await axios.post(`${apiUrl}auth/signin`, { email, password });
      console.log('Login successful:', response.data);
      Cookies.set('authToken', response.data.jwt, { expires: 7 });
      history('/todos');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="box" style={{ width: '500px', height: 'auto' }}>
        <div className="p-4">
          <h2 className="title is-4 has-text-centered mb-4">Login Page</h2>
          <div className="field">
            <label className="label" htmlFor="email">Email Address</label>
            <div className="control">
              <input
                className="input"
                id="email"
                type="email"
                placeholder="Email address"
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
          {error && <p className="has-text-danger">{error}</p>}
          <div className="field">
            <div className="control">
              <button
                className="button is-primary is-fullwidth"
                style={{ height: '50px' }}
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </div>
          <div className="has-text-centered">
            <p>Not a member? <a href="/signup">Register</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
