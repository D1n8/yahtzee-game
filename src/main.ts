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
  
  player1.getGroup().forEach(item => {
    const groupNumber = document.createElement('div')
    groupNumber.innerText = item.value.toString()

    groupNumber.addEventListener('click', () => {
      groupNumber.style.color = 'green'
    })

    groupContainer?.appendChild(groupNumber)
  })


})


