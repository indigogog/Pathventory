import {useSQLiteContext} from "expo-sqlite";
import useGames from "@/backend/domain/games/use-games";
import CreateEditGame from "@/components/ui/create-edit-game";


export default function CreateGame() {
  const db = useSQLiteContext();
  const {createGame} = useGames(db);

  return <CreateEditGame onSave={createGame}/>;
}