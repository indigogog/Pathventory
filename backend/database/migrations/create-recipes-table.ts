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
        item_id INTEGER NOT NULL,
        FOREIGN KEY (game_id)
          REFERENCES games(game_id)
          ON DELETE CASCADE,
        FOREIGN KEY (item_id)
          REFERENCES items(item_id)
          ON DELETE CASCADE
      ); 
    `)

    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "recipes_tags" (
        tag_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        game_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        UNIQUE (title, game_id),
        FOREIGN KEY (game_id)
          REFERENCES games(game_id)
          ON DELETE CASCADE
        );
    `)

    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "recipes_j_tags" (
        recipe_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (tag_id, recipe_id),
        UNIQUE (tag_id, recipe_id),
        FOREIGN KEY (tag_id)
          REFERENCES recipes_tags(tag_id)
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
      DROP TABLE IF EXISTS "recipes_j_tags"; 
      DROP TABLE IF EXISTS "recipes_j_items"; 
      DROP TABLE IF EXISTS "recipes"; 
      DROP TABLE IF EXISTS "recipes_tags"; 
    `)
  }
}