import React from 'react'

export default function Todo({addNewTodo, handleInputChange}) {
  return (
    <div>
      <input type="text" onChange = {handleInputChange}></input>
      <button onClick = {addNewTodo}>Add Todo</button>
    </div>
  )
}
