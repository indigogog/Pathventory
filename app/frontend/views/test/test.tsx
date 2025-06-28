import React, {useEffect} from 'react';
import {useSQLiteContext} from "expo-sqlite";
import {Text, View} from "react-native";
import useGames from "@/app/backend/domain/games/use-games";
import useGroups from "@/app/backend/domain/groups/use-groups";

export const Test = () => {
  const db = useSQLiteContext();

  const {groups, createGroup} = useGroups(db, 2);

  return (
    <View>
      {groups.map((game) => (
        <View key={game.groupId}>
          <Text>{game.title}</Text>
        </View>
      ))}
      <Text>sasa1</Text>
    </View>
  );
};

export default Test;