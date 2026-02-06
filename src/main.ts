import { Сombinations } from './Combinations'
import { Player } from './Player'
import './style.css'
import type { GameGroup } from './types'

function getRandom() {
  return Math.floor(Math.random() * 6) + 1
}

function generateGroup(group: GameGroup) {
  for (let gameNum of group) {
    if (!gameNum.isSelected) {
      gameNum.value = getRandom()
    }
  }

  return group
}

const player1 = new Player('qwe')
const player2 = new Player('asd')
const combinations = new Сombinations()

const gameGroup: GameGroup = [
  {
    isSelected: false,
    value: 2
  },
  {
    isSelected: true,
    value: 1
  },
  {
    isSelected: true,
    value: 1
  },
  {
    isSelected: false,
    value: 2
  },
  {
    isSelected: false,
    value: 4
  }
]

console.log(generateGroup(gameGroup))
console.log(combinations.callLargeStraight([2, 4, 6, 5, 3]))


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   
  </div>
`

