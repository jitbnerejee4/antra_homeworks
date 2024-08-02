import React, {Component} from 'react'

class TodoInput extends Component {

    render(){
        return(
            <div>
                <input type="text" onChange = {this.props.handleInputChange}></input>
                <button onClick = {this.props.addNewTodo}>Add Todo</button>
            </div>
        )
    }
}

export default TodoInput