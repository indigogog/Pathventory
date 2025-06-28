import {action, makeObservable, observable} from 'mobx';
import {Game} from "@/types/game.type";

export default class GamesStore {
  selectedGame: Game | null = null;
  games: Game[] = [];

  constructor() {
    makeObservable(this, {selectedGame: observable, games: observable, setGames: action, setSelectedGame: action});
  }

  setGames(games: Game[]) {
    this.games = games;
  }

  setSelectedGame(selectedGame: Game | null) {
    this.selectedGame = selectedGame;
  }
}