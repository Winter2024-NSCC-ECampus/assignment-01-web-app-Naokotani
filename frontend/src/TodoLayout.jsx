import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import Todo from './Todo';
import Error from './Error';
import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const TodoLayout = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const history = useNavigate();

  const getTodos = async () => {
    axiosInstance.get(`todo/`)
      .then(res => {
        setTodos(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
        setError("Error loading posts. Please try again later");
      });
  };

  const handleLogout = async () => {
    Cookies.remove("jwtToken");
    history("/");
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className="container mt-5">
      <h1 className="title is-2 has-text-centered">Todos!</h1>
      <div className="box">
        <TodoInput edit={false} todoId={0} getTodos={getTodos} />
      </div>
      {todos.length > 0 && (
        <div>
          <h2 className="title is-3">Your Todo List:</h2>
          <ul>
            {todos
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map((todo) => (
                <Todo key={todo.id} todo={todo} getTodos={getTodos} />
              ))}
          </ul>
        </div>
      )}
      {error && <Error error={error} setError={setError} />}
      <button className="button is-danger is-fullwidth" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TodoLayout;
