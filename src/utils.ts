import type { GameGroup } from "./types"

export function getArrSum(arr: number[]) {
  return arr.reduce((acc, curr) => {
    return acc + curr
  }, 0)
}

export function getRandom() {
  return Math.floor(Math.random() * 6) + 1
}

export function generateGroup(group: GameGroup) {
  for (let [key, value] of Object.entries(group)) {
    if (!value.isSelected) {
      value.value = getRandom()
    }
  }

  return group
}