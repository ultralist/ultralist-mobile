// @flow

import * as React from "react"

import { View, ScrollView, StyleSheet } from "react-native"
import { Appbar, Text, List, Checkbox, Title, Chip } from "react-native-paper"

const ListLeft = () => {
  return (
    <View style={styles.listItemLeft}>
      <Checkbox style={styles.checkbox} status="unchecked" />
    </View>
  )
}

const TodoList = () => {
  return (
    <React.Fragment>
      <Title style={styles.listTitle}>Work list</Title>

      <View style={styles.filterChips}>
        <Chip onClose={() => {}}>not:archived</Chip>
      </View>

      <ScrollView style={{ paddingBottom: 100 }}>
        <List.Subheader>All items</List.Subheader>
        <List.Section style={styles.listSection}>
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List descriptionnnn"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
        </List.Section>

        <List.Subheader>Other items</List.Subheader>
        <List.Section style={styles.listSection}>
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List descriptionnnn"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
        </List.Section>

        <List.Subheader>More items</List.Subheader>
        <List.Section style={styles.listSection}>
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List descriptionnnn"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
        </List.Section>

        <List.Subheader>More items</List.Subheader>
        <List.Section style={styles.listSection}>
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List descriptionnnn"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
        </List.Section>
        <List.Subheader>More items</List.Subheader>
        <List.Section style={styles.listSection}>
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List descriptionnnn"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
          <List.Item
            left={(props) => <ListLeft />}
            title="List item"
            description="List description"
          />
        </List.Section>
      </ScrollView>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  listItemLeft: {
    alignItems: "center",
    flexDirection: "row",
  },
  listSection: {
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
  },
  listTitle: {
    paddingTop: 20,
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
  filterChips: {
    flexDirection: "row",
    justifyContent: "center",
  },
})

export default TodoList
