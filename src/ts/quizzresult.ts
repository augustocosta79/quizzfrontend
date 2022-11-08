import { Game } from './game.js'
import { GameData } from './gamedata.js'

export class QuizzResult extends GameData {
    
    private restartButton = document.getElementById('restart')! as HTMLButtonElement
    private newGameButton = document.getElementById('new-game')! as HTMLButtonElement

    constructor(){
        super()
        this.configureButtons()
    }

    private configureButtons(): void {
        this.restartButton.addEventListener('click', Game.restart)
        this.newGameButton.addEventListener('click', Game.reset)
    }

    public static finalMessage(points: number) {
        const messageBox = document.getElementById('message') as HTMLParagraphElement
        const message = `${GameData.playerName}, you scored ${points}!`
        messageBox.innerText = message
    }

}