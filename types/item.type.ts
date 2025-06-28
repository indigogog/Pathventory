import {Group} from "@/types/group.type";

export type ItemGroupWithCount = Group & {count: number}
export type Item = {
  gameId: number;
  groups: ItemGroupWithCount[];
  itemId: number;
  name: string;
  description: string;
}

export type ItemListElement = Pick<Item, "name" | "itemId"> & {count: number};