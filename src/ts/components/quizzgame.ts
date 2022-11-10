import { IQuestion, Answer } from "../models/quizz.js"
import { GameState } from "../project-state/gamestate.js"

export class Game {

    private questionBox = document.getElementById('question')! as HTMLDivElement
    private answersBox = document.getElementById('answers')! as HTMLUListElement
    private nextButton = document.getElementById('nextButton')! as HTMLButtonElement

    constructor(){

        GameState.renderQuizzElements = (currentQuestionIndex: number, questions: IQuestion[]) => {
            this.renderQuestion(currentQuestionIndex, questions)
        }

        GameState.clearGameScreen = () => {
            this.clearScreen()
        }

        GameState.renderPlayerData = (playerName: string, playerScore: number, gameRound: number) => {
            this.renderPlayerData(playerName, playerScore, gameRound)
        }

        GameState.renderAnswers = (answers: Answer[], checked: boolean) => {
            this.renderAnswers(answers, checked)
        }
        this.configureNextButton()
    }

     private renderPlayerData(playerName: string, playerScore: number, gameRound: number): void {
        const nameBoxEl = document.getElementById('player-name')! as HTMLSpanElement
        const scoreBoxEl = document.getElementById('player-score')! as HTMLSpanElement
        const roundBoxEl = document.getElementById('player-round')! as HTMLSpanElement
        
        nameBoxEl.textContent = ""
        scoreBoxEl.textContent = ""
        roundBoxEl.textContent = ""

        nameBoxEl.textContent = `Player: ${playerName}`
        scoreBoxEl.textContent = `Score: ${playerScore}`
        roundBoxEl.textContent = `Round: ${gameRound}`
    }

    renderQuestion(currentQuestionIndex: number, questions: IQuestion[]): void {
        const quizz = questions[currentQuestionIndex]
        this.questionBox.textContent = quizz.question
        this.renderAnswers(quizz.answers)
        this.nextButton.disabled = true
    }


    renderAnswers(answers: Answer[], checked?: boolean): void {
        this.answersBox.innerHTML = ''
        answers.forEach((answer, index) => {
            const li = document.createElement('li')
            li.textContent = answer.text
            if(checked) { li.className = 'wrong' }
            if(checked && answer.correct) { li.className = 'correct' }
            if(!checked) {
                li.addEventListener('click', (event: Event) => {
                    event.preventDefault()
                    GameState.checkCorrectAnswer(index)
                })
            }
            this.answersBox.appendChild(li)
            if(checked) { this.nextButton.disabled = false }
        })
    }

    private configureNextButton(): void {
        this.nextButton.addEventListener('click', () => {
            GameState.nextQuestion()
        })
    }

    private clearScreen(): void {
        this.questionBox.innerHTML = ''
        this.answersBox.innerHTML = ''
    }
}
