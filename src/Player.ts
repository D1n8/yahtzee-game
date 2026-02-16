import type { GameGroup } from "./types"

export class Player {
  public name: string
  private group: GameGroup = {
    'first': { isSelected: false, value: 0 },
    'second': { isSelected: false, value: 0 },
    'third': { isSelected: false, value: 0 },
    'fourth': { isSelected: false, value: 0 },
    'fifth': { isSelected: false, value: 0 }
  }
  private score: number = 0

  constructor(name: string) {
    this.name = name
  }

  getScore() {
    return this.score
  }

  setScore(value: number) {
    this.score += value
  }

  getGroup() {
    return this.group
  }

  getGameNumber(key: keyof GameGroup) {
    return this.group[key]
  }

  setGroup(group: GameGroup) {
    this.group = group
  }

  updateGroup(key: keyof GameGroup, value: Partial<GameGroup[keyof GameGroup]>) {
    this.group = {
      ...this.group,
      [key]: {
        ...this.group[key],
        ...value
      }
    }
  }
}