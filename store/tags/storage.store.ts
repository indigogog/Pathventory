import {action, makeObservable, observable} from 'mobx';
import {Tag} from "@/types/tag.type";

export default class TagsStore {
  selectedItemTags: Tag[] = [];
  selectedRecipeTags: Tag[] = [];
  itemsTags: Tag[] = [];
  recipesTags: Tag[] = [];
  tagForUpdateOrCreate: Tag | null = null;

  constructor() {
    makeObservable(this, {
      selectedItemTags: observable,
      tagForUpdateOrCreate: observable,
      selectedRecipeTags: observable,
      itemsTags: observable,
      setItemsTags: action,
      setRecipesTags: action,
      setSelectedItemsTags: action,
      setSelectedRecipeTags: action,
      recipesTags: observable,
    });
  }

  setItemsTags(tags: Tag[]) {
    this.itemsTags = tags;
  }

  setRecipesTags(tags: Tag[]) {
    this.recipesTags = tags;
  }

  setTagForUpdateOrCreate(tag: Tag | null) {
    this.tagForUpdateOrCreate = tag;
  }

  setSelectedItemsTags(tags: Tag[]) {
    this.selectedItemTags = tags;
  }

  setSelectedRecipeTags(tags: Tag[]) {
    this.selectedRecipeTags = tags;
  }
}