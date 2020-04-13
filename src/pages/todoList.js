// @flow

import * as React from "react"

import { View, StyleSheet } from "react-native"
import { Checkbox } from "react-native-paper"

import TodoList from "../components/todoList/todoList"
import StorageContext from "../storageContext"
import TodoListStorage from "../shared/backend/todoListStorage"

const ListLeft = () => {
  return (
    <View style={styles.listItemLeft}>
      <Checkbox style={styles.checkbox} status="unchecked" />
    </View>
  )
}

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

const styles = StyleSheet.create({
  listItemLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  listSection: {
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
  },
  listTitle: {
    paddingTop: 20,
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
  filterChips: {
    flexDirection: "row",
    justifyContent: "center",
  },
})

export default TodoListPage
