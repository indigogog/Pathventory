import {StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {useSQLiteContext} from "expo-sqlite";
import {useStore} from "@/store";
import {Storage} from "@/types/storage.type";
import useStorages from "@/backend/domain/storages/use-storages";

export const CreateEditStorage = () => {
  const db = useSQLiteContext();
  const {gamesStore, storageStore} = useStore();
  const {createStorage, updateStorage} = useStorages(db);

  const navigation = useNavigation();

  const [changed, setChanged] = useState<Storage>({gameId: 0, title: "", storageId: 0})

  const onChangeTitle = useCallback((title: string) => {
    setChanged((prev) => ({...prev, title}));
  }, [setChanged])

  const onSave = async () => {
    if (storageStore.selectedStorage) {
      await updateStorage(changed);
    } else {
      await createStorage(changed);
    }

    navigation.goBack();
  }

  useEffect(() => {
    if (storageStore.selectedStorage ) {
      setChanged(storageStore.selectedStorage)
    }

    if(gamesStore.selectedGame) {
      setChanged((prev)=>({...prev, gameId: gamesStore.selectedGame!.gameId}))
    }
  }, [storageStore.selectedStorage, gamesStore.selectedGame])

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

export default CreateEditStorage;

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