import {SQLiteDatabase} from "expo-sqlite";

export default class CreateItemsTable {
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "items" (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        UNIQUE (name, game_id),
        FOREIGN KEY (game_id)
          REFERENCES games(game_id)
          ON DELETE CASCADE
      ); 
    `)

    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "items_j_storages" (
        item_id INTEGER NOT NULL,
        storage_id INTEGER NOT NULL,
        items_count INTEGER NOT NULL,
        PRIMARY KEY (storage_id, item_id),
        UNIQUE (storage_id, item_id),
        FOREIGN KEY (storage_id)
          REFERENCES storages(storage_id)
          ON DELETE CASCADE,
        FOREIGN KEY (item_id)
          REFERENCES items(item_id)
          ON DELETE CASCADE
      ); 
    `)
  }

  async down(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS "items_j_storages"; 
      DROP TABLE IF EXISTS "items"; 
    `)
  }
}