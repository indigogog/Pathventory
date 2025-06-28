import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GameRecipes() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: "white" }}>Рецепты объекта ID: {id}</Text>
    </View>
  );
}

GameRecipes.options = {
  title: "Рецепты",
};
