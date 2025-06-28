import React from 'react';
import {observer} from "mobx-react-lite";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {useStore} from "@/store";
import {useSQLiteContext} from "expo-sqlite";
import useGroups from "@/backend/domain/groups/use-groups";

const GroupsFilter = observer(() => {
  const db = useSQLiteContext();
  const {groupStore} = useStore();
  const {createGroup, updateGroup} = useGroups(db);

  const {selectedGroup} = groupStore
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={[...groupStore.groups, {gameId: 0, title: '', groupId: 0}]}
        renderItem={({item}) => (
          <>
            {item.groupId === 0 ? (
                <Pressable
                  onPress={() => {
                    groupStore.setSelectedGroup(null)
                    // router.push({
                    //   pathname: "/games/create-game",
                    // })
                  }}
                >
                  {/*<View style={{...styles.gameContainer, ...styles.addContainer}}>*/}
                  {/*  <MaterialIcons name={"add"} color={"white"} style={styles.addIcon}/>*/}
                  {/*</View>*/}
                </Pressable>
              )
              :
              (
                <Pressable
                  onPress={() => {
                    groupStore.setSelectedGroup(item)
                  }}
                >
                  <View
                    style={
                    selectedGroup?.groupId === item.groupId
                      ? {...styles.groupContainer, ...styles.selectedGroup}
                      : styles.groupContainer
                  }>
                    <Text style={styles.groupTitle}>{item.title}</Text>
                  </View>
                </Pressable>
              )}
          </>
        )}
      />
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
  selectedGroup: {
    borderColor: "#5c8bff",
  },
  groupTitle: {
    fontSize: 20,
    color: "white",
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})

export default GroupsFilter;