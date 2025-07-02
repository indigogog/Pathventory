import React from 'react';
import {observer} from "mobx-react-lite";
import {StyleSheet, View} from "react-native";
import {useStore} from "@/store";
import {useSQLiteContext} from "expo-sqlite";
import HorizontalFilter from "@/components/ui/utils/horizontal-filter/horizontal-filter";
import {router} from "expo-router";
import useTags from "@/backend/domain/tags/use-tags";
import {Tag} from "@/types/tag.type";

const RecipesTagsFilter = observer(() => {
  const db = useSQLiteContext();
  const {tagsStore} = useStore();
  useTags(db);

  const {selectedRecipeTags} = tagsStore

  const getKey = (item: Tag) => item.tagId

  const onSelect = (tag: Tag) => {
    let tags: Tag[];

    if (!tagsStore.selectedRecipeTags?.find((t) => t.tagId === tag.tagId)) {
      tags = tagsStore.selectedRecipeTags ? [...tagsStore.selectedRecipeTags, tag] : [tag];
    } else {
      tags = tagsStore.selectedRecipeTags?.filter((t) => t.tagId !== tag.tagId);
    }

    tagsStore.setSelectedRecipeTags(tags)
  }

  const onSelectAll = () => {
    tagsStore.setSelectedRecipeTags([]);
  }

  const onUpdate = (item: Tag) => {
    if (item.tagId) {
      tagsStore.setTagForUpdateOrCreate(item)
      router.push({
        pathname: "/tags/update",
      })
    }
  }

  const onCreate = () => {
    tagsStore.setTagForUpdateOrCreate({tagId: 0, title: "", entity: "recipe", gameId: 0})
    router.push({
      pathname: "/tags/create",
    })
  }

  return (
    <View style={styles.container}>
      <HorizontalFilter<Tag>
        onSelectAll={onSelectAll}
        onSelect={onSelect}
        onUpdate={onUpdate}
        onCreate={onCreate}
        getKey={getKey}
        selected={selectedRecipeTags}
        list={tagsStore.recipesTags}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40
  },
})

export default RecipesTagsFilter;