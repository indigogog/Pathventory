import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";
import {useStore} from "@/store";

export default function TabsLayout() {
  const router = useRouter();
  const {gamesStore} = useStore();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        headerRight: () => (
          <Pressable onPress={() => router.push("../games")}>
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="inventory/index"
        options={{
          title: `Инвентарь ${gamesStore.selectedGame?.title ?? ""}`,
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes/index"
        options={{
          title: `Рецепты  ${gamesStore.selectedGame?.title ?? ""}`,
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
