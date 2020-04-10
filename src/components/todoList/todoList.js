// @flow
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"

import FakeStorage from "../../shared/backend/fakeStorage"

import TodoItemModel from "../../shared/models/todoItem"
import TodoListModel from "../../shared/models/todoList"
import FilterModel from "../../shared/models/filter"
import FilterChips from "./filterChips"

import TodoGroup from "./todoGroup"

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
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
})

const TodoList = (props: Props) => {
  const storage = new FakeStorage()
  const filterModel = storage.loadFilter()
  const [filterModelAttrs, setFilterModelAttrs] = useState({})

  const groups = filterModel.applyFilter(props.todoList.todos)

  const onChangeTodo = (todo: TodoItemModel) => {
    props.onChangeTodoItem(todo)
    props.todoList.updateTodo(todo)
  }

  const onDeleteTodo = (todo: TodoItemModel) => {
    props.todoList.deleteTodo(todo)
    props.onDeleteTodoItem(todo)
  }

  const onChangeFilter = (filter: FilterModel) => {
    storage.saveFilter(filter)
    setFilterModelAttrs(filter.toJSON())
  }

  const onSubjectClick = (subject: string) => {
    filterModel.addSubjectContains(subject)
    onChangeFilter(filterModel)
  }

  return (
    <React.Fragment>
      <View>
        <Text style={styles.listName}>{props.todoList.name}</Text>

        <div className={styles.filterChips}>
          <FilterChips
            currentFilter={filterModel}
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
