import {StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import {useNavigation} from "expo-router";
import {useSQLiteContext} from "expo-sqlite";
import {useStore} from "@/store";
import useTags from "@/backend/domain/tags/use-tags";
import {Tag} from "@/types/tag.type";
import {observer} from "mobx-react-lite";

export const CreateEditTag = observer(() => {
  const db = useSQLiteContext();
  const {gamesStore, tagsStore} = useStore();
  const {createTag, updateTag} = useTags(db);

  const navigation = useNavigation();

  const [changed, setChanged] = useState<Tag>({gameId: 0, title: "", tagId: 0, entity: "item"})

  const onChangeTitle = useCallback((title: string) => {
    setChanged((prev) => ({...prev, title}));
  }, [setChanged])

  const onSave = async () => {
    if (!tagsStore.tagForUpdateOrCreate) {
      return;
    }

    if (tagsStore.tagForUpdateOrCreate.tagId > 0) {
      await updateTag(changed)
    } else {
      await createTag(changed);
    }

    navigation.goBack();
  }

  useEffect(() => {
    if (tagsStore.tagForUpdateOrCreate) {
      setChanged(tagsStore.tagForUpdateOrCreate)
    }

    if (gamesStore.selectedGame) {
      setChanged((prev) => ({...prev, gameId: gamesStore.selectedGame!.gameId}))
    }
  }, [tagsStore.tagForUpdateOrCreate, gamesStore.selectedGame])

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
})

export default CreateEditTag;

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