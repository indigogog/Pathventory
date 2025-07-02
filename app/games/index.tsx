import {useRouter} from "expo-router";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import EditButton from "@/components/ui/utils/edit-button/EditButton";
import {useStore} from "@/store";
import {useSQLiteContext} from "expo-sqlite";
import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import useGames from "@/backend/domain/games/use-games";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


const GamesList = observer(() => {
  const router = useRouter();
  const db = useSQLiteContext();
  const {fetchGames} = useGames(db)
  const {gamesStore} = useStore();

  useEffect(() => {
    fetchGames();
  }, [db]);

  return (
    <FlatList
      keyExtractor={(item) => item.gameId?.toString()}
      data={[...gamesStore.games, {gameId: 0, title: '', character: ""}]}
      renderItem={({item}) => (
        <>
          {item.gameId === 0 ? (
              <Pressable
                style={{padding: 20}}
                onPress={() => {
                  gamesStore.setSelectedGame(null)
                  router.push({
                    pathname: "/games/create-game",
                  })
                }}
              >
                <View style={{...styles.gameContainer, ...styles.addContainer}}>
                  <MaterialIcons name={"add"} color={"white"} style={styles.addIcon}/>
                </View>
              </Pressable>
            )
            :
            (<Pressable
              style={{padding: 20}}
              onPress={() => {
                gamesStore.setSelectedGame(item)
                router.push({
                  pathname: "../inventory",
                })
              }
              }
            >
              <View style={styles.gameContainer}>
                <View style={styles.gameTextContainer}>
                  <View style={styles.gameTitleContainer}>
                    <Text style={styles.gameTitleText}>{item.title}</Text>
                  </View>
                  <View style={styles.gameTextContainer}>
                    <Text style={styles.gameCharacterText}>{item.character}</Text>
                  </View>
                </View>
                <EditButton onPress={() => {
                  gamesStore.setSelectedGame(item);
                  router.push({
                    pathname: "/games/edit-game"
                  })
                }}/>
              </View>
            </Pressable>)}
        </>
      )}
    />
  );
})

export default GamesList;

const styles = StyleSheet.create({
  gameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 100,
    width: "100%",
    borderRadius: "5%",
    boxShadow: "0px 0px 33px 0px rgba(159, 213, 255, 0.2)"
  },
  addContainer: {
    justifyContent: "center",
  },
  addIcon: {
    fontSize: 100
  },
  gameTextContainer: {
    paddingBottom: 5,
    width: "95%"
  },
  gameTitleContainer: {
    height: "60%",
  },
  gameTitleText: {
    fontSize: 34,
    color: "white",
  },
  gameCharacterText: {
    fontSize: 24,
    color: "white",
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
