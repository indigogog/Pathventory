import {action, makeObservable, observable} from 'mobx';
import {Group} from "@/types/group.type";

export default class GroupStore {
  selectedGroup: Group | null = null;
  groups: Group[] = [];

  constructor() {
    makeObservable(this, {selectedGroup: observable, groups: observable, setGroups: action, setSelectedGroup: action});
  }

  setGroups(groups: Group[]) {
    this.groups = groups;
  }

  setSelectedGroup(selectedGroup: Group | null) {
    this.selectedGroup = selectedGroup;
  }
}