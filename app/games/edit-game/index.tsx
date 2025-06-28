import {useLocalSearchParams} from "expo-router";
import {useSQLiteContext} from "expo-sqlite";
import useGames from "@/backend/domain/games/use-games";
import CreateEditGame from "@/components/ui/create-edit-game";


export default function EditGame() {
  const {gameId} = useLocalSearchParams<{ gameId?: string }>();

  const db = useSQLiteContext();
  const {games, createGame} = useGames(db);

  console.log(gameId)

  return <CreateEditGame game={gameId ? games.find((g) => g.gameId === Number(gameId)) : undefined} onSave={createGame}/>;
}