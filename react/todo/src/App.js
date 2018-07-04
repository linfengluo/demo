import React, { Component } from 'react';
import './App.scss';

import PageHeader from './components/header/index'
import InputContent from './components/inputContent'
import ListContent from './components/listContent'

const TODO_LIST_NAME = 'reactTodo'

class App extends Component {
  constructor(){
    super()
    this.state = {
      listStatus: 'all',
      todoList: []
    }

    this.addTodo = this.addTodo.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    if (window.localStorage && window.localStorage.getItem(TODO_LIST_NAME)) {
      this.setState({
        todoList: JSON.parse(window.localStorage.getItem(TODO_LIST_NAME))
      })
    }
  }
  getUuid(randomLength = 0){
    return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36) 
  }

  addTodo(value){
    const newList = [...this.state.todoList, {
      title: value,
      isDone: false,
      id: this.getUuid()
    }]
    
    this.saveTodoList(newList)
  }

  saveTodoList(list){
    this.setState({
      todoList: list
    })
    if (window.localStorage) {
      window.localStorage.setItem(TODO_LIST_NAME, JSON.stringify(list))
    }
  }
  handleChange(type, id, value = null){
    let newList = this.state.todoList

    switch (type) {
      case 'delete': 
        newList = newList.filter(item => {
          return item.id !== id
        })
        break
      case 'done':
      case 'active':
        newList = newList.map(item => {
          let newItem = item
          if (item.id === id) {
            newItem =  Object.assign(newItem, {
              isDone: type === 'done' ? true : false
            })
          }

          return newItem
        })
        break
      case 'edit': 
          newList = newList.map(item => {
            let newItem = item
            if (item.id === id) {
              newItem =  Object.assign(newItem, {
                title: value
              })
            }

            return newItem
          })
          break
        default:
          break
    }

    this.saveTodoList(newList)
  }
  render() {
    return (
      <div className="app">
        <PageHeader />
        <div className="todo">

          <InputContent addTodo={this.addTodo}/> 
          <ListContent todoList={this.state.todoList} 
          listStatus={this.state.listStatus}
          onChange={this.handleChange}/> 
        </div>
      </div>
    );
  }
}

export default App;
