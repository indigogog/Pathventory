import {action, makeObservable, observable} from 'mobx';
import {Storage} from "@/types/storage.type";

export default class StorageStore {
  selectedStorage: Storage | null = null;
  storages: Storage[] = [];

  constructor() {
    makeObservable(this, {selectedStorage: observable, storages: observable, setStorages: action, setSelectedStorage: action});
  }

  setStorages(storages: Storage[]) {
    this.storages = storages;
  }

  setSelectedStorage(selectedStorage: Storage | null) {
    this.selectedStorage = selectedStorage;
  }
}