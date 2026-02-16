import { Сombinations } from './Combinations'
import { Player } from './Player'
import './style.css'
import type { GameGroup } from './types'
import { generateGroup } from './utils'

const generateBtn = document.getElementById('generate-group-btn')
const groupContainer = document.getElementById('group-container')

const player1 = new Player('qwe')
const player2 = new Player('asd')

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


