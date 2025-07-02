import {SQLiteDatabase} from "expo-sqlite";

export default class CreateRecipesTable {
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "recipes" (
        recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        FOREIGN KEY (game_id)
          REFERENCES games(game_id)
          ON DELETE CASCADE
      ); 
    `)

    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "recipes_j_storages" (
        recipe_id INTEGER NOT NULL,
        storage_id INTEGER NOT NULL,
        PRIMARY KEY (storage_id, recipe_id),
        UNIQUE (storage_id, recipe_id),
        FOREIGN KEY (storage_id)
          REFERENCES storages(storage_id)
          ON DELETE CASCADE,
        FOREIGN KEY (recipe_id)
          REFERENCES recipes(recipe_id)
          ON DELETE CASCADE
      ); 
    `)

    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "recipes_j_items" (
        recipe_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        needed_count INTEGER NOT NULL,
        PRIMARY KEY (item_id, recipe_id),
        UNIQUE (item_id, recipe_id),
        FOREIGN KEY (item_id)
          REFERENCES items(item_id)
          ON DELETE CASCADE,
        FOREIGN KEY (recipe_id)
          REFERENCES recipes(recipe_id)
          ON DELETE CASCADE
      ); 
    `)
  }

  async down(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS "recipes"; 
      DROP TABLE IF EXISTS "recipes_j_storages"; 
      DROP TABLE IF EXISTS "recipes_j_items"; 
    `)
  }
}