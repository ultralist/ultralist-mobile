// @flow
import React from "react"
import { Text, StyleSheet } from "react-native"
import TodoItemModel from "../../../shared/models/todoItem"

type Props = {
  todoItem: TodoItemModel,
  onClick: (str: string) => void,
}

const isProject = (word) => {
  return word.startsWith("+")
}

const isContext = (word) => {
  return word.startsWith("@")
}

const TodoText = (props: Props) => {
  const todoItem = props.todoItem
  const words = todoItem.subject.split(" ")

  const parsedWords = words.map((word, i) => {
    if (isContext(word)) {
      return (
        <React.Fragment key={i}>
          <Text
            style={styles.context}
            onPress={() => props.onClick(word.trim())}
          >
            {word}
          </Text>
          <Text> </Text>
        </React.Fragment>
      )
    } else if (isProject(word)) {
      return (
        <React.Fragment key={i}>
          <Text
            style={styles.project}
            onPress={() => props.onClick(word.trim())}
          >
            {word}
          </Text>
          <Text>&nbsp;</Text>
        </React.Fragment>
      )
    } else {
      return word + " "
    }
  })

  const textStyles = []
  if (todoItem.isPriority) textStyles.push(styles.bold)
  if (todoItem.completed) textStyles.push(styles.strike)
  if (todoItem.archived) textStyles.push(styles.grey)
  const finalStyle = StyleSheet.flatten(textStyles)

  return <Text style={finalStyle}>{parsedWords}</Text>
}

const styles = StyleSheet.create({
  context: {
    color: "#1E88E5",
  },
  project: {
    color: "#E53935",
  },
  strike: {
    textDecorationLine: "line-through",
  },
  grey: {
    color: "#aaa",
  },
  bold: {
    fontWeight: "bold",
  },
})

export default TodoText
