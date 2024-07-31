import React from 'react'

export default function Todolist({todos, deleteHandler}) {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
      {todos.map((todo, index)=>{
        return(
            <li key={index}>
                <span>{todo.title}</span>
                <span>
                    <button id = {index} onClick={deleteHandler}>Delete</button>
                </span>
            </li>
        )
      })}
      </ul>

    </div>
  )
}
