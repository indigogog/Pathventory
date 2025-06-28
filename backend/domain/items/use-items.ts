import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect, useState} from "react";
import {ItemsService} from "@/backend/domain/items/items.service";
import {Item, ItemListElement} from "@/types/item.type";

let globalService: ItemsService | null = null;

const getGroupsService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new ItemsService(db);
  }
  return globalService;
};

export default function useItems(db: SQLiteDatabase, gameId: number, groupId?: number,) {
  const [items, setItems] = useState<ItemListElement[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [refetch, setRefetch] = useState(true);

  const service = getGroupsService(db);

  const selectItem = useCallback(async (itemId: number) => {
    const itemFromDb = await service.getItemById(itemId, gameId);
    setSelectedItem(itemFromDb);
  }, [groupId, gameId]);

  const createItem = useCallback(async (item: Omit<Item, "itemId">) => {
    await service.createItem(item);

    setRefetch(true);
  }, [])

  const updateItem = useCallback(async (item: Item) => {
    await service.updateItem(item);

    setRefetch(true);
  }, [])

  const updateItemGroups = useCallback(async (item: Item) => {
    await service.updateItemGroups(item);

    setRefetch(true);
  }, [])

  useEffect(() => {
    async function fetchItems() {
      const groupsFromDb = await service.getAllItems(gameId, groupId);

      setItems(groupsFromDb);
      setRefetch(false);
    }

    if (refetch) {
      fetchItems();

      if (selectedItem) {
        selectItem(selectedItem.itemId)
      }
    }
  }, [refetch, groupId, selectedItem])

  useEffect(() => {
    setRefetch(true);
  }, [gameId, groupId]);

  return {
    items,
    createItem,
    updateItem,
    updateItemGroups,
    selectItem,
    selectedItem
  }
}