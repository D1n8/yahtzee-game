import { Сombinations } from './Combinations'
import { Player } from './Player'
import './style.css'
import type { GameGroup } from './types'
import { generateGroup } from './utils'

const generateBtn = document.getElementById('generate-group-btn')
const groupContainer = document.getElementById('group-container')
const player1Nums = document.getElementsByName('player-1-nums')
const player1MainSum = document.getElementById('player-1-main-sum')
const player1Bonus = document.getElementById('player-1-bonus')

const player1 = new Player('qwe')
const player2 = new Player('asd')
const combinations = new Сombinations()

function groupContainerReset(player: Player) {
  player.resetGroup()
  if (groupContainer)
    groupContainer.innerHTML = ''
}

generateBtn?.addEventListener('click', () => {
  if (groupContainer)
    groupContainer.innerHTML = ''

  player1.setGroup(generateGroup(player1.getGroup()))

  Object.entries(player1.getGroup()).forEach(([key, value]) => {
    const groupNumber = document.createElement('p')
    groupNumber.innerText = value.value.toString()
    groupNumber.classList.add('game-number')
    groupNumber.setAttribute('id', key)
    if (value.isSelected) {
      groupNumber.classList.add('selected')
    }

    groupNumber.addEventListener('click', () => {
      const key = groupNumber.getAttribute('id') as keyof GameGroup
      if (player1.getGameNumber(key).isSelected) {
        player1.updateGroup(key as keyof GameGroup, { isSelected: false })
        groupNumber.classList.remove('selected')
      } else {
        player1.updateGroup(key as keyof GameGroup, { isSelected: true })
        groupNumber.classList.add('selected')
      }
    })

    groupContainer?.appendChild(groupNumber)
  })
})

player1Nums.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (item.innerText !== ''){
      return
    }

    const group = player1.getGroupValues()
    const value = combinations.callNums(group, index + 1)
    player1.setScore(value)
    player1.setNumsScore(value)
    item.innerText = value.toString()

    if (player1.getNumsScore() > 65){
      player1.setScore(35)
      player1Bonus?.classList.add('selected')
    }

    groupContainerReset(player1)

    item.classList.add('selected')
    
    if (player1MainSum)
      player1MainSum.innerText = player1.getScore().toString()
  })
})



