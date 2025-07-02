import React from 'react';
import {observer} from "mobx-react-lite";
import {StyleSheet, View} from "react-native";
import {useStore} from "@/store";
import {useSQLiteContext} from "expo-sqlite";
import HorizontalFilter from "@/components/ui/utils/horizontal-filter/horizontal-filter";
import {router} from "expo-router";
import useTags from "@/backend/domain/tags/use-tags";
import {Tag} from "@/types/tag.type";

const ItemTagsFilter = observer(() => {
  const db = useSQLiteContext();
  const {tagsStore} = useStore();
  useTags(db);

  const {selectedItemTags} = tagsStore

  const getKey = (item: Tag) => item.tagId

  const onSelect = (tag: Tag) => {
    let tags: Tag[];

    if (!tagsStore.selectedItemTags?.find((t) => t.tagId === tag.tagId)) {
      tags = tagsStore.selectedItemTags ? [...tagsStore.selectedItemTags, tag] : [tag];
    } else {
      tags = tagsStore.selectedItemTags?.filter((t) => t.tagId !== tag.tagId);
    }

    tagsStore.setSelectedItemsTags(tags)
  }

  const onSelectAll = () => {
    tagsStore.setSelectedItemsTags([]);
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
    tagsStore.setTagForUpdateOrCreate({tagId: 0, title: "", entity: "item", gameId: 0})
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
        selected={selectedItemTags}
        list={tagsStore.itemsTags}
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

export default ItemTagsFilter;