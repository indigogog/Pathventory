import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import StorageFilter from "@/components/ui/storages-filter/storage-filter";
import RecipesTagsFilter from "@/components/ui/recipes-tags-filter/recipes-tags-filter";

export default function GameRecipes() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <StorageFilter/>
      <RecipesTagsFilter/>
      <Text style={{ color: "white" }}>Рецепты объекта ID: {id}</Text>
    </View>
  );
}

GameRecipes.options = {
  title: "Рецепты",
};
