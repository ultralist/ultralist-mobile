// @flow
import React from "react"
import { Text } from "react-native"

type Props = {
  val: string,
  strike: boolean,
  grey: boolean,
  bold: boolean,
  onClick: (str: string) => void,
  classes: {
    project: string,
    context: string,
    strike: string,
    grey: string,
    bold: string,
  },
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
          <Text key={i} onPress={() => props.onClick(word.trim())}>
            {word}
          </Text>
          <Text> </Text>
        </React.Fragment>
      )
    } else if (isProject(word)) {
      return (
        <React.Fragment>
          <Text key={i} onPress={() => props.onClick(word.trim())}>
            {word}
          </Text>
          <Text>&nbsp;</Text>
        </React.Fragment>
      )
    } else {
      return word + " "
    }
  })

  const classNames = []
  if (props.strike) classNames.push(props.classes.strike)
  if (props.grey) classNames.push(props.classes.grey)
  if (props.bold) classNames.push(props.classes.bold)

  return <Text>{parsedWords}</Text>
}

export default TodoText
