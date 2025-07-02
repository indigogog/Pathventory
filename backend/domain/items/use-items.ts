import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect, useState} from "react";
import {ItemsService} from "@/backend/domain/items/items.service";
import {Item, ItemListElement} from "@/types/item.type";

let globalService: ItemsService | null = null;

const getItemsService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new ItemsService(db);
  }
  return globalService;
};

export default function useItems(db: SQLiteDatabase, gameId: number, storageId?: number,) {
  const [items, setItems] = useState<ItemListElement[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [refetch, setRefetch] = useState(true);

  const service = getItemsService(db);

  const selectItem = useCallback(async (itemId: number) => {
    const itemFromDb = await service.getItemById(itemId, gameId);
    setSelectedItem(itemFromDb);
  }, [storageId, gameId]);

  const createItem = useCallback(async (item: Omit<Item, "itemId">) => {
    await service.createItem(item);

    setRefetch(true);
  }, [])

  const updateItem = useCallback(async (item: Item) => {
    await service.updateItem(item);

    setRefetch(true);
  }, [])

  useEffect(() => {
    async function fetchItems() {
      const itemsFromDb = await service.getAllItems(gameId, storageId);

      setItems(itemsFromDb);
      setRefetch(false);
    }

    if (refetch) {
      fetchItems();

      if (selectedItem) {
        selectItem(selectedItem.itemId)
      }
    }
  }, [refetch, storageId, selectedItem])

  useEffect(() => {
    setRefetch(true);
  }, [gameId, storageId]);

  return {
    items,
    createItem,
    updateItem,
    selectItem,
    selectedItem
  }
}