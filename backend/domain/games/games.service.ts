import { Game } from "@/types/game.type";
import { SQLiteDatabase } from "expo-sqlite";

export class GamesService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
    console.log('GamesService initialized.');
  }

  public async getAllGames(): Promise<Game[]> {
    return await this.db.getAllAsync<Game>(`
      SELECT 
        g.title, 
        g.character,
        g.game_id AS "gameId" 
      FROM games g`
    );
  }

  public async getGameById(id: number): Promise<Game[]> {
    return await this.db.getAllAsync<Game>(`
      SELECT 
        g.title, 
        g.character,
        g.game_id AS "gameId" 
      FROM games g
      WHERE g.game_id = ${id}`
    );
  }

  public async createGame({title, character}: Omit<Game, "gameId">): Promise<void> {
    await this.db.execAsync(`
      INSERT INTO games(title, character)
        VALUES ('${title}', '${character}')
    `);
  }

  public async updateGame({gameId, title, character}: Game): Promise<void> {
    await this.db.execAsync(`
      UPDATE games 
       SET 
        title = '${title}',
        character = '${character}'
      WHERE game_id = ${gameId}
    `)
  }
}