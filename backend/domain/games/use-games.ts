import { Game } from "@/types/game.type";
import { SQLiteDatabase } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import {GamesService} from "@/backend/domain/games/games.service";

let globalService: GamesService | null = null;

const getGamesService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new GamesService(db);
  }
  return globalService;
};

export default function useGames (db: SQLiteDatabase) {
  const [games, setGames] = useState<Game[]>([]);
  const [refetch, setRefetch] = useState(true);

  const service = getGamesService(db);

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

  const needRefetch = useCallback(()=>setRefetch(true), [])

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
    needRefetch
  }
}