import { useRouter } from "expo-router";
import { FlatList, Pressable, Text } from "react-native";

const objects = [
  { id: "1", name: "Объект 1" },
  { id: "2", name: "Объект 2" },
];

export default function GamesList() {
  const router = useRouter();
  return (
    <FlatList
      data={objects}
      renderItem={({ item }) => (
        <Pressable
          style={{ padding: 20 }}
          onPress={() =>
            router.push({
              pathname: "../inventory",
              params: { gameId: item.id },
            })
          }
        >
          <Text style={{ color: "white" }}>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}
