import { useState } from "react";
import TodoInput from "./TodoInput";
import Error from "./Error";
import axiosInstance from "./axiosInstance";

const Todo = ({ todo, getTodos }) => {
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);

  const deleteTodo = async (todoId) => {
    axiosInstance.delete(`todo/?todoId=${todoId}`)
      .then(res => {
        console.log(res.data);
        getTodos();
      })
      .catch(error => {
        console.error('Error:', error);
        setError("Error deleting post.");
      });
  }

  return (
    <li key={todo.id} className="box mb-4">
      <h3 className="title is-4">{todo.title}</h3>
      <p>{todo.description}</p>
      <p><strong>Due Date:</strong> {todo.dueDate}</p>
      <p><strong>Created ON:</strong> {new Date(todo.createDate).toLocaleString()}</p>
      <div className="buttons">
        <button className="button is-info" onClick={() => setEdit(!edit)}>
          Edit
        </button>
        <button className="button is-danger" onClick={() => deleteTodo(todo.id)}>
          Delete
        </button>
      </div>
      {edit &&
        <TodoInput
          todoId={todo.id}
          edit={true}
          getTodos={getTodos}
          setEdit={setEdit}
        />
      }
      {error &&
        <Error erro={error} setError={setError} />
      }
    </li>
  );
};

export default Todo;
