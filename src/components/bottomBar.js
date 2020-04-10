// @flow

import * as React from "react"
import { Appbar, Button, Text, FAB } from "react-native-paper"
import { View, StyleSheet } from "react-native"

const BottomBar = () => {
  return (
    <Appbar style={styles.bottom}>
      <View style={styles.leftButtons}>
        <Button onPress={() => console.log("Filter")}>
          <Text style={styles.button}>Filter</Text>
        </Button>
        <Button onPress={() => console.log("Group")}>
          <Text style={styles.button}>Group</Text>
        </Button>
      </View>
      <View style={styles.rightButton}>
        <Button onPress={() => console.log("Views")}>
          <Text style={styles.button}>Views</Text>
        </Button>
      </View>
      <View style={styles.fabHolder}>
        <View style={styles.fab}>
          <FAB icon="plus" onPress={() => console.log("fab")} />
        </View>
      </View>
    </Appbar>
  )
}

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    left: 0,
    right: 0,
    bottom: 0,
  },
  leftButtons: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
  },
  rightButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    color: "#fff",
  },
  fabHolder: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
  fab: {
    flex: 1,
    alignItems: "center",
    left: 0,
    right: 0,
    bottom: 0,
  },
})

export default BottomBar
