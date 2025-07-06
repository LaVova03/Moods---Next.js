import { makeAutoObservable } from "mobx";
import { Mood } from "@/types";

class MainStore {
  moods: Mood[] = [];
  isMobile: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMoods(moods: Mood[]) {
    this.moods = [...moods];
  }

  addMood(mood: Mood) {
    this.moods = [...this.moods, mood];
  }

  addAllMoods(moods: Mood[]) {
    this.moods = moods;
  }

  deleteMood(id: number) {
    this.moods = this.moods.filter((el) => el.id !== id);
  }

  deleteAllMoods() {
    this.moods = [];
  }

  setIsMobile(value: boolean) {
    this.isMobile = value;
  }
}

export const mainStore = new MainStore();
