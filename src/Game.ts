import type { Player } from "./Player";

export class Game{
    public Player1: Player
    public Player2: Player
    private diceRolled: boolean = false

    constructor(player1: Player, player2: Player) {
        this.Player1 = player1
        this.Player2 = player2
    }

    switchMove() {
        if (this.Player1.getIsMove()) {
            this.Player1.setIsMove(false)
            this.Player2.setIsMove(true)
        } else {
            this.Player2.setIsMove(false)
            this.Player1.setIsMove(true)
        }
    }

    getDiceIsRolled() {
        return this.diceRolled
    }

    setDiceIsRolled(value: boolean) {
        this.diceRolled = value
    }


}