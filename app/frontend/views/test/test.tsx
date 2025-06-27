import React from 'react';
import {useSQLiteContext} from "expo-sqlite";
import {Text, View} from "react-native";
import useGames from "@/app/backend/domain/games/use-games";

export const Test = () => {
  const db = useSQLiteContext();

  const {games, createGame, getGameById, updateGame} = useGames(db);

  return (
    <View>
      {games.map((game) => (
        <View key={game.gameId}>
          <Text>{game.title}</Text>
          <Text>{game.character}</Text>
        </View>
      ))}
      <Text>sasa1</Text>
    </View>
  );
};

export default Test;