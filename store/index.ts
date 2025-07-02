import { createContext, useContext } from "react";
import { AsyncTrunk } from 'mobx-sync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GamesStore from "@/store/game/game.store";
import StorageStore from "@/store/storage/storage.store";
import TagsStore from "@/store/tags/storage.store";


export class RootStore {
  gamesStore: GamesStore;
  storageStore: StorageStore;
  tagsStore: TagsStore;

  constructor() {
    this.gamesStore = new GamesStore();
    this.storageStore = new StorageStore();
    this.tagsStore = new TagsStore();
  }
}

export const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore, {
  storage: AsyncStorage,
})

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = () => useContext(StoreContext);