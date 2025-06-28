import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import GroupsFilter from "@/components/ui/groups-filter/groups-filter";

export default function GameRecipes() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <GroupsFilter/>
      <Text style={{ color: "white" }}>Рецепты объекта ID: {id}</Text>
    </View>
  );
}

GameRecipes.options = {
  title: "Рецепты",
};
