import type { GameGroup, Group } from "./types"

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
  private numsScore: number = 0
  private isMove: boolean = false

  constructor(name: string, isMove: boolean) {
    this.name = name
    this.isMove = isMove
  }

  getIsMove() {
    return this.isMove
  }

  setIsMove(value: boolean){
    this.isMove = value
  }

  getScore() {
    return this.score
  }

  setScore(value: number) {
    this.score += value
  }

  getNumsScore() {
    return this.numsScore
  }

  setNumsScore(value: number) {
    return this.numsScore += value
  } 

  getGroup() {
    return this.group
  }

  getGroupValues() {
    return Object.values(this.group).map(item => item.value) as Group
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

  resetGroup() {
    this.setGroup({
      'first': { isSelected: false, value: 0 },
      'second': { isSelected: false, value: 0 },
      'third': { isSelected: false, value: 0 },
      'fourth': { isSelected: false, value: 0 },
      'fifth': { isSelected: false, value: 0 }
    })
  }
}