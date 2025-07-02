import { createContext, useContext } from "react";
import { AsyncTrunk } from 'mobx-sync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GamesStore from "@/store/game/game.store";
import StorageStore from "@/store/storage/storage.store";


export class RootStore {
  gamesStore: GamesStore;
  storageStore: StorageStore;

  constructor() {
    this.gamesStore = new GamesStore();
    this.storageStore = new StorageStore();
  }
}

export const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
})

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);