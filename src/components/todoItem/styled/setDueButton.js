// @flow
import React from "react"
import IconButton from "@material-ui/core/IconButton"
import TodayIcon from "@material-ui/icons/Today"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import TodoItemModel from "../../../models/todoItem"

type Props = {
  todoItem: TodoItemModel,
  onChange: (todoItem: TodoItemModel) => void
}

const SetDueButton = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isOpen, setIsOpen] = React.useState(false)

  const onOpenMenu = (event: Event) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
  }

  const onCloseMenu = () => {
    setIsOpen(false)
    setAnchorEl(null)
  }

  const setDueToday = () => {
    props.todoItem.setDueToday()
    onCloseMenu()
    props.onChange(props.todoItem)
  }

  const setDueTomorrow = () => {
    props.todoItem.setDueTomorrow()
    onCloseMenu()
    props.onChange(props.todoItem)
  }

  const setDueMonday = () => {
    props.todoItem.setDueMonday()
    onCloseMenu()
    props.onChange(props.todoItem)
  }

  return (
    <React.Fragment>
      <IconButton onClick={onOpenMenu} aria-label="Due Today">
        <TodayIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={isOpen} onClose={onCloseMenu}>
        <MenuItem onClick={setDueToday}>Due Today</MenuItem>
        <MenuItem onClick={setDueTomorrow}>Due Tomorrow</MenuItem>
        <MenuItem onClick={setDueMonday}>Due Monday</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default SetDueButton
