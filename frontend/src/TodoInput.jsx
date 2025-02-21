import React, { useState, useEffect } from "react";
import Error from "./Error";
import axiosInstance from "./axiosInstance";

const TodoInput = ({ todoId, edit, getTodos, setEdit }) => {

  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const createTodo = async (e) => {
    e.preventDefault();
    const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
    }

    axiosInstance.post(`todo/`, todo)
      .then(res => {
        console.log(res.data);
        getTodos();
        setTitle("");
        setDescription("");
        setDueDate("");
      })
      .catch(() => {
        setError("Error creating post. Sorry!");
      });
  };

  const editTodo = async (e, todoId) => {
    e.preventDefault();
    const todo = {
      title: title,
      description: description,
      dueDate: dueDate,
    }

    axiosInstance.put(`todo/?todoId=${todoId}`, todo)
      .then(res => {
        console.log(res.data);
        setEdit(false);
        getTodos();
      })
      .catch(() => {
        setError("Error updating post");
      });
  };

  const getTodo = async (todoId) => {
    axiosInstance.get(`todo/${todoId}`)
      .then(res => {
        console.log(res.data);
        setDueDate(res.data.dueDate);
        setDescription(res.data.description);
        setTitle(res.data.title);
      })
      .catch(() => {
        setError("Error updating post");
      });
  }

  useEffect(() => {
    if (edit) {
      getTodo(todoId);
    }
  }, [])

  return (
    <div>
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
      {error &&
        <Error error={error} setError={setError} />
      }
    </div>
  );
};

export default TodoInput;
