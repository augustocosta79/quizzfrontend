import { Game } from './game.js'

export class QuizzResult {
    
    private restartButton = document.getElementById('restart')! as HTMLButtonElement
    private newGameButton = document.getElementById('new-game')! as HTMLButtonElement

    constructor(){
        this.configureButtons()
    }

    private configureButtons(): void {
        this.restartButton.addEventListener('click', Game.restart)
        this.newGameButton.addEventListener('click', Game.reset)
    }

}