import './App.css';
import Todo from './components/todo';
import Todolist from './components/todolist';
import {useState, useEffect} from 'react'

function App() {

  let [todos, setTodos] = useState([])
  let [inputText, setInputText] = useState("")
  let [editIndex, seteditIndex] = useState(null)
  let [editText, seteditText] = useState('')

  useEffect(() => {
    function getData(){
      fetch('http://localhost:3000/todos').then((data)=>{
        return data.json()
      }).then((data)=>{
        setTodos(data)
      })
    }
    getData()
  }, [])
  
  const addNewTodo = ()=>{
    // console.log("ADD NEW TODO")
    // let tempTodo = [...todos, {title: inputText}]
    // setTodos(tempTodo)
    const postData = {
      id: todos.length + 1,
      title: inputText
    }
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    }).then((data)=>{
      return data.json()
    }).then((data)=>{
      let tempTodo = [...todos, data]
      setTodos(tempTodo)
    })
  }

  const handleInputChange = (event)=>{
    setInputText(event.target.value)
    seteditIndex(event.target.id)
  }

  const deleteHandler = (event)=>{
    // let tempTodo = todos.filter((todo, index)=>{
    //   return index.toString() !== event.target.id
    // })
    // setTodos(tempTodo)
    fetch(`http://localhost:3000/todos/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(()=>{
      let tempTodo = todos.filter((todo)=>todo.id.toString() !== event.target.id)
      setTodos(tempTodo)
    })
  }

  const editHandler = (event, title)=>{
    console.log(event.target.id)
    seteditIndex(event.target.id)
    console.log(title)
    seteditText(title)
  }

  const handleEditChange = (event)=>{
    seteditText(event.target.value)

  }

  const saveEdit = (id)=>{
    console.log(id)
    // let tempTodos = [...todos]
    // tempTodos[index].title = editText
    // setTodos(tempTodos)
    // seteditIndex(null)
    const updatedTitle = {
      title: editText
    }
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTitle)
    }).then((data)=>{
      return data.json()
    }).then((data)=>{
      let tempTodos = todos.map((todo)=>{
        if(todo.id === data.id){
          todo.title = data.title
        }
        return todo
      })
      setTodos(tempTodos)
      seteditIndex(null)
    })
  }


  return (
    <div className="App">
      <Todo addNewTodo={addNewTodo} handleInputChange={handleInputChange}/>
      <Todolist todos={todos} deleteHandler = {deleteHandler} editHandler = {editHandler} editIndex = {editIndex} editText = {editText} handleEditChange={handleEditChange} saveEdit = {saveEdit}/>
    </div>
  );
}

export default App;

