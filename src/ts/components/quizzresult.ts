import { GameState } from "../project-state/gamestate.js"

export class QuizzResult {
    
    private restartButton = document.getElementById('restart')! as HTMLButtonElement
    private newGameButton = document.getElementById('new-game')! as HTMLButtonElement

    constructor(){
        GameState.renderResultMessage = (message: string) => {
            this.finalMessage(message)
        }
        this.configureButtons()
    }

    private configureButtons(): void {
        this.restartButton.addEventListener('click', () => {
            GameState.restart()
        })
        this.newGameButton.addEventListener('click', () => {
            GameState.reset()
        })
    }

    finalMessage(message: string) {
        const messageBox = document.getElementById('message') as HTMLParagraphElement
        messageBox.innerText = message
    }

}