import {useRouter} from "expo-router";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {useSQLiteContext} from "expo-sqlite";
import useGames from "@/backend/domain/games/use-games";
import EditButton from "@/components/ui/EditButton";
import {useEffect} from "react";

export default function GamesList() {
  const router = useRouter();
  const db = useSQLiteContext();
  const {games, needRefetch} = useGames(db);

  useEffect(() => {
    needRefetch()
  }, []);

  return (
    <FlatList
      data={games}
      renderItem={({item}) => (
        <Pressable
          style={{padding: 20}}
          onPress={() =>
            router.push({
              pathname: "../inventory",
              params: {gameId: item.gameId},
            })
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
              router.push({
                pathname: "/games/edit-game",
                params: {gameId: item.gameId},
              })
            }}/>
          </View>
        </Pressable>
      )}
    />
  );
}

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
  gameTextContainer: {
    paddingBottom: 5,
    width: "95%"
  },
  gameTitleContainer: {
    height: "60%",
  },
  gameTitleText: {
    fontSize: 44,
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
