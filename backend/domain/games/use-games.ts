import {Game} from "@/types/game.type";
import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect} from "react";
import {GamesService} from "@/backend/domain/games/games.service";
import {useStore} from "@/store";
import {autorun} from "mobx";

let globalService: GamesService | null = null;

const getGamesService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new GamesService(db);
  }
  return globalService;
};

export const useGames = (db: SQLiteDatabase) => {
  const service = getGamesService(db);
  const {gamesStore} = useStore();

  async function fetchGames() {
    const gamesFromDb = await service.getAllGames();
    autorun(() => gamesStore.setGames(gamesFromDb));
  }

  const createGame = useCallback(async (game: Omit<Game, "gameId">) => {
    await service.createGame(game);

    fetchGames();
  }, [])

  const updateGame = useCallback(async (game: Game) => {
    await service.updateGame(game);

    fetchGames()
  }, [])

  const getGameById = useCallback(async (id: number) => {
    await service.getGameById(id);

    fetchGames()
  }, [])

  return {
    fetchGames,
    updateGame,
    getGameById,
    createGame
  }
}

export default useGames;