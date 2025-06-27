import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect, useState} from "react";
import {Game} from "@/app/shared/types/game.type";
import {GamesService} from "@/app/backend/domain/games/games.service";

export default function useGames (db: SQLiteDatabase) {
  const [games, setGames] = useState<Game[]>([]);
  const [refetch, setRefetch] = useState(true);

  const service = new GamesService(db);

  const createGame = useCallback(async (game: Omit<Game, "gameId">) => {
    await service.createGame(game);

    setRefetch(true);
  }, [])

  const updateGame = useCallback(async (game: Game) => {
    await service.updateGame(game);

    setRefetch(true);
  }, [])

  const getGameById = useCallback(async (id: number) => {
    await service.getGameById(id);

    setRefetch(true);
  }, [])

  useEffect(() => {
    async function fetchGames() {
      const gamesFromDb = await service.getAllGames();

      setGames(gamesFromDb);
      setRefetch(false);
    }

    if(refetch) {
      fetchGames();
    }
  },[refetch])

  return {
    games,
    updateGame,
    getGameById,
    createGame,
  }
}