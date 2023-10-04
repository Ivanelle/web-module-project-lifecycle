import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
      <form id='todoForm' onSubmit={this.props.todoFormSubmit}>
        <input 
          value={this.props.todoInput} 
          onChange={this.props.onTodoChange}
          type='text' 
          placeholder='What else to do?'>
          </input>
        <input type='submit'></input>
      </form>
      <button 
        onClick={this.props.toggleToShowCompleted}
      >
        {this.props.showCompleted ? 'Hide' : 'Show'} Completed
        </button>
    </>
    )
  }
}
