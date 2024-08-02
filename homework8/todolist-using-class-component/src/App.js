import React, { Component } from 'react';
import './App.css';
import TodoInput from './components/todoInput';
import TodoList from './components/todolist';

class App extends Component {

  state = {
    todos: [],
    inputText: ''
  }

  componentDidMount() {
    this.getData();
  }

  getData = ()=>{
    console.log("CALLED GET DATA")
    fetch('http://localhost:3000/todos').then((data)=>{
      return data.json()
    }).then((data)=>{
      this.setState({
        todos: data
      })
    })
  }
  

  handleInputChange = (event) => { 
    this.setState({
      inputText: event.target.value
    });
  }

  addNewTodo = (event)=> {
    console.log("CALLED ADD NEW TODO")
    const postData = {
      id: (this.state.todos.length + 1).toString(),
      title: this.state.inputText
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
      let tempTodo = [...this.state.todos, data]
      this.setState({
        todos: tempTodo
      })
    }).then(()=>console.log(this.state.todos))
  }

  deleteHandler = (event)=>{
    console.log(event.target.id)
    event.stopPropagation();
    fetch(`http://localhost:3000/todos/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(()=>{
      let tempTodo = this.state.todos.filter((todo)=>todo.id.toString() !== event.target.id)
      this.setState({
        todos: tempTodo
      })
    })
  }

  render() {
    return (
      <div className="App">
        <TodoInput handleInputChange={this.handleInputChange} addNewTodo={this.addNewTodo} />
        <TodoList todos = {this.state.todos} deleteHandler = {this.deleteHandler}/>
      </div>
    );
  }
}

export default App;

