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
const player1Set = document.getElementById('player-1-set')
const player1Quads = document.getElementById('player-1-quads')
const player1FullHouse = document.getElementById('player-1-full-house')
const player1SmallStraight = document.getElementById('player-1-small-straight')
const player1LargeStraight = document.getElementById('player-1-large-straight')
const player1Yahtzee = document.getElementById('player-1-yahtzee')
const player1Chance = document.getElementById('player-1-chance')

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
    if (item.innerText !== '') {
      return
    }

    const group = player1.getGroupValues()
    const value = combinations.callNums(group, index + 1)
    player1.setScore(value)
    player1.setNumsScore(value)
    item.innerText = value.toString()
    item.classList.add('selected')

    if (player1.getNumsScore() > 65) {
      player1.setScore(35)
      player1Bonus?.classList.add('selected')
    }

    groupContainerReset(player1)

    if (player1MainSum)
      player1MainSum.innerText = player1.getScore().toString()
  })
})


function addClickListenerToPlayerComb(
  player: Player,
  combHTML: HTMLElement | null,
  mainScore: HTMLElement | null,
  combFn: Function,
  combParam?: number) {
  combHTML?.addEventListener('click', () => {
    if (combHTML.innerText !== '') {
      return
    }

    const group = player.getGroupValues()
    const value = combFn(group, combParam)
    player.setScore(value)
    combHTML.innerText = value.toString()
    combHTML.classList.add('selected')

    groupContainerReset(player)

    if (mainScore)
      mainScore.innerText = player1.getScore().toString()
  })
}

addClickListenerToPlayerComb(player1, player1Set, player1MainSum, combinations.callNumsOfKind, 3)
addClickListenerToPlayerComb(player1, player1Quads, player1MainSum, combinations.callNumsOfKind, 4)
addClickListenerToPlayerComb(player1, player1FullHouse, player1MainSum, combinations.callFullHouse)
addClickListenerToPlayerComb(player1, player1SmallStraight, player1MainSum, combinations.callSmallStraight)
addClickListenerToPlayerComb(player1, player1LargeStraight, player1MainSum, combinations.callLargeStraight)
addClickListenerToPlayerComb(player1, player1Yahtzee, player1MainSum, combinations.callFiveOfKind)
addClickListenerToPlayerComb(player1, player1Chance, player1MainSum, combinations.callChance)



