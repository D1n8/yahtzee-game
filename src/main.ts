import { Сombinations } from './Combinations'
import { Game } from './Game'
import { Player } from './Player'
import './style.css'
import type { GameGroup } from './types'
import { generateGroup } from './utils'

const generateBtn = document.getElementById('generate-group-btn')
const groupContainer = document.getElementById('group-container')
const countThrows = document.getElementById('count-throws')
const player1HTML = document.getElementById('player-1')
const player2HTML = document.getElementById('player-2')

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

const player2Nums = document.getElementsByName('player-2-nums')
const player2MainSum = document.getElementById('player-2-main-sum')
const player2Bonus = document.getElementById('player-2-bonus')
const player2Set = document.getElementById('player-2-set')
const player2Quads = document.getElementById('player-2-quads')
const player2FullHouse = document.getElementById('player-2-full-house')
const player2SmallStraight = document.getElementById('player-2-small-straight')
const player2LargeStraight = document.getElementById('player-2-large-straight')
const player2Yahtzee = document.getElementById('player-2-yahtzee')
const player2Chance = document.getElementById('player-2-chance')

function start(player1: Player, player2: Player, game: Game) {
  const combinations = new Сombinations()

  if (player1HTML && player2HTML) {
    player1HTML.innerText = player1.name
    player2HTML.innerText = player2.name
    player1HTML.classList.add('move')
  }

  function groupContainerReset(player: Player) {
    player.resetGroup()
    if (groupContainer)
      groupContainer.innerHTML = ''
  }

  function addClickListenerToPlayerHardComb(
    player: Player,
    game: Game,
    combHTML: HTMLElement | null,
    mainScore: HTMLElement | null,
    countThrows: HTMLElement | null,
    combFn: Function,
    player1HTML: HTMLElement | null,
    player2HTML: HTMLElement | null,
    combParam?: number) {
    combHTML?.addEventListener('click', () => {
      if (combHTML.innerText !== '' || !player.getIsMove() || !game.getDiceIsRolled()) {
        return
      }

      const group = player.getGroupValues()
      const value = combFn(group, combParam)
      player.setScore(value)
      combHTML.innerText = value.toString()
      combHTML.classList.add('selected')

      groupContainerReset(player)

      if (mainScore)
        mainScore.innerText = player.getScore().toString()

      if (countThrows)
        countThrows.innerText = `Бросьте кубики`

      player.countThrows = 0
      player.countPlayedCombs++
      game.switchMove()
      game.setDiceIsRolled(false)
      player1HTML?.classList.toggle('move')
      player2HTML?.classList.toggle('move')

      const checkWinner = game.checkWinner()
      if (checkWinner.status) {
        if (!checkWinner.isDraw) {
          alert(`${checkWinner.who} победил`)
          resetGame()
          init()
        } else {
          alert(checkWinner.who)
          resetGame()
          init()
        }
      }
    })
  }

  function addClickListenerToPlayerSimpleComb(
    player: Player,
    playerNums: NodeListOf<HTMLElement>,
    playerBonus: HTMLElement | null,
    playerMainScore: HTMLElement | null,
    countThrows: HTMLElement | null,
    combinations: Сombinations,
    game: Game,
    player1HTML: HTMLElement | null,
    player2HTML: HTMLElement | null) {
    playerNums.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (item.innerText !== '' || !player.getIsMove() || !game.getDiceIsRolled()) {
          return
        }

        const group = player.getGroupValues()
        const value = combinations.callNums(group, index + 1)
        player.setScore(value)
        player.setNumsScore(value)
        item.innerText = value.toString()
        item.classList.add('selected')

        if (player.getNumsScore() > 65) {
          player.setScore(35)
          playerBonus?.classList.add('selected')
        }

        groupContainerReset(player)

        if (playerMainScore)
          playerMainScore.innerText = player.getScore().toString()

        if (countThrows)
          countThrows.innerText = `Бросьте кубики`

        player.countThrows = 0
        player.countPlayedCombs++
        game.switchMove()
        game.setDiceIsRolled(false)
        player1HTML?.classList.toggle('move')
        player2HTML?.classList.toggle('move')

        const checkWinner = game.checkWinner()
        if (checkWinner.status) {
          if (!checkWinner.isDraw) {
            alert(`${checkWinner.who} победил`)
            resetGame()
            init()
          } else {
            alert(checkWinner.who)
            resetGame()
            init()
          }
        }
      })
    })
  }

  function playerMove(
    player: Player,
    groupContainer: HTMLElement | null,
    countThrows: HTMLElement | null) {
    if (player.countThrows === 3) {
      return
    }

    if (groupContainer)
      groupContainer.innerHTML = ''

    player.setGroup(generateGroup(player.getGroup()))
    player.countThrows++

    if (countThrows)
      countThrows.innerText = `Осталось бросков: ${3 - player.countThrows}`

    game.setDiceIsRolled(true)

    Object.entries(player.getGroup()).forEach(([key, value]) => {
      const groupNumber = document.createElement('p')
      groupNumber.innerText = value.value.toString()
      groupNumber.classList.add('game-number')
      groupNumber.setAttribute('id', key)
      if (value.isSelected) {
        groupNumber.classList.add('selected')
      }

      groupNumber.addEventListener('click', () => {
        const key = groupNumber.getAttribute('id') as keyof GameGroup
        if (player.getGameNumber(key).isSelected) {
          player.updateGroup(key as keyof GameGroup, { isSelected: false })
          groupNumber.classList.remove('selected')
        } else {
          player.updateGroup(key as keyof GameGroup, { isSelected: true })
          groupNumber.classList.add('selected')
        }
      })

      groupContainer?.appendChild(groupNumber)
    })
  }

  generateBtn?.addEventListener('click', () => {
    if (player1.getIsMove()) {
      playerMove(player1, groupContainer, countThrows)
    } else {
      playerMove(player2, groupContainer, countThrows)
    }
  })

  addClickListenerToPlayerSimpleComb(player1, player1Nums, player1Bonus, player1MainSum, countThrows, combinations, game, player1HTML, player2HTML)
  addClickListenerToPlayerSimpleComb(player2, player2Nums, player2Bonus, player2MainSum, countThrows, combinations, game, player1HTML, player2HTML)

  addClickListenerToPlayerHardComb(player1, game, player1Set, player1MainSum, countThrows, combinations.callNumsOfKind, player1HTML, player2HTML, 3)
  addClickListenerToPlayerHardComb(player1, game, player1Quads, player1MainSum, countThrows, combinations.callNumsOfKind, player1HTML, player2HTML, 4)
  addClickListenerToPlayerHardComb(player1, game, player1FullHouse, player1MainSum, countThrows, combinations.callFullHouse, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player1, game, player1SmallStraight, player1MainSum, countThrows, combinations.callSmallStraight, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player1, game, player1LargeStraight, player1MainSum, countThrows, combinations.callLargeStraight, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player1, game, player1Yahtzee, player1MainSum, countThrows, combinations.callFiveOfKind, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player1, game, player1Chance, player1MainSum, countThrows, combinations.callChance, player1HTML, player2HTML)

  addClickListenerToPlayerHardComb(player2, game, player2Set, player2MainSum, countThrows, combinations.callNumsOfKind, player1HTML, player2HTML, 3)
  addClickListenerToPlayerHardComb(player2, game, player2Quads, player2MainSum, countThrows, combinations.callNumsOfKind, player1HTML, player2HTML, 4)
  addClickListenerToPlayerHardComb(player2, game, player2FullHouse, player2MainSum, countThrows, combinations.callFullHouse, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player2, game, player2SmallStraight, player2MainSum, countThrows, combinations.callSmallStraight, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player2, game, player2LargeStraight, player2MainSum, countThrows, combinations.callLargeStraight, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player2, game, player2Yahtzee, player2MainSum, countThrows, combinations.callFiveOfKind, player1HTML, player2HTML)
  addClickListenerToPlayerHardComb(player2, game, player2Chance, player2MainSum, countThrows, combinations.callChance, player1HTML, player2HTML)
}

function resetGame() {
  window.location.reload()
}

const init = () => {
  const player1 = new Player('Петя', true)
  const player2 = new Player('Вася', false)
  const game: Game = new Game(player1, player2)

  start(player1, player2, game)
}

init()
