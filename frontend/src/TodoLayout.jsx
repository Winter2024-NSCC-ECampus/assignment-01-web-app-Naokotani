import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import Todo from './Todo';

const TodoLayout = ({ id }) => {
  const apiUrl = import.meta.env.VITE_DEV_API_URL
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const response = await fetch(`${apiUrl}todo/?userId=${id}`);
    const data = await response.json();
    console.log(data);
    setTodos(data);
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
    </div>
  );
};

export default TodoLayout;
