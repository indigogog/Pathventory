import {SQLiteDatabase} from "expo-sqlite";

export default class CreateGameTable {
  public async up(db: SQLiteDatabase) {
    const sql: string = `
      PRAGMA journal_mode = 'wal';
      CREATE TABLE games (game_id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, character TEXT NOT NULL);
    `;

    await db.execAsync(sql)
  }

  public async down(db: SQLiteDatabase) {
    const sql: string = `
      PRAGMA journal_mode = 'wal';
      DROP TABLE games;
    `;

    await db.execAsync(sql)
  }
}