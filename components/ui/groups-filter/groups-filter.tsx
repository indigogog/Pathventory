import React from 'react';
import {observer} from "mobx-react-lite";
import {FlatList, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useStore} from "@/store";
import {useSQLiteContext} from "expo-sqlite";
import useGroups from "@/backend/domain/groups/use-groups";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {router} from "expo-router";

const GroupsFilter = observer(() => {
  const db = useSQLiteContext();
  const {groupStore, gamesStore} = useStore();
  useGroups(db);

  const {selectedGroup} = groupStore

  const listData = [{
    gameId: gamesStore.selectedGame?.gameId ?? 0,
    title: 'Все',
    groupId: null
  }, ...groupStore.groups, {gameId: 0, title: '', groupId: 0}]

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {listData.map((item) => (
          <View key={item.groupId}>
            {item.groupId === 0 ? (
                <Pressable
                  onPress={() => {
                    groupStore.setSelectedGroup(null)
                    router.push({
                      pathname: "/groups/create-group",
                    })
                  }}
                >
                  <View
                    style={
                      {...styles.groupContainer, ...styles.addContainer}
                    }>
                    <MaterialIcons style={styles.addIcon} name={"add"} color={"white"}/>
                  </View>
                </Pressable>
              )
              :
              (
                <Pressable
                  onPress={() => {
                    groupStore.setSelectedGroup(item.groupId ? item : null)
                  }}
                  onLongPress={() => {
                    if (item.groupId) {
                      groupStore.setSelectedGroup(item)
                      router.push({
                        pathname: "/groups/update-group",
                      })
                    }
                  }}
                >
                  <View
                    style={
                      selectedGroup?.groupId === item.groupId || selectedGroup === item.groupId
                        ? {...styles.groupContainer, ...styles.selectedGroup}
                        : styles.groupContainer
                    }>
                    <Text style={styles.groupTitle}>{item.title}</Text>
                  </View>
                </Pressable>
              )}
          </View>
        ))}


      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40
  },
  groupContainer: {
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
  selectedGroup: {
    borderColor: "#5c8bff",
  },
  groupTitle: {
    fontSize: 20,
    color: "white",
  },
  list: {
    flexDirection: 'row'
  }
})

export default GroupsFilter;