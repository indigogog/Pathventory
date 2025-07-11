import {SQLiteDatabase} from "expo-sqlite";

export default class CreateStorageTable {
  async up(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS "storages" (
        storage_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        game_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        UNIQUE (title, game_id),
        FOREIGN KEY (game_id)
          REFERENCES games(game_id)
          ON DELETE CASCADE
      ); 
    `)
  }

  async down(db: SQLiteDatabase): Promise<void> {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS "storages"; 
    `)
  }
}