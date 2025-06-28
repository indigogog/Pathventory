import {StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {Game} from "@/types/game.type";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {useSQLiteContext} from "expo-sqlite";
import useGames from "@/backend/domain/games/use-games";
import {useStore} from "@/store";


export const CreateEditGame = () => {
  const db = useSQLiteContext();
  const {gamesStore} = useStore();
  const {createGame, updateGame} = useGames(db);

  const navigation = useNavigation();

  const [changed, setChanged] = useState<Game>({gameId: 0, title: "", character: ""})

  const onChangeTitle = useCallback((title: string) => {
    setChanged((prev) => ({...prev, title}));
  }, [setChanged])

  const onChangeCharacter = useCallback((character: string) => {
    setChanged((prev) => ({...prev, character}));
  }, [setChanged])

  const onSave = async () => {
    if (gamesStore.selectedGame) {
      await updateGame(changed);
    } else {
      await createGame(changed);
    }

    navigation.goBack();
  }

  useEffect(() => {
    if (gamesStore.selectedGame) {
      setChanged(gamesStore.selectedGame)
    }
  }, [gamesStore.selectedGame])

  return (
    <View style={{flex: 1, padding: 20, justifyContent: "space-between"}}>
      <View>
        <View>
          <Text style={{color: "white"}}>Название</Text>
          <TextInput
            onChangeText={onChangeTitle}
            value={changed.title}
            style={styles.input}
          />
        </View>

        <View style={{marginTop: 20, marginBottom: 20}}>
          <Text style={{color: "white"}}>Персонаж</Text>
          <TextInput
            onChangeText={onChangeCharacter}
            value={changed.character}
            style={styles.input}
          />
        </View>
      </View>
      <TouchableHighlight onPress={onSave}>
        <View style={styles.saveBtn}>
          <Text style={{color: "white", fontSize: 20}}>
            Сохранить
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

export default CreateEditGame;

const styles = StyleSheet.create({
  input: {
    color: "white",
    fontSize: 20,
    width: "100%",
    boxShadow: "0px 0px 23px 0px rgba(159, 213, 255, 0.2)",
    borderRadius: 5,
    marginTop: 8
  },
  saveBtn: {
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px 23px 0px rgba(159, 213, 255, 0.2)",
    borderRadius: 5
  }
})