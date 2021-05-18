import React, { Component } from 'react';
import './ToDoPage.css';
import { getTodos, deleteTodo, completedTodo } from '../utils/todo-api';

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
      const addedTodo = await addTodo({ name: todoName });
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

  handleCompleted = async id => {
    const { todos } = this.state;

    try {
      const updatedTodo = await completedTodo(id);

      const updatedTodos = todos.map(todo => todo.id === id ? updatedTodo : todo);
      this.setState({ todo: updatedTodos });
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
          Add a new Todo:
          <input value={todo} onChange={this.handleToDoChange}></input>
        </form>

        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <h2>{todo.name}</h2>
              <span>{todo.completed}</span>
              <button className="completed" onClick={() => this.handleCompleted}>✅</button>
              <button className="delete" onClick={() => this.handleDelete}>🗑</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
