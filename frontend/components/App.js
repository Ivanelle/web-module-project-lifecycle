import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoInput: ''
    } 
    }

  onTodoChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoInput: value })
  }

  newTodo = () => {
    axios.post(URL, { name: this.state.todoInput})
    .then (res => {
    this.fetchTodos()
    this.setState({ ...this.state, todoInput: ''})
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.res.data.message })
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
      this.setState({ ...this.state, error: err.res.data.message })
    })
  }


  componentDidMount() {
    this.fetchTodos()
  }
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todos'>
          <h2>Todos:</h2>
          {
            this.state.todos.map(td => {
              return <div key={td.id}>{td.name}</div>
            })
          }
        </div>
        <form id='todoForm' onSubmit={this.todoFormSubmit}>
          <input value={this.state.todoInput} onChange={this.onTodoChange}type='text' placeholder='What else to do?' />
          <input type='submit'></input>
          <button>Clear Completed</button>
        </form>
      </div>
    )
  }
}
