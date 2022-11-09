export class QuizzResult {
    
    private restartButton = document.getElementById('restart')! as HTMLButtonElement
    private newGameButton = document.getElementById('new-game')! as HTMLButtonElement

    constructor(){
        this.configureButtons()
    }

    private configureButtons(): void {
        // this.restartButton.addEventListener('click', Game.restart)
        // this.newGameButton.addEventListener('click', Game.reset)
    }

    public static finalMessage(points: number) {
        // const messageBox = document.getElementById('message') as HTMLParagraphElement
        // const message = `${GameData.playerName}, you scored ${points} points!`
        // messageBox.innerText = message
    }

}