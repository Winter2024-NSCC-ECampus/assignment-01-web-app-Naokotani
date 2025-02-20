import { useState } from "react";
import TodoInput from "./TodoInput";

const Todo = ({ todo, id, getTodos }) => {
  const apiUrl = import.meta.env.VITE_DEV_API_URL
  const [edit, setEdit] = useState(false);

  const deleteTodo = async (todoId) => {
    const response = await fetch(`${apiUrl}todo/?userId=${id}&todoId=${todoId}`, {
      method: "DELETE",
    });
    if (response.ok)
      getTodos();
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
          userId={id}
          todoId={todo.id}
          edit={true}
          getTodos={getTodos}
          setEdit={setEdit}
        />
      }
    </li>
  );
};

export default Todo;
