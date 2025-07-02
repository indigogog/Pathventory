import {SQLiteDatabase} from "expo-sqlite";
import {RecipeListElement} from "@/types/recipe.type";
import {ItemListElement} from "@/types/item.type";

export class RecipesService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    console.log('RecipesService initialized.');
    this.db = db;
  }

  private async getItems(gameId: number, storageId: number) {
    return await this.db.getAllAsync<ItemListElement>(`
      SELECT
        i.item_id AS "itemId", 
        i.name,
        CASE WHEN $storageId = 0 THEN SUM(ijs.items_count) ELSE ijg.items_count END AS "count"
      FROM items i
      JOIN items_j_storages ijs USING(item_id)
      WHERE i.game_id = $gameId
      AND CASE WHEN $storageId IS NOT NULL THEN ijs.storage_id = $storageId ELSE TRUE END
      `
      , {$storageId: storageId ?? 0, $gameId: gameId});
  }

  public async getRecipes(gameId: number, storageId: number, tagsIds?: number[] ): Promise<RecipeListElement[]> {
    const recipes = await this.db.getAllAsync<RecipeListElement>(`
      SELECT
        r.recipe_id AS "recipeId",
        r.name
      FROM recipes r
      JOIN recipes_j_tags rjt USING(recipe_id)
      WHERE r.game_id = $gameId
      AND CASE WHEN ${tagsIds} IS NOT NULL THEN rjt.tag_id = ANY(${tagsIds}) ELSE TRUE END
      `
      , {$gameId: gameId});

    return recipes;
  }
}