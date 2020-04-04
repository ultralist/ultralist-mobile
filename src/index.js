// @flow

import * as React from "react"

import { Provider as PaperProvider, DarkTheme, DefaultTheme } from "react-native-paper"
import { InitialState, NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import App from "./app.js"

const Drawer = createDrawerNavigator()

const UltralistMobile = () => {
  const theme = DefaultTheme
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer initialRouteName="Home">
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={App} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default UltralistMobile
