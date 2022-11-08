import { GameData } from "./gamedata.js"
import { IQuestion, Answer } from "./models.js"
import { QuizzResult } from "./quizzresult.js"
import { WindowCtrl } from "./windowctrl.js"

export class Game extends GameData {

    private static questionBox = document.getElementById('question')! as HTMLDivElement
    private static answersBox = document.getElementById('answers')! as HTMLUListElement
    private static nextButton = document.getElementById('nextButton')! as HTMLButtonElement

    constructor(){
        super()
        Game.configureNextButton()
    }

    public static create(questions: IQuestion[], playerName: string): void {
        GameData.create(questions, playerName)
        Game.loadPlayerData()
        Game.renderQuestion(GameData.currentQuestionIndex)
        WindowCtrl.goTo('quizz-game')
    }

    public static restart(): void {
        GameData.currentQuestionIndex = 0
        GameData.playerScore = 0
        GameData.round += 1
        Game.clearScreen()
        Game.loadPlayerData()
        Game.renderQuestion(GameData.currentQuestionIndex)
        WindowCtrl.goTo('quizz-game')
    }

    public static reset(): void {
        GameData.resetGame()
        Game.clearScreen()
        QuizzResult.finalMessage(GameData.playerScore)
        WindowCtrl.goTo('quizz-loader')
    }

    private static loadPlayerData(): void {
        const nameBoxEl = document.getElementById('player-name')! as HTMLSpanElement
        const scoreBoxEl = document.getElementById('player-score')! as HTMLSpanElement
        const roundBoxEl = document.getElementById('player-round')! as HTMLSpanElement
        
        nameBoxEl.textContent = ""
        scoreBoxEl.textContent = ""
        roundBoxEl.textContent = ""

        nameBoxEl.textContent = `Player: ${GameData.playerName}`
        scoreBoxEl.textContent = `Score: ${GameData.playerScore}`
        roundBoxEl.textContent = `Round: ${GameData.round}`
    }

    static renderQuestion(currentQuestionIndex: number): void {
        const quizz = GameData.questions[currentQuestionIndex]
        Game.questionBox.textContent = quizz.question
        Game.renderAnswers(quizz.answers)
    }


    static renderAnswers(answers: Answer[]): void {
        answers.forEach((answer) => {
            const li = document.createElement('li')
            li.textContent = answer.text
            li.dataset.correct = 'false'
            if(answer.correct) {
                li.dataset.correct = 'true'
            }
            li.addEventListener('click', Game.checkCorrectAnswer, true)
            Game.answersBox.appendChild(li)
        })
    }

    private static configureNextButton(): void {
        Game.nextButton.addEventListener('click', this.nextQuestion)
    }

    private static clearScreen(): void {
        Game.questionBox.innerHTML = ''
        Game.answersBox.innerHTML = ''
    }

    private static nextQuestion(): void {

        if (GameData.currentQuestionIndex >= GameData.questions.length - 1) {
            Game.nextButton.disabled = true
            WindowCtrl.goTo('quizz-result')
            return
        }
        
        GameData.currentQuestionIndex += 1
        console.log(GameData.currentQuestionIndex)
        Game.clearScreen()
        Game.nextButton.disabled = true
        Game.renderQuestion(GameData.currentQuestionIndex)            
    }


    static checkCorrectAnswer(event: any): void {
        
        const answers = document.querySelectorAll('#answers > li')! as NodeListOf<HTMLLIElement>
        const nextButton = document.getElementById('nextButton')! as HTMLButtonElement
        nextButton.disabled = false
        answers.forEach(answer => {
            if (answer.dataset.correct === 'true') {
                answer.classList.add('correct')
                return
            }
            answer.classList.add('wrong')
        })
        console.log(event.target)
        if (event.target.dataset.correct === 'true') {
            GameData.playerScore += 1
            Game.loadPlayerData()
        }
        
        answers.forEach( answer => {
            answer.removeEventListener('click', Game.checkCorrectAnswer, true)

        })
    }
}
