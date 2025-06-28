import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function TabsLayout() {
  const router = useRouter();
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
          title: "Инвентарь",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes/index"
        options={{
          title: "Рецепты",
          tabBarIcon: ({ color }) => (
            <Ionicons name="book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
