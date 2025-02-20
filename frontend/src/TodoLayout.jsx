import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import Todo from './Todo';
import Error from './Error';

const TodoLayout = () => {
  const apiUrl = import.meta.env.VITE_DEV_API_URL
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const id = 152;

  const getTodos = async () => {

    const res = await fetch(`${apiUrl}todo/?userId=${id}`).catch();
    const data = await res.json();

    if (res.ok)
      setTodos(data);
    else
      setError("Error loading posts. Please try again later");
  };

  useEffect(() => {
    getTodos(id);
  }, [])

  return (
    <div className="container mt-5">
      <h1 className="title is-2 has-text-centered">Todos!</h1>
      <div className="box">
        <TodoInput userId={id} edit={false} todoId={0} getTodos={getTodos} />
      </div>
      {todos.length > 0 && (
        <div>
          <h2 className="title is-3">Your Todo List:</h2>
          <ul>
            {todos
              .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
              .map((todo) => (
                <Todo key={todo.id} todo={todo} id={id} getTodos={getTodos} />
              ))}
          </ul>
        </div>
      )}
      {error && <Error error={error} setError={setError} />}
    </div>
  );
};

export default TodoLayout;
