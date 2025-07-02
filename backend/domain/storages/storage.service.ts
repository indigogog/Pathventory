import {SQLiteDatabase} from "expo-sqlite";
import {Storage} from "@/types/storage.type";

export class StorageService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    console.log('StorageService initialized.');
    this.db = db;
  }

  public async getAllStorages(gameId: number): Promise<Storage[]> {
    return await this.db.getAllAsync<Storage>(`
      SELECT 
        s.title, 
        s.game_id AS "gameId",
        s.storage_id AS "storageId"
      FROM storages s
      WHERE s.game_id = ${gameId}
      `
    );
  }

  public async createStorage({title, gameId}: Omit<Storage, "storageId">): Promise<void> {
    await this.db.execAsync(`
        INSERT INTO storages(title, game_id)
        VALUES ('${title}', ${gameId})
    `);
  }

  public async updateStorage({storageId, title}: Storage): Promise<void> {
    await this.db.execAsync(`
        UPDATE storages
        SET title = '${title}'
        WHERE storage_id = ${storageId}
    `)
  }
}