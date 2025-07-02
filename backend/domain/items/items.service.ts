import {SQLiteDatabase} from "expo-sqlite";
import {Item, ItemStorageWithCount, ItemListElement} from "@/types/item.type";

export class ItemsService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    console.log('ItemsService initialized.');
    this.db = db;
  }

  private async getItemStorages(itemId: number, gameId: number): Promise<ItemStorageWithCount[]> {
    return await this.db.getAllAsync<ItemStorageWithCount>(`
      SELECT 
        s.title, 
        s.game_id AS "gameId",
        s.storage_id AS "storageId",
        ijs.items_count AS "itemCount"
      FROM storages g
      JOIN items_j_storages ijs USING(storage_id)
      WHERE ijs.item_id = ${itemId} AND s.game_id = ${gameId};
    `);
  }

  public async getAllItems(gameId: number, storageId?: number): Promise<ItemListElement[]> {
    return await this.db.getAllAsync<ItemListElement>(`
      SELECT
        i.item_id AS "itemId", 
        i.name,
        CASE WHEN $storageId = 0 THEN SUM(ijs.items_count) ELSE ijg.items_count END AS "count"
      FROM items i
      JOIN items_j_storages ijs USING(item_id)
      WHERE i.game_id = $gameId
      AND CASE WHEN $storageId IS NOT NULL THEN ijs.storage_id = $storageId ELSE TRUE END
      `
      , {$storageId: storageId ?? 0, $gameId: gameId});
  }

  public async getItemById(id: number, gameId: number): Promise<Item> {
    const item = await this.db.getFirstAsync<Item>(`
      SELECT 
        i.item_id AS "itemId", 
        i.name,
        i.game_id AS "gameId",
        i.description
      FROM items i 
      WHERE i.game_id = ${gameId} AND i.item_id = ${id};  
    `)

    if (!item) {
      throw new Error(`Item with id ${id} and game_id ${gameId} not found`);
    }

    item.storages = await this.getItemStorages(id, gameId);

    return item;
  }

  public async createItem({storages, name, description, gameId}: Omit<Item, "itemId">): Promise<void> {
    const {lastInsertRowId} = await this.db.runAsync(`
        INSERT INTO items(name, game_id, description)
        VALUES ('${name}', ${gameId}, '${description}')
    `);

    for (const storage of storages) {
      await this.db.execAsync(`
      INSERT INTO items_j_storages (item_id, storage_id, items_count)
      VALUES ('${lastInsertRowId}', ${storage.gameId}, '${storage.count}')
      `)
    }
  }

  // public async updateItemStorages({itemId, gameId, storages}: Item): Promise<void> {
  //   const oldStorages = await this.getItemStorages(itemId, gameId);
  //
  //   const storagesForDeleting: ItemStorageWithCount[] = [];
  //   const storagesForCountChanging: ItemStorageWithCount[] = [];
  //   const storagesForAdding: ItemStorageWithCount[] = [];
  //
  //   oldStorages.forEach((oldStorage) => {
  //     const find = storages.find((g) => g.storageId === oldStorage.storageId);
  //
  //     if (!find) {
  //       storagesForDeleting.push(oldStorage);
  //       return;
  //     }
  //
  //     if (find.count !== oldStorage.count) {
  //       storagesForCountChanging.push(find);
  //     }
  //   })
  //
  //   storages.forEach((storage) => {
  //     if (!oldStorages.find((g) => g.storageId === storage.storageId)) {
  //       storagesForAdding.push(storage);
  //     }
  //   })
  //
  //   for (const {storageId, count} of storagesForAdding) {
  //     await this.db.execAsync(`
  //       INSERT INTO items_j_storages (storage_id, item_id, items_count)
  //       VALUES (${storageId}, ${itemId}, ${count});
  //     `)
  //   }
  //
  //   for (const {storageId, count} of storagesForCountChanging) {
  //     await this.db.execAsync(`
  //         UPDATE items_j_storages
  //         SET items_count = ${count}
  //         WHERE storage_id = ${storageId}
  //           AND item_id = ${itemId}
  //     `)
  //   }
  //
  //   for (const {storageId} of storagesForDeleting) {
  //     await this.db.execAsync(`
  //         DELETE FROM items_j_groups
  //         WHERE storage_id = ${storageId}
  //           AND item_id = ${itemId}
  //     `)
  //   }
  // }

  public async updateItem({itemId, name, description, gameId}:Item) {
    await this.db.execAsync(`
      UPDATE items
      SET name = ${name}, description = ${description}
      WHERE item_id = ${itemId} AND game_id = ${gameId};
      `)
  }
}