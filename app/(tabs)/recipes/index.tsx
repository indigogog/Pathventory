import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import StorageFilter from "@/components/ui/storages-filter/storage-filter";

export default function GameRecipes() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <StorageFilter/>
      <Text style={{ color: "white" }}>Рецепты объекта ID: {id}</Text>
    </View>
  );
}

GameRecipes.options = {
  title: "Рецепты",
};
