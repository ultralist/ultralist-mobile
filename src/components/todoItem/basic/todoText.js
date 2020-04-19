// @flow
import React from "react"
import { Text, StyleSheet } from "react-native"

type Props = {
  val: string,
  bold: boolean,
  grey: boolean,
  strike: boolean,
  onClick: (str: string) => void,
}

const isProject = (word) => {
  return word.startsWith("+")
}

const isContext = (word) => {
  return word.startsWith("@")
}

const TodoText = (props: Props) => {
  const words = props.val.split(" ")

  const parsedWords = words.map((word, i) => {
    if (isContext(word)) {
      return (
        <React.Fragment>
          <Text
            style={styles.context}
            key={i}
            onPress={() => props.onClick(word.trim())}
          >
            {word}
          </Text>
          <Text> </Text>
        </React.Fragment>
      )
    } else if (isProject(word)) {
      return (
        <React.Fragment>
          <Text
            style={styles.project}
            key={i}
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
  if (props.bold) textStyles.push(styles.bold)
  if (props.strike) textStyles.push(styles.strike)
  if (props.grey) textStyles.push(styles.grey)
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
