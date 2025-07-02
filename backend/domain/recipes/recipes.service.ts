import {SQLiteDatabase} from "expo-sqlite";
import {RecipeListElement} from "@/types/recipe.type";

export class RecipesService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    console.log('RecipesService initialized.');
    this.db = db;
  }

  // private async getIngredients(gameId: number, groupId?: number) {
  //
  // }

  // public async getRecipesByGroup(gameId: number, groupId?: number, ): Promise<RecipeListElement[]> {
  //   const recipes = await this.db.getAllAsync<RecipeListElement>(`
  //     SELECT
  //       r.recipe_id AS "recipeId",
  //       r.name
  //     FROM recipes r
  //     JOIN recipes_j_groups rjg USING(item_id)
  //     WHERE r.game_id = $gameId
  //     AND CASE WHEN $groupId IS NOT NULL THEN rjg.group_id = $groupId ELSE TRUE END
  //     `
  //     , {$groupId: groupId ?? 0, $gameId: gameId});
  // }
}