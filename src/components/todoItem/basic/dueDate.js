// @flow
import React from "react"
import { Text, StyleSheet } from "react-native"
import TodoItemModel from "../../../shared/models/todoItem"
import {
  format,
  isSameDay,
  addDays,
  toDate,
  isBefore,
  parseISO,
} from "date-fns"

type Props = {
  todoItem: TodoItemModel,
}

const isYesterday = (date: Date): boolean => {
  return isSameDay(date, addDays(new Date(), -1))
}

const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date())
}

const isTomorrow = (date: Date): boolean => {
  return isSameDay(date, addDays(new Date(), 1))
}

const DueDate = (props: Props) => {
  if (props.todoItem.due === null) return null
  const todoItem = props.todoItem

  console.log("todoItem.due = ", todoItem.due)
  const formattedDate = format(parseISO(todoItem.due), "MMM do")
  const realDate = toDate(parseISO(todoItem.due))
  const isDone = todoItem.archived || todoItem.completed

  if (isYesterday(realDate)) {
    return <Text style={isDone ? styles.grey : styles.past}>Yesterday</Text>
  }

  if (isToday(realDate)) {
    return <Text style={isDone ? styles.grey : styles.today}>Today</Text>
  }

  if (isBefore(realDate, new Date())) {
    return (
      <Text style={isDone ? styles.grey : styles.past}>{formattedDate}</Text>
    )
  }

  if (isTomorrow(realDate)) {
    return <Text style={isDone ? styles.grey : styles.tomorrow}>Tomorrow</Text>
  }

  return (
    <Text style={isDone ? styles.grey : styles.future}>{formattedDate}</Text>
  )
}

const styles = StyleSheet.create({
  grey: {
    color: "#aaa",
  },
  past: {
    color: "#D32F2F",
  },
  today: {
    color: "#1E88E5",
  },
  tomorrow: {
    color: "#42A5F5",
  },
  future: {
    color: "#64B5F6",
  },
})

export default DueDate
