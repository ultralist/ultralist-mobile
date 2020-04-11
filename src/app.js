// @flow

import * as React from "react"
import { Appbar } from "react-native-paper"
import TodoListPage from "./pages/todoList"

import BottomBar from "./components/bottomBar"

const UltralistScreen = ({ navigation }) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Ultralist" />
    </Appbar.Header>

    <TodoListPage />

    <BottomBar />
  </React.Fragment>
)

export default UltralistScreen
