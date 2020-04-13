// @flow

import * as React from "react"

import TodoList from "../components/todoList/todoList"
import StorageContext from "../storageContext"
import TodoListStorage from "../shared/backend/todoListStorage"

const TodoListPage = () => {
  const todoListStorage = new TodoListStorage(React.useContext(StorageContext))
  const todoList = todoListStorage.loadFirstTodoList()

  const onAddTodoItem = () => {
    todoListStorage.saveTodoList(todoList)
  }

  const onChangeTodoItem = () => {
    todoListStorage.saveTodoList(todoList)
  }

  const onDeleteTodoItem = () => {
    todoListStorage.saveTodoList(todoList)
  }

  return (
    <React.Fragment>
      <TodoList
        todoList={todoList}
        onAddTodoItem={onAddTodoItem}
        onChangeTodoItem={onChangeTodoItem}
        onDeleteTodoItem={onDeleteTodoItem}
      />
    </React.Fragment>
  )
}

export default TodoListPage
