import './App.css';
import Todo from './components/todo';
import Todolist from './components/todolist';
import {useState} from 'react'

function App() {

  let [todos, setTodos] = useState([])
  let [inputText, setInputText] = useState("")

  const addNewTodo = ()=>{
    console.log("ADD NEW TODO")
    let tempTodo = [...todos, {title: inputText}]
    setTodos(tempTodo)
    console.log(todos)
  }

  const handleInputChange = (event)=>{
    setInputText(event.target.value)
  }

  const deleteHandler = (event)=>{
    let tempTodo = todos.filter((todo, index)=>{
      return index.toString() !== event.target.id
    })
    setTodos(tempTodo)
  }


  return (
    <div className="App">
      <Todo addNewTodo={addNewTodo} handleInputChange={handleInputChange}/>
      <Todolist todos={todos} deleteHandler = {deleteHandler}/>
    </div>
  );
}

export default App;
