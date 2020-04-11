// @flow
import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Title } from "react-native-paper"

import FakeStorage from "../../shared/backend/fakeStorage"

import TodoItemModel from "../../shared/models/todoItem"
import TodoListModel from "../../shared/models/todoList"
import FilterModel from "../../shared/models/filter"

import TodoGroup from "./todoGroup"
import FilterChips from "./filterChips"

type Props = {
  todoList: TodoListModel,
  onAddTodoItem: (todoItem: TodoItemModel) => void,
  onChangeTodoItem: (todoItem: TodoItemModel) => void,
  onDeleteTodoItem: (todoItem: TodoItemModel) => void,
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  listTitle: {
    paddingTop: 20,
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
  toggleContainer: {
    height: 56,
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "8px 0",
    minWidth: 300,
  },
  controls: {
    marginLeft: 20,
    minWidth: 300,
  },
  listContainer: {
    paddingTop: 70,
    paddingBottom: 70,
  },
  listName: {
    textAlign: "center",
    marginTop: 20,
  },
  filterChips: {
    flexDirection: "row",
    justifyContent: "center",
  },
})

const TodoList = (props: Props) => {
  const storage = new FakeStorage()
  const currentFilter = storage.loadFilter()
  console.log("load current filter", currentFilter)
  const [_, setFilterModelAttrs] = useState(currentFilter.toJSON())
  const groups = currentFilter.applyFilter(props.todoList.todos)

  const onAddTodo = (todo: TodoItemModel) => {
    props.todoList.addTodo(todo)
    props.onAddTodoItem(todo)
  }

  const onChangeTodo = (todo: TodoItemModel) => {
    props.onChangeTodoItem(todo)
    props.todoList.updateTodo(todo)
  }

  const onDeleteTodo = (todo: TodoItemModel) => {
    props.todoList.deleteTodo(todo)
    props.onDeleteTodoItem(todo)
  }

  const onChangeFilter = () => {
    console.log("change filter", currentFilter)
    storage.saveFilter(currentFilter)
    setFilterModelAttrs(currentFilter.toJSON())
  }

  const onSubjectClick = (subject: string) => {
    currentFilter.addSubjectContains(subject)
    onChangeFilter(currentFilter)
  }

  return (
    <React.Fragment>
      <View>
        <Title style={styles.listTitle}>{props.todoList.name}</Title>

        <div className={styles.filterChips}>
          <FilterChips
            currentFilter={currentFilter}
            onChangeFilter={onChangeFilter}
          />
        </div>

        {groups.map((g) => (
          <TodoGroup
            key={g.uuid}
            onChange={onChangeTodo}
            onDelete={onDeleteTodo}
            onSubjectClick={onSubjectClick}
            group={g}
          />
        ))}
      </View>
    </React.Fragment>
  )
}

export default TodoList
