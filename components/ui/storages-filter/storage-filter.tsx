import React from 'react';
import {observer} from "mobx-react-lite";
import {Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import {useStore} from "@/store";
import {useSQLiteContext} from "expo-sqlite";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {router} from "expo-router";
import useStorages from "@/backend/domain/storages/use-storages";

const StorageFilter = observer(() => {
  const db = useSQLiteContext();
  const {storageStore, gamesStore} = useStore();
  useStorages(db);

  const {selectedStorage} = storageStore

  const listData = [{
    gameId: gamesStore.selectedGame?.gameId ?? 0,
    title: 'Все',
    storageId: null
  }, ...storageStore.storages, {gameId: 0, title: '', storageId: 0}]

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {listData.map((item) => (
          <View key={item.storageId}>
            {item.storageId === 0 ? (
                <Pressable
                  onPress={() => {
                    storageStore.setSelectedStorage(null)
                    router.push({
                      pathname: "/storages/create-storage",
                    })
                  }}
                >
                  <View
                    style={
                      {...styles.storageContainer, ...styles.addContainer}
                    }>
                    <MaterialIcons style={styles.addIcon} name={"add"} color={"white"}/>
                  </View>
                </Pressable>
              )
              :
              (
                <Pressable
                  onPress={() => {
                    storageStore.setSelectedStorage(item.storageId ? item : null)
                  }}
                  onLongPress={() => {
                    if (item.storageId) {
                      storageStore.setSelectedStorage(item)
                      router.push({
                        pathname: "/storages/update-storage",
                      })
                    }
                  }}
                >
                  <View
                    style={
                      selectedStorage?.storageId === item.storageId || selectedStorage === item.storageId
                        ? {...styles.storageContainer, ...styles.selectedStorage}
                        : styles.storageContainer
                    }>
                    <Text style={styles.storageTitle}>{item.title}</Text>
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
  storageContainer: {
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
  selectedStorage: {
    borderColor: "#5c8bff",
  },
  storageTitle: {
    fontSize: 20,
    color: "white",
  },
  list: {
    flexDirection: 'row'
  }
})

export default StorageFilter;