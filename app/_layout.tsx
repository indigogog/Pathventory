import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import migrateDbIfNeeded from "@/backend/database/migrate-db-if-needed";
import { useColorScheme } from "@/hooks/useColorScheme";
import { PathventoryTheme } from "@/theme";
import { ThemeProvider } from "@react-navigation/native";
import { SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SQLiteProvider databaseName="pathventory.db" onInit={migrateDbIfNeeded}>
      <ThemeProvider value={PathventoryTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            headerTitle: "Игры",
          }}
        >
          <Stack.Screen
            name="games/index"
            options={{ title: "Игры", headerShown: true }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SQLiteProvider>
  );
}
