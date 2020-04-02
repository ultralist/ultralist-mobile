// @flow

import * as React from "react"
import { View } from "react-native"
import { Provider as PaperProvider, DarkTheme, DefaultTheme, Theme, Button } from "react-native-paper"
import App from "./app.js"

const UltralistMobile = () => {
  const theme = DefaultTheme
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  )
}

export default UltralistMobile
