import React, { Component } from 'react';
import './ToDoPage.css';
import { getTodos, deleteTodo, completedTodo, addTodo } from '../utils/todo-api';

export default class ToDoPage extends Component {
  state = {
    todo: '',
    todos: []
  }

  async componentDidMount() {
    try {
      const todos = await getTodos();
      this.setState({ todos: todos });
    }

    catch (err) {
      console.log(err);
    }
  }

  handleAdd = async e => {
    e.preventDefault();
    const { todo, todos } = this.state;

    try {
      const addedTodo = await addTodo({ task: todo });
      
      const updatedTodo = [...todos, addedTodo];
      this.setState({
        todos: updatedTodo,
        todo: ''
      });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  handleToDoChange = ({ target }) => {
    this.setState({ todo: target.value });
  }

  handleDelete = async id => {
    const { todos } = this.state;

    try {
      await deleteTodo(id);

      const updatedTodo = todos.filter(todo => todo.id !== id);
      this.setState({ todos: updatedTodo });
    }
    catch (err) {
      console.log(err);
    }
  }

  handleCompleted = async todoObject => {
    const { todos } = this.state;

    try {
      
      const updatedTodo = await completedTodo(todoObject);
      console.log(updatedTodo);
      const updatedTodos = todos.map(todo => todo.id === todoObject.id ? updatedTodo : todo);
      this.setState({ todos: updatedTodos });
    }
    catch (err) {
      console.log(err);
    }
  }
  
  render() {
    const { todo, todos } = this.state;

    return (
      <div className="ToDoPage">
        
        <form onSubmit={this.handleAdd}>
          <div className="todo-form">
          Add a new Todo:
            <input value={todo} onChange={this.handleToDoChange}></input>
          </div>
        </form>

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.completed ? 
                <h2 className="todo-task" style={{ 'textDecoration': 'line-through' }}>{todo.task}</h2>
                : <h2 className="todo-task">{todo.task}</h2>
              }
              
              <span>{todo.completed}</span>
              <span className="todo-status">{todo.completed === true ? 'Completed' : 'Get Your butt to Work!'}</span>
              <button className="completed" onClick={() => this.handleCompleted(todo)}>✅</button>
              <button className="delete" onClick={() => this.handleDelete(todo.id)}>🗑</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
