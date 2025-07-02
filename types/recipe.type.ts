import {Storage} from "@/types/storage.type";

export type RecipeListElement = Pick<Recipe, "recipeId" | "name"> & { available: boolean }
export type Recipe = {
  gameId: number;
  groups: Storage[];
  recipeId: number;
  name: string;
  description: string;
}