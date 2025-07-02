import React from 'react';
import {observer} from "mobx-react-lite";
import {StyleSheet, View} from "react-native";
import {useStore} from "@/store";
import {useSQLiteContext} from "expo-sqlite";
import useStorages from "@/backend/domain/storages/use-storages";
import HorizontalFilter from "@/components/ui/utils/horizontal-filter/horizontal-filter";
import {Storage} from "@/types/storage.type";
import {router} from "expo-router";

const StorageFilter = observer(() => {
  const db = useSQLiteContext();
  const {storageStore} = useStore();
  useStorages(db);

  const {selectedStorage} = storageStore

  const getKey = (item: Storage) => item.storageId

  const onSelect = (item: Storage) => {
    storageStore.setSelectedStorage(item)
  }
  const onUpdate = (item: Storage) => {
    if (item.storageId) {
      storageStore.setSelectedStorage(item as Storage)
      router.push({
        pathname: "/storages/update",
      })
    }
  }
  const onCreate = () => {
    storageStore.setSelectedStorage(null)
    router.push({
      pathname: "/storages/create",
    })
  }
  const onSelectAll = () => {
    storageStore.setSelectedStorage(null)
  }

  return (
    <View style={styles.container}>
      <HorizontalFilter<Storage>
        onSelectAll={onSelectAll}
        onSelect={onSelect}
        onUpdate={onUpdate}
        onCreate={onCreate}
        getKey={getKey}
        selected={selectedStorage ? [selectedStorage] : []}
        list={storageStore.storages}
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

export default StorageFilter;