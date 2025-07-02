import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect} from "react";
import {Storage} from "@/types/storage.type";
import {useStore} from "@/store";
import {autorun} from "mobx";
import {StorageService} from "@/backend/domain/storages/storage.service";

let globalService: StorageService | null = null;

const getStorageService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new StorageService(db);
  }
  return globalService;
};

export default function useStorages(db: SQLiteDatabase) {
  const {storageStore, gamesStore: {selectedGame}} = useStore();

  const service = getStorageService(db);

  async function fetchStorages() {
    if (!selectedGame) {
      return;
    }

    const storagesFromDb = await service.getAllStorages(selectedGame.gameId);

    autorun(() => storageStore.setStorages(storagesFromDb));
  }

  const createStorage = useCallback(async (storage: Omit<Storage, "storageId">) => {
    await service.createStorage(storage);

    fetchStorages();
  }, [])

  const updateStorage = useCallback(async (storage: Storage) => {
    await service.updateStorage(storage);

    fetchStorages();
  }, [])

  useEffect(() => {
    fetchStorages()
  }, [selectedGame])

  return {
    updateStorage,
    createStorage,
  }
}