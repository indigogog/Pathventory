export type Tag = {
  tagId: number;
  gameId: number;
  title: string;
  entity: "item" | "recipe";
}

export type TagRecord = Omit<Tag, "entity"> & {}