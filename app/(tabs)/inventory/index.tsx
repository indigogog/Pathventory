import {useLocalSearchParams} from "expo-router";
import {Text, View} from "react-native";
import StorageFilter from "@/components/ui/storages-filter/storage-filter";

export default function GameInventory() {
  const {id} = useLocalSearchParams();
  return (
    <View style={{flex: 1, padding: 10}}>
      <StorageFilter/>
      <Text style={{color: "white"}}>Инвентарь объекта ID: {id}</Text>
    </View>
  );
}

GameInventory.options = {
  title: "Инвентарь",
  headerBackTitle: "Назад",
};
