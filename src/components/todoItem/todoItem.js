// @flow
import React, { useState } from "react"

import { View, StyleSheet } from "react-native"
import { Checkbox, List } from "react-native-paper"

import StorageContext from "../../storageContext"

import TodoItemModel from "../../shared/models/todoItem"

import DueDate from "./dueDate"
import TodoText from "./todoText"
// import SetDueButton from "./setDueButton"
// import TodoItemNote from "./todoItemNote"
// import EditTodo from "./editTodo"

type Props = {
  todoItem: TodoItemModel,
  isSelected: boolean,
  isFirst: boolean,
  onChange: (todoItem: TodoItemModel) => void,
  onDelete: (todoItem: TodoItemModel) => void,
  onSubjectClick: (str: string) => void,
  showEditTodo: boolean,
  classes: {
    shortWidthHide: string,
    shortWidthShow: string,
    starIcon: string,
    notesArea: string,
    paper: string,
    listItem: string,
    selectedListItem: string,
  },
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

const ListLeft = (props: { todoItem: TodoItemModel, onPress: any }) => {
  const status = props.todoItem.completed ? "checked" : "unchecked"
  return (
    <View style={styles.listItemLeft}>
      <Checkbox status={status} onPress={props.onPress} />
    </View>
  )
}

const TodoItem = (props: Props) => {
  const [todoItemAttrs, setTodoItemAttrs] = useState(props.todoItem.toJSON())
  const todoItem = new TodoItemModel(todoItemAttrs)
  const [showNotes, setShowNotes] = useState(false)
  const [showEditTodo, setShowEditTodo] = useState(false)

  const storage = React.useContext(StorageContext)
  storage.save("modalIsOpen", showEditTodo)

  const toggleShowEditTodo = () => {
    setShowEditTodo(!showEditTodo)
  }

  const onToggleComplete = () => {
    todoItem.toggleCompleted()
    onChangeTodo(todoItem)
  }

  const togglePriority = () => {
    todoItem.togglePriority()
    onChangeTodo(todoItem)
  }

  const deleteNote = (note) => {
    todoItem.deleteNote(note)
    onChangeTodo(todoItem)
  }

  const toggleArchived = () => {
    todoItem.toggleArchived()
    onChangeTodo(todoItem)
  }

  const toggleShowNotes = () => {
    setShowNotes(!showNotes)
  }

  const onChangeTodo = (todoItem) => {
    setTodoItemAttrs(todoItem.toJSON())
    props.onChange(todoItem)
  }

  const notes = () => {
    return todoItem.notes.map((n) => (
      <React.Fragment key={n}>
        <TodoItemNote note={n} onDeleteNote={deleteNote} />
      </React.Fragment>
    ))
  }

  // const ArchiveButton = (props) => (
  //   <IconButton onClick={props.onClick}>
  //     <ArchiveIcon />
  //   </IconButton>
  // )
  //
  // const UnarchiveButton = (props) => (
  //   <IconButton onClick={props.onClick}>
  //     <UnarchiveIcon />
  //   </IconButton>
  // )

  // const firstButton = () => {
  //   if (todoItem.completed) {
  //     if (todoItem.archived) {
  //       return <UnarchiveButton onClick={toggleArchived} />
  //     } else {
  //       return <ArchiveButton onClick={toggleArchived} />
  //     }
  //   } else {
  //     if (todoItem.archived) {
  //       return <UnarchiveButton onClick={toggleArchived} />
  //     } else {
  //       return <SetDueButton todoItem={todoItem} onChange={onChangeTodo} />
  //     }
  //   }
  // }
  //
  const subject = (
    <TodoText todoItem={todoItem} onClick={props.onSubjectClick} />
  )

  const due = <DueDate todoItem={todoItem} />

  return (
    <List.Item
      left={() => <ListLeft todoItem={todoItem} onPress={onToggleComplete} />}
      key={todoItem.id}
      title={subject}
      onClick={() => console.log("todo click")}
      description={due}
    />
  )
}

export default TodoItem
