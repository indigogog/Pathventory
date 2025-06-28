import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function GameInventory() {
  const { id } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ color: "white" }}>Инвентарь объекта ID: {id}</Text>
    </View>
  );
}

GameInventory.options = {
  title: "Инвентарь",
  headerBackTitle: "Назад",
};
