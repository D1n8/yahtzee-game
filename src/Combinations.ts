import type { Group } from "./types"
import { getArrSum } from "./utils"

export class Сombinations {
  callNums(group: Group, num: number) {
    return group.reduce((acc, curr) => {
      return acc += curr === num ? curr : 0
    }, 0)
  }

  callChance(group: Group) {
    return group.reduce((acc, curr) => {
      return acc + curr
    }, 0)
  }

  callNumsOfKind(group: Group, num: number) {
    for (let i = 0; i < group.length; i++) {
      let counter = 0
      let nums = []
      for (let j = 0; j < group.length; j++) {
        if (group[i] === group[j]) {
          counter++
          nums.push(group[i])
          if (counter === num) {
            return getArrSum(nums)
          }
        }
      }
    }
    return 0
  }

  callFullHouse(group: Group) {
    let heap1: number[] = []
    let heap2: number[] = []
    for (let i = 0; i < group.length; i++) {
      if (heap1.length === 0 || heap1.includes(group[i])) {
        heap1.push(group[i])
      } else if (heap2.length === 0 || heap2.includes(group[i])) {
        heap2.push(group[i])
      } else {
        return 0
      }
    }
    if ((heap1.length === 2 && heap2.length === 3) || (heap1.length === 3 && heap2.length === 2)) {
      return 25
    }
    return 0
  }

  callSmallStraight(group: Group) {
    const set = new Set(group)
    if (set.size < 4) {
      return 0
    }

    let uniqueSortedGroup: number[] = Array.from(set).sort((a, b) => a - b)

    if (((uniqueSortedGroup[0] + 1) === uniqueSortedGroup[1] && (uniqueSortedGroup[1] + 1) === uniqueSortedGroup[2] && (uniqueSortedGroup[2] + 1) === uniqueSortedGroup[3]) ||
      ((uniqueSortedGroup[1] + 1) === uniqueSortedGroup[2] && (uniqueSortedGroup[2] + 1) === uniqueSortedGroup[3] && (uniqueSortedGroup[3] + 1) === uniqueSortedGroup[4])
    ) {
      return 30
    }

    return 0
  }

  callLargeStraight(group: Group) {
    let sortedGroup: number[] = group.sort((a, b) => a - b)

    for (let i = 0; i < sortedGroup.length - 1; i++) {
      if ((sortedGroup[i] + 1) !== sortedGroup[i + 1]) {
        return 0
      }
    }

    return 40
  }

  callFiveOfKind(group: Group) {
    if (new Set(group).size === 1) {
      return 50
    }
    return 0
  }
}