// @flow

import * as React from "react"

import { View, ScrollView, StyleSheet } from "react-native"
import { List, Checkbox, Title, Chip } from "react-native-paper"

import TodoList from "../components/todoList/todoList"
import FakeStorage from "../shared/backend/fakeStorage"

const ListLeft = () => {
  return (
    <View style={styles.listItemLeft}>
      <Checkbox style={styles.checkbox} status="unchecked" />
    </View>
  )
}

const TodoListPage = () => {
  const storage = new FakeStorage()
  const todoList = storage.loadTodoLists()[0]

  const onAddTodoItem = () => {
    storage.updateTodoList(todoList)
  }

  const onChangeTodoItem = () => {
    storage.updateTodoList(todoList)
  }

  const onDeleteTodoItem = () => {
    storage.updateTodoList(todoList)
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
