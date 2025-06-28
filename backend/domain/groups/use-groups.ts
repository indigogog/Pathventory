import {SQLiteDatabase} from "expo-sqlite";
import {useCallback, useEffect, useState} from "react";
import {GroupsService} from "@/backend/domain/groups/groups.service";
import {Group} from "@/types/group.type";

let globalService: GroupsService | null = null;

const getGroupsService = (db: SQLiteDatabase) => {
  if (!globalService) {
    globalService = new GroupsService(db);
  }
  return globalService;
};

export default function useGroups(db: SQLiteDatabase, gameId: number) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [refetch, setRefetch] = useState(true);

  const service = getGroupsService(db);

  const createGroup = useCallback(async (group: Omit<Group, "groupId">) => {
    await service.createGroup(group);

    setRefetch(true);
  }, [])

  const updateGroup = useCallback(async (group: Group) => {
    await service.updateGroup(group);

    setRefetch(true);
  }, [])

  useEffect(() => {
    async function fetchGames() {
      const groupsFromDb = await service.getAllGroups(gameId);

      setGroups(groupsFromDb);
      setRefetch(false);
    }

    if (refetch) {
      fetchGames();
    }
  }, [refetch])

  useEffect(() => {
    setRefetch(true);
  }, [gameId]);

  return {
    groups,
    updateGroup,
    createGroup,
  }
}