import {Storage} from "@/types/storage.type";

export type ItemStorageWithCount = Storage & {count: number}
export type Item = {
  gameId: number;
  storages: ItemStorageWithCount[];
  itemId: number;
  name: string;
  description: string;
}

export type ItemListElement = Pick<Item, "name" | "itemId"> & {count: number};