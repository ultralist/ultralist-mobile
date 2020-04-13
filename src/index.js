// @flow

import * as React from "react"

import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import FakeStorage from "./shared/backend/fakeStorage"
import { createFakeTodoList } from "./shared/fakeData"

import StorageContext from "./storageContext"
import App from "./app.js"

const Drawer = createDrawerNavigator()
const storage = new FakeStorage()
storage.save("todolists", [createFakeTodoList()])

const UltralistMobile = () => {
  const theme = DefaultTheme
  return (
    <StorageContext.Provider value={storage}>
      <PaperProvider theme={theme}>
        <NavigationContainer initialRouteName="Home">
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={App} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StorageContext.Provider>
  )
}

export default UltralistMobile
