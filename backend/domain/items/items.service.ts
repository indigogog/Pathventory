import {SQLiteDatabase} from "expo-sqlite";
import {Item, ItemGroupWithCount, ItemListElement} from "@/types/item.type";

export class ItemsService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    console.log('ItemsService initialized.');
    this.db = db;
  }

  private async getItemGroups(itemId: number, gameId: number): Promise<ItemGroupWithCount[]> {
    return await this.db.getAllAsync<ItemGroupWithCount>(`
      SELECT 
        g.title, 
        g.game_id AS "gameId",
        g.group_id AS "groupId",
        ijg.items_count AS "itemCount"
      FROM groups g
      JOIN items_j_groups ijg USING(group_id)
      WHERE ijg.item_id = ${itemId} AND g.game_id = ${gameId};
    `);
  }

  public async getAllItems(gameId: number, groupId?: number): Promise<ItemListElement[]> {
    return await this.db.getAllAsync<ItemListElement>(`
      SELECT
        i.item_id AS "itemId", 
        i.name,
        CASE WHEN $groupId = 0 THEN SUM(ijg.items_count) ELSE ijg.items_count END AS "count"
      FROM items i
      JOIN items_j_groups ijg USING(item_id)
      WHERE i.game_id = $gameId
      -- AND CASE WHEN $groupId IS NOT NULL THEN ijg.group_id = $groupId ELSE TRUE END
      `
      , {$groupId: groupId ?? 0, $gameId: gameId});
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

    item.groups = await this.getItemGroups(id, gameId);

    return item;
  }

  public async createItem({groups, name, description, gameId}: Omit<Item, "itemId">): Promise<void> {
    const {lastInsertRowId} = await this.db.runAsync(`
        INSERT INTO items(name, game_id, description)
        VALUES ('${name}', ${gameId}, '${description}')
    `);

    for (const group of groups) {
      await this.db.execAsync(`
      INSERT INTO items_j_groups (item_id, group_id, items_count)
      VALUES ('${lastInsertRowId}', ${group.gameId}, '${group.count}')
      `)
    }
  }

  public async updateItemGroups({itemId, gameId, groups}: Item): Promise<void> {
    const oldGroups = await this.getItemGroups(itemId, gameId);

    const groupsForDeleting: ItemGroupWithCount[] = [];
    const groupsForCountChanging: ItemGroupWithCount[] = [];
    const groupsForAdding: ItemGroupWithCount[] = [];

    oldGroups.forEach((oldGroup) => {
      const find = groups.find((g) => g.groupId === oldGroup.groupId);

      if (!find) {
        groupsForDeleting.push(oldGroup);
        return;
      }

      if (find.count !== oldGroup.count) {
        groupsForCountChanging.push(find);
      }
    })

    groups.forEach((group) => {
      if (!oldGroups.find((g) => g.groupId === group.groupId)) {
        groupsForAdding.push(group);
      }
    })

    for (const {groupId, count} of groupsForAdding) {
      await this.db.execAsync(`
        INSERT INTO items_j_groups (group_id, item_id, items_count)
        VALUES (${groupId}, ${itemId}, ${count});
      `)
    }

    for (const {groupId, count} of groupsForCountChanging) {
      await this.db.execAsync(`
          UPDATE items_j_groups
          SET items_count = ${count}
          WHERE group_id = ${groupId}
            AND item_id = ${itemId}
      `)
    }

    for (const {groupId} of groupsForDeleting) {
      await this.db.execAsync(`
          DELETE FROM items_j_groups
          WHERE group_id = ${groupId}
            AND item_id = ${itemId}
      `)
    }
  }

  public async updateItem({itemId, name, description, gameId}:Item) {
    await this.db.execAsync(`
      UPDATE items
      SET name = ${name}, description = ${description}
      WHERE item_id = ${itemId} AND game_id = ${gameId};
      `)
  }
}