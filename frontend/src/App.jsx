import TodoLayout from './TodoLayout'
import 'bulma/css/bulma.min.css';

function App() {
  const apiUrl = import.meta.env.VITE_DEV_API_URL

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
      <TodoLayout id={152} />
    </>
  )
}

export default App
