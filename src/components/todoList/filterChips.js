// @flow
import React from "react"
import { StyleSheet } from "react-native"
import { Chip } from "react-native-paper"

import FilterModel from "../../shared/models/filter"

type Props = {
  currentFilter: FilterModel,
  onChangeFilter: (f: FilterModel) => void,
}

const styles = StyleSheet.create({
  chip: {
    margin: 3,
  },
})

const FilterChips = (props: Props) => {
  const removeFilterString = (s) => {
    props.currentFilter.removeFilterString(s)
    props.onChangeFilter(props.currentFilter)
  }

  return props.currentFilter.toFilterStrings().map((s) => (
    <Chip
      style={styles.chip}
      key={s}
      label={s}
      onClose={() => removeFilterString(s)}
    >
      {s}
    </Chip>
  ))
}

export default FilterChips
