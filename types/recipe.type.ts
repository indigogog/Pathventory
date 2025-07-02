import {Tag} from "@/types/tag.type";

export type RecipeListElement = Pick<Recipe, "recipeId" | "name"> & { available: boolean }
export type Recipe = {
  gameId: number;
  tags: Tag[];
  recipeId: number;
  name: string;
  description: string;
}