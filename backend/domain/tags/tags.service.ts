import {SQLiteDatabase} from "expo-sqlite";
import {Tag, TagRecord} from "@/types/tag.type";

export class TagsService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    console.log('TagsService initialized.');
    this.db = db;
  }

  public async getAllItemTags(gameId: number): Promise<TagRecord[]> {
    return await this.db.getAllAsync<Tag>(`
      SELECT 
        t.title, 
        t.game_id AS "gameId",
        t.tag_id AS "tagId"
      FROM item_tags t
      WHERE t.game_id = ${gameId}
      `
    );
  }

  public async createItemTag({title, gameId}: Omit<Tag, "tagId" | "entity">): Promise<void> {
    await this.db.execAsync(`
        INSERT INTO item_tags(title, game_id)
        VALUES ('${title}', ${gameId})
    `);
  }

  public async updateItemTag({tagId, title}: Omit<Tag, "entity">): Promise<void> {
    await this.db.execAsync(`
        UPDATE item_tags
        SET title = '${title}'
        WHERE tag_id = ${tagId}
    `)
  }

  public async getAllRecipeTags(gameId: number): Promise<TagRecord[]> {
    return await this.db.getAllAsync<Tag>(`
      SELECT 
        t.title, 
        t.game_id AS "gameId",
        t.tag_id AS "tagId"
      FROM recipes_tags t
      WHERE t.game_id = ${gameId}
      `
    );
  }

  public async createRecipeTag({title, gameId}: Omit<Tag, "tagId" | "entity">): Promise<void> {
    await this.db.execAsync(`
        INSERT INTO recipes_tags(title, game_id)
        VALUES ('${title}', ${gameId})
    `);
  }

  public async updateRecipeTag({tagId, title}: Omit<Tag, "entity">): Promise<void> {
    await this.db.execAsync(`
        UPDATE recipes_tags
        SET title = '${title}'
        WHERE tag_id = ${tagId}
    `)
  }
}