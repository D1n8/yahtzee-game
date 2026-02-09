import type { GameGroup } from "./types"

export class Player {
  public name: string
  private group: GameGroup = [
    { isSelected: false, value: 0 },
    { isSelected: false, value: 0 },
    { isSelected: false, value: 0 },
    { isSelected: false, value: 0 },
    { isSelected: false, value: 0 },
  ]
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

  setGroup(group: GameGroup) {
    this.group = group
  }
}