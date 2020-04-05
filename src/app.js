// @flow

import * as React from "react"
import { View, StyleSheet } from "react-native"
import { Appbar, Text } from "react-native-paper"

import BottomBar from "./components/bottomBar"

const UltralistScreen = ({ navigation }) => (
  <React.Fragment>
    <Appbar.Header>
      <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
      <Appbar.Content title="Ultralist" />
    </Appbar.Header>

    <Text>Ultralist screen22</Text>

    <BottomBar />
  </React.Fragment>
)

export default UltralistScreen
