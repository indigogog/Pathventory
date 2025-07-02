import {SQLiteDatabase} from "expo-sqlite";

export class CreateTagsTable {
  async up(db: SQLiteDatabase) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "item_tags" (
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
      CREATE TABLE IF NOT EXISTS "items_j_tags" (
        tag_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        PRIMARY KEY (tag_id, item_id),
        FOREIGN KEY (tag_id)
          REFERENCES item_tags(tag_id)
          ON DELETE CASCADE,
        FOREIGN KEY (item_id)
          REFERENCES items(item_id)
          ON DELETE CASCADE
      );
    `)
  }

  async down(db: SQLiteDatabase) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS "item_tags";
      DROP TABLE IF EXISTS "items_j_tags";
    `)
  }
}