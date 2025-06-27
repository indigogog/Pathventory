import {StyleSheet, Text, View} from "react-native";
import {SQLiteProvider} from "expo-sqlite";
import migrateDbIfNeeded from "@/app/backend/database/migrate-db-if-needed";
import Test from "@/app/frontend/views/test/test";

export default function Page() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="pathventory.db" onInit={migrateDbIfNeeded}>
        <View style={styles.main}>
          <Text style={styles.title}>Hello1 World</Text>
          <Text style={styles.subtitle}>This is the first page of your app.</Text>
          <Test/>
        </View>
      </SQLiteProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
