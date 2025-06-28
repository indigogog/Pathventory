import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";
import "react-native-reanimated";

import migrateDbIfNeeded from "@/backend/database/migrate-db-if-needed";
import {PathventoryTheme} from "@/theme";
import {ThemeProvider} from "@react-navigation/native";
import {SQLiteProvider} from "expo-sqlite";
import {useEffect} from "react";
import {rootStore, StoreProvider, trunk} from "@/store";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
    }
    rehydrate();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SQLiteProvider databaseName="pathventory.db" onInit={migrateDbIfNeeded}>
      <StoreProvider value={rootStore}>
        <ThemeProvider value={PathventoryTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              headerTitle: "Игры",
            }}
          >
            <Stack.Screen
              name="games/index"
              options={{
                title: "Игры", headerShown: true,
                headerBackVisible: false,
              }}
            />

            <Stack.Screen
              name="games/create-game/index"
              options={{headerShown: true, headerTitle: "Создать игру"}}
            />
            <Stack.Screen
              name="games/edit-game/index"
              options={{headerShown: true, headerTitle: "Редактировать игру"}}
            />

            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="+not-found"/>
          </Stack>
          <StatusBar style="auto"/>
        </ThemeProvider>
      </StoreProvider>
    </SQLiteProvider>
  );
}
