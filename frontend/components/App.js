import React from 'react'
import axios from 'axios';

import Form from './Form'
import TodoList from './TodoList';
import Todo from './Todo';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      todoInput: '',
      showCompleted: true
    } 
    }

  onTodoChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoInput: value })
  }

  newTodo = () => {
    axios.post(URL, { name: this.state.todoInput})
    .then (res => {
    this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
    this.setState({ ...this.state, todoInput: ''})
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message })
    })
  }

  todoFormSubmit = evt => {
    evt.preventDefault();
    this.newTodo()
  }

  fetchTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message })
    })
  }

  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.map(td => {
        if (td.id !== id) return td
        return res.data.data
      })})
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message })
    })
  }

  toggleToShowCompleted = () => {
    this.setState({ ...this.state, showCompleted: !this.state.showCompleted })
  }

  componentDidMount() {
    this.fetchTodos()
  }

  render() {
    return (
      <div>
       <TodoList 
        todos={this.state.todos}
        showCompleted={this.state.showCompleted}
        toggleCompleted={this.toggleCompleted}
       />
        <Form 
          todoFormSubmit={this.todoFormSubmit}
          onTodoChange={this.onTodoChange}
          toggleToShowCompleted={this.toggleToShowCompleted}
          todoInput={this.state.todoInput}
          showCompleted={this.state.showCompleted}
        />
      </div>
    )
  }
}
