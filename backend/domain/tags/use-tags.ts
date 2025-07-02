import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect} from "react";
import {useStore} from "@/store";
import {autorun} from "mobx";
import {TagsService} from "@/backend/domain/tags/tags.service";
import {Tag} from "@/types/tag.type";

let globalService: TagsService | null = null;

const getTagsService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new TagsService(db);
  }
  return globalService;
};

export default function useTags(db: SQLiteDatabase) {
  const {tagsStore, gamesStore: {selectedGame}} = useStore();

  const service = getTagsService(db);

  async function fetchTags() {
    if (!selectedGame) {
      return;
    }

    const itemsTagsFromDb = await service.getAllItemTags(selectedGame.gameId);
    const recipeTagsFromDb = await service.getAllRecipeTags(selectedGame.gameId);

    autorun(() => tagsStore.setItemsTags(itemsTagsFromDb.map(i => ({...i, entity: "item"}))));
    autorun(() => tagsStore.setRecipesTags(recipeTagsFromDb.map(i => ({...i, entity: "recipe"}))));
  }

  const updateTag = useCallback(async (tag: Tag) => {
    if (tag.entity === "item") {
      await service.updateItemTag(tag);
    } else {
      await service.updateRecipeTag(tag);
    }

    fetchTags();
  }, [])

  const createTag = useCallback(async (tag: Omit<Tag, "tagId">) => {
    if (tag.entity === "item") {
      await service.createItemTag(tag);
    } else {
      await service.createRecipeTag(tag);
    }

    fetchTags();
  }, [])

  useEffect(() => {
    fetchTags()
  }, [selectedGame])

  return {
    updateTag,
    createTag
  }
}