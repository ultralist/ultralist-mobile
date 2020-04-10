// @flow
import React, { useState, useEffect } from "react"

import { withStyles } from "@material-ui/core/styles"
import IconButton from "@material-ui/core/IconButton"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import Checkbox from "@material-ui/core/Checkbox"
import StarBorder from "@material-ui/icons/StarBorder"
import ListItemText from "@material-ui/core/ListItemText"
import Star from "@material-ui/icons/Star"
import Collapse from "@material-ui/core/Collapse"

import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ArchiveIcon from "@material-ui/icons/Archive"
import UnarchiveIcon from "@material-ui/icons/Unarchive"

import yellow from "@material-ui/core/colors/yellow"

import Storage from "../../../backend/storage"
import TodoItemModel from "../../../models/todoItem"

import DueDate from "./dueDate"
import TodoText from "./todoText"
import SetDueButton from "./setDueButton"
import TodoItemNote from "./todoItemNote"
import EditTodo from "./editTodo"

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
    selectedListItem: string
  }
}

const styles = theme => ({
  shortWidthHide: {
    [theme.breakpoints.down(700 + theme.spacing.unit * 3 * 2)]: {
      display: "none"
    },
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      display: "block"
    }
  },
  shortWidthShow: {
    [theme.breakpoints.down(700 + theme.spacing.unit * 3 * 2)]: {
      display: "block"
    },
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      display: "none"
    }
  },
  todo: {
    [theme.breakpoints.down(700 + theme.spacing.unit * 3 * 2)]: {},
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      maxWidth: 1200
    },
    color: "#444",
    backgroundColor: "#fff",
    borderTop: "1px solid #eee"
  },
  firstTodo: {
    [theme.breakpoints.down(700 + theme.spacing.unit * 3 * 2)]: {},
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      maxWidth: 1200
    },
    color: "#444",
    backgroundColor: "#fff"
  },
  starIcon: {
    color: yellow[800]
  },
  notesArea: {
    backgroundColor: "#efefef",
    marginLeft: 40,
    marginBottom: 20
  }
})

const TodoItem = (props: Props) => {
  const storage = new Storage()

  const [todoItemAttrs, setTodoItemAttrs] = useState(props.todoItem.toJSON())
  const todoItem = new TodoItemModel(todoItemAttrs)

  const [showNotes, setShowNotes] = useState(false)
  const [showEditTodo, setShowEditTodo] = useState(false)

  storage.setModalIsOpen(showEditTodo)

  const toggleShowEditTodo = () => {
    setShowEditTodo(!showEditTodo)
  }

  const toggleComplete = () => {
    todoItem.toggleCompleted()
    onChangeTodo(todoItem)
  }

  const togglePriority = () => {
    todoItem.togglePriority()
    onChangeTodo(todoItem)
  }

  const deleteNote = note => {
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

  const onChangeTodo = todoItem => {
    setTodoItemAttrs(todoItem.toJSON())
    props.onChange(todoItem)
  }

  const notes = () => {
    return todoItem.notes.map(n => (
      <React.Fragment key={n}>
        <TodoItemNote note={n} onDeleteNote={deleteNote} />
      </React.Fragment>
    ))
  }

  const ArchiveButton = props => (
    <IconButton onClick={props.onClick}>
      <ArchiveIcon />
    </IconButton>
  )

  const UnarchiveButton = props => (
    <IconButton onClick={props.onClick}>
      <UnarchiveIcon />
    </IconButton>
  )

  const firstButton = () => {
    if (todoItem.completed) {
      if (todoItem.archived) {
        return <UnarchiveButton onClick={toggleArchived} />
      } else {
        return <ArchiveButton onClick={toggleArchived} />
      }
    } else {
      if (todoItem.archived) {
        return <UnarchiveButton onClick={toggleArchived} />
      } else {
        return <SetDueButton todoItem={todoItem} onChange={onChangeTodo} />
      }
    }
  }

  const onKeypress = event => {
    if (!props.isSelected || storage.isModalOpen()) return

    if (event.keyCode === 13) setShowEditTodo(true)
    if (event.keyCode === 99) toggleComplete()
    if (event.keyCode === 112) togglePriority()
    if (event.keyCode === 65) toggleArchived()
  }

  useEffect(() => {
    document.addEventListener("keypress", onKeypress)

    return () => {
      document.removeEventListener("keypress", onKeypress)
    }
  }, [])

  return (
    <ListItem key={todoItem.id} className={props.isFirst ? props.classes.firstTodo : props.classes.todo}>
      <Checkbox tabIndex={-1} checked={todoItem.completed} onChange={toggleComplete} />

      <IconButton onClick={togglePriority} className={props.classes.shortWidthHide} aria-label="Prioritize">
        {todoItem.isPriority ? <Star className={props.classes.starIcon} /> : <StarBorder />}
      </IconButton>

      <ListItemText onClick={toggleShowEditTodo} primary={<TodoText bold={todoItem.isPriority} strike={todoItem.completed} grey={todoItem.archived} val={todoItem.subject} onClick={props.onSubjectClick} />} secondary={<DueDate grey={todoItem.archived || todoItem.completed} date={todoItem.dueDate()} />} />

      <Collapse in={showNotes} timeout="auto" unmountOnExit>
        <ul className={props.classes.notesArea}> {notes()} </ul>
      </Collapse>

      <EditTodo show={showEditTodo} onClose={toggleShowEditTodo} todoItem={todoItem} onEditTodo={onChangeTodo} onDeleteTodo={props.onDelete} />
      <ListItemSecondaryAction>
        <div className={props.classes.shortWidthHide}>
          {firstButton()}

          <IconButton onClick={toggleShowNotes} aria-label="Show Notes">
            {showNotes ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </div>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default withStyles(styles)(TodoItem)
