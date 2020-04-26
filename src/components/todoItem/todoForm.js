// @flow
import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { Dialog, Button, Switch, Text, TextInput } from "react-native-paper"

import TodoItemModel from "../../shared/models/todoItem"

type Props = {
  todoItem: TodoItemModel,
  title: string,
  onChange: (todoItem: TodoItemModel) => void,
  onDelete?: (todoItem: TodoItemModel) => void,
  onClose: () => void,
  showDelete: boolean,
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
  },
  withMargin: {
    marginTop: 20,
    marginBottom: 20,
  },
  red: {
    color: "white",
    backgroundColor: "#aa0000", // red[800]
  },
})

const Margin = (props) => {
  return <div className={styles.withMargin}>{props.children}</div>
}

const TodoForm = (props: Props) => {
  const [todoItemAttrs, setTodoItem] = useState(props.todoItem.toJSON())
  const todoItem = new TodoItemModel(todoItemAttrs)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const setTodoDate = (date: Date) => {
    todoItem.setDue(date)
    setTodoItem(todoItem)
  }

  const toggleIsPriority = () => {
    todoItem.togglePriority()
    setTodoItem(todoItem.toJSON())
  }

  const toggleArchived = () => {
    todoItem.toggleArchived()
    setTodoItem(todoItem)
  }

  const toggleCompleted = () => {
    todoItem.toggleCompleted()
    setTodoItem(todoItem)
  }

  const onChange = () => {
    props.onChange(todoItem)
  }

  const onChangeSubject = (text) => {
    //if (!isValid()) return

    if (todoItem.subject !== text) {
      todoItem.setSubject(text)
      setTodoItem(todoItem)
    }
  }

  const onShowDeleteDialog = () => {
    setShowDeleteDialog(true)
  }

  const onCloseDeleteDialog = () => {
    setShowDeleteDialog(false)
  }

  const onDelete = () => {
    setShowDeleteDialog(false)
    props.onDelete(todoItem)
  }

  // const isValid = (text) => {
  //   if (!subjectRef.current) return true
  //   return subjectRef.current.value !== ""
  // }

  // const onKeypress = (event) => {
  //   if (event.keyCode === 13) onChange()
  // }

  // useEffect(() => {
  //   subjectRef.current.addEventListener("keypress", onKeypress)
  //
  //   return () => {
  //     subjectRef.current.removeEventListener("keypress", onKeypress)
  //   }
  // }, [])

  // const renderDelete = () => {
  //   if (props.showDelete === false) return
  //   return (
  //     <React.Fragment>
  //       <Button variant="outlined" size="small" onClick={onShowDeleteDialog}>
  //         Delete this todo
  //       </Button>
  //       <Dialog open={showDeleteDialog} onClose={onCloseDeleteDialog}>
  //         <DialogTitle>Delete this todo?</DialogTitle>
  //         <DialogActions>
  //           <Button onClick={onDelete}>Delete</Button>
  //           <Button onClick={onCloseDeleteDialog}>Cancel</Button>
  //         </DialogActions>
  //       </Dialog>
  //     </React.Fragment>
  //   )
  // }

  return (
    <React.Fragment>
      <Dialog.Title>{props.title}</Dialog.Title>
      <Dialog.Content>
        <Margin>
          <TextInput
            style={styles.input}
            label="Subject"
            autoFocus
            onChangeText={onChangeSubject}
            value={todoItem.subject}
            placeholder="Description"
          />
        </Margin>

        <Margin>
          {/* <DatePicker */}
          {/*   autoOk */}
          {/*   keyboardIcon={<KeyboardIcon />} */}
          {/*   leftArrowIcon={<LeftArrowIcon />} */}
          {/*   rightArrowIcon={<RightArrowIcon />} */}
          {/*   label="Due" */}
          {/*   clearable */}
          {/*   value={todoItem.dueDate()} */}
          {/*   onChange={setTodoDate} */}
          {/* /> */}
        </Margin>

        <Margin>
          <Text>Completed</Text>
          <Switch onValueChange={toggleCompleted} value={todoItem.completed} />
        </Margin>

        <Margin>
          <Text>Is priority</Text>
          <Switch
            onValueChange={toggleIsPriority}
            value={todoItem.isPriority}
          />
        </Margin>

        <Margin>
          <Text>Archived</Text>
          <Switch onValueChange={toggleArchived} value={todoItem.archived} />
        </Margin>

        {/* renderDelete() */}
      </Dialog.Content>

      <Dialog.Actions>
        <Button onPress={props.onClose}>Cancel</Button>
        <Button onPress={onChange}>Submit</Button>
      </Dialog.Actions>
    </React.Fragment>
  )
}

export default TodoForm
