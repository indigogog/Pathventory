import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect} from "react";
import {GroupsService} from "@/backend/domain/groups/groups.service";
import {Group} from "@/types/group.type";
import {useStore} from "@/store";
import {autorun} from "mobx";

let globalService: GroupsService | null = null;

const getGroupsService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new GroupsService(db);
  }
  return globalService;
};

export default function useGroups(db: SQLiteDatabase) {
  const {groupStore, gamesStore: {selectedGame}} = useStore();

  const service = getGroupsService(db);

  async function fetchGroups() {
    if (!selectedGame) {
      return;
    }

    const groupsFromDb = await service.getAllGroups(selectedGame.gameId);

    autorun(() => groupStore.setGroups(groupsFromDb));
  }

  const createGroup = useCallback(async (group: Omit<Group, "groupId">) => {
    await service.createGroup(group);

    fetchGroups();
  }, [])

  const updateGroup = useCallback(async (group: Group) => {
    await service.updateGroup(group);

    fetchGroups();
  }, [])
  useEffect(() => {
    fetchGroups()
  }, [selectedGame])

  return {
    updateGroup,
    createGroup,
    fetchGroups
  }
}