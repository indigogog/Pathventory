import {SQLiteDatabase} from "expo-sqlite";
import {Group} from "@/app/shared/types/group.type";

export class GroupsService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    console.log('GroupsService initialized.');
    this.db = db;
  }

  public async getAllGroups(gameId: number): Promise<Group[]> {
    return await this.db.getAllAsync<Group>(`
      SELECT 
        g.title, 
        g.game_id AS "gameId",
        g.group_id AS "groupId"
      FROM groups g
      WHERE g.game_id = ${gameId}
      `
    );
  }

  public async createGroup({title, gameId}: Omit<Group, "groupId">): Promise<void> {
    await this.db.execAsync(`
        INSERT INTO groups(title, game_id)
        VALUES ('${title}', ${gameId})
    `);
  }

  public async updateGroup({groupId, title}: Group): Promise<void> {
    await this.db.execAsync(`
        UPDATE groups
        SET title = '${title}'
        WHERE group_id = ${groupId}
    `)
  }
}