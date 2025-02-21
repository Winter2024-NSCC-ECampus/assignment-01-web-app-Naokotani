import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import Todo from './Todo';
import Error from './Error';
import axiosInstance from './axiosInstance';

const TodoLayout = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");

  const getTodos = async () => {
    axiosInstance.get(`todo/`)
      .then(res => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch(error => {
        console.error('Error:', error);
        setError("Error loading posts. Please try again later");
      });
  };

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
    </div>
  );
};

export default TodoLayout;
