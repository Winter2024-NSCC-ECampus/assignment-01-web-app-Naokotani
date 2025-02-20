import React, { useState, useEffect } from 'react';

const TodoInput = ({ userId, todoId, edit, getTodos, setEdit }) => {
  const apiUrl = import.meta.env.VITE_DEV_API_URL

  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const createTodo = async (e) => {
    e.preventDefault();
    const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
    }

    const response = await fetch(`${apiUrl}todo/?userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (response.ok) {
      getTodos();
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  const editTodo = async (e, todoId) => {
    e.preventDefault();
    const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
    }

    const response = await fetch(`${apiUrl}todo/?todoId=${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    setEdit(false);
    getTodos();
  };

  const getTodo = async (todoId) => {
    const response = await fetch(`${apiUrl}todo/${todoId}`);
    const data = await response.json();
    setDueDate(data.dueDate);
    setDescription(data.description);
    setTitle(data.title);

  }

  useEffect(() => {
    if (edit) {
      getTodo(todoId);
    }
  }, [])

  return (
    <form onSubmit={(e) => (edit ? editTodo(e, todoId) : createTodo(e))}>
      <div className="field">
        <label className="label" htmlFor="title">Title:</label>
        <div className="control">
          <input
            className="input"
            required
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a new task"
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="description">Description:</label>
        <div className="control">
          <textarea
            className="textarea"
            required
            id="description"
            rows="5"
            cols="20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          ></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="date">Pick a date:</label>
        <div className="control">
          <input
            className="input"
            required
            type="date"
            id="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
      <button className="button is-link is-fullwidth" type="submit">Add Todo</button>
    </form>
  );
};

export default TodoInput;
