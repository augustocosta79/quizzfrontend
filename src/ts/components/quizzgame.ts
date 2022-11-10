import { IQuestion, Answer } from "../models/quizz.js"
import { GameState } from "../project-state/gamestate.js"
import { QuizzResult } from "./quizzresult.js"
import { WindowCtrl } from "./windowctrl.js"

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
        // Game.configureNextButton()
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
        // Game.nextButton.addEventListener('click', this.nextQuestion)
    }

    private clearScreen(): void {
        this.questionBox.innerHTML = ''
        this.answersBox.innerHTML = ''
    }

    // private static nextQuestion(): void {

    //     if (GameData.currentQuestionIndex >= GameData.questions.length - 1) {
    //         Game.nextButton.disabled = true
    //         QuizzResult.finalMessage(GameData.playerScore)
    //         WindowCtrl.goTo('quizz-result')
    //         return
    //     }
        
    //     GameData.currentQuestionIndex += 1
    //     console.log(GameData.currentQuestionIndex)
    //     Game.clearScreen()
    //     Game.nextButton.disabled = true
    //     Game.renderQuestion(GameData.currentQuestionIndex)            
    // }


    checkCorrectAnswer(event: any): void {
        
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
            // GameData.playerScore += 1
            // Game.loadPlayerData()
        }
        
        answers.forEach( answer => {
            // answer.removeEventListener('click', Game.checkCorrectAnswer, true)

        })
    }
}
