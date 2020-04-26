// @flow
import React from "react"

import { Dialog, Portal } from "react-native-paper"

import TodoItemModel from "../../shared/models/todoItem"
import TodoForm from "./todoForm"

type Props = {
  todoItem: TodoItemModel,
  show: boolean,
  onClose: () => void,
  onEditTodo: (todoItem: TodoItemModel) => void,
  onDeleteTodo: (todoItem: TodoItemModel) => void,
}

const EditTodo = (props: Props) => {
  const onChange = (todoItem: TodoItemModel) => {
    props.onClose()
    props.onEditTodo(todoItem)
  }

  const onDelete = (todoItem: TodoItemModel) => {
    props.onClose()
    props.onDeleteTodo(todoItem)
  }

  return (
    <Portal>
      <Dialog
        fullWidth
        maxWidth="sm"
        visible={props.show}
        onDismiss={props.onClose}
      >
        <TodoForm
          title="Edit todo"
          todoItem={props.todoItem}
          onChange={onChange}
          onDelete={onDelete}
          onClose={props.onClose}
        />
      </Dialog>
    </Portal>
  )
}

export default EditTodo
