import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface Props<T extends { [key: string]: any }> {
  onCreate: () => void;
  onUpdate: (item: T) => void;
  onSelect: (item: T) => void;
  list: T[];
  selected: T[];
  getKey: (item: T) => number | null;
  onSelectAll: () => void;
}

function HorizontalFilter<T extends { [key: string]: any }>({
                                                              onCreate,
                                                              onUpdate,
                                                              list,
                                                              onSelect,
                                                              selected,
                                                              getKey,
                                                              onSelectAll
                                                            }: Props<T>) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onSelectAll}
      >
        <View
          style={
            !selected.length
              ? {...styles.itemContainer, ...styles.selectedItem}
              : styles.itemContainer
          }>
          <Text style={styles.itemTitle}>Все</Text>
        </View>
      </Pressable>

      <ScrollView horizontal>
        {list.map((item) => (
          <View key={getKey(item)}>
            <Pressable
              onPress={() => {
                onSelect(item)
              }}
              onLongPress={() => onUpdate(item)}
            >
              <View
                style={
                  selected?.find((s) => getKey(s) === getKey(item))
                    ? {...styles.itemContainer, ...styles.selectedItem}
                    : styles.itemContainer
                }>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
            </Pressable>
          </View>
        ))}

        <Pressable
          onPress={onCreate}
        >
          <View
            style={
              {...styles.itemContainer, ...styles.addContainer}
            }>
            <MaterialIcons style={styles.addIcon} name={"add"} color={"white"}/>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40
  },
  itemContainer: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 3,
    marginRight: 8
  },
  addContainer: {
    height: 35,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    fontSize: 28,
    padding: 0
  },
  selectedItem: {
    borderColor: "#5c8bff",
  },
  itemTitle: {
    fontSize: 20,
    color: "white",
  },
  list: {
    flexDirection: 'row'
  }
})

export default HorizontalFilter;