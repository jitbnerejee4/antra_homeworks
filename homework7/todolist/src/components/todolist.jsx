import React from 'react';

export default function Todolist({ todos, deleteHandler, editHandler, editIndex, editText, handleEditChange, saveEdit }) {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => {
          if (todo.id.toString() !== editIndex) {
            return (
              <li key={index}>
                <span>{todo.title}</span>
                <span>
                  <button id={todo.id} onClick={deleteHandler}>Delete</button>
                  <button id={todo.id} onClick={(event)=>editHandler(event, todo.title)}>Edit</button>
                </span>
              </li>
            );
          } else {
            return (
              <li key={index}>
                <input type="text" value={editText} onChange = {handleEditChange}/>
                <button onClick={() => saveEdit(todo.id)}>Save</button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
