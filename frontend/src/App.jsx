import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_DEV_API_URL
  const handleFetch = async () => {
    const response = fetch(apiUrl + "user/health");
    console.log(response);
  }

  const createUser = async () => {

    const userData = {
      email: "defaultuser@example.com",
      password: "defaultpassword"
    };

    fetch(apiUrl + 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify that the body contains JSON
      },
      body: JSON.stringify(userData), // Convert the user data to a JSON string
    })
      .then(response => {
        console.log(response.status)
      })

  }

  return (
    <>
      <div>
        <a href="" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={createUser}>
          create user
        </button>
        <button onClick={handleFetch}>
          fetch
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
