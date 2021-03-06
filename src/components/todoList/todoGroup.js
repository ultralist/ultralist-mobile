// @flow
import React from "react"
import { StyleSheet } from "react-native"
import { List } from "react-native-paper"

import TodoItem from "../todoItem/todoItem"

import TodoItemModel from "../../shared/models/todoItem"
import TodoListGroup from "../../shared/models/todoListGroup"

type Props = {
  group: TodoListGroup,
  onChange: (todoItem: TodoItemModel) => void,
  onDelete: (todoItem: TodoItemModel) => void,
  onSubjectClick: (str: string) => void,
}

const TodoGroup = (props: Props) => {
  const todos = props.group.sortedTodos()
  return (
    <React.Fragment>
      <List.Subheader style={styles.title}>{props.group.name}</List.Subheader>
      <List.Section style={styles.listSection}>
        {todos.map((todo, idx) => (
          <TodoItem
            key={todo.uuid}
            todoItem={todo}
            onChange={props.onChange}
            onDelete={props.onDelete}
            onSubjectClick={props.onSubjectClick}
          />
        ))}
      </List.Section>
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

export default TodoGroup
