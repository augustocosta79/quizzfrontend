import { IQuestion } from "../models/quizz"

export class GameState {
    static playerName: string = ''
    static playerScore: number = 0
    static gameRound: number = 1
    static Questions: IQuestion[] = []
    static currentQuestionIndex: number = 0

    static activeWindow: Function
    static renderQuizzElements: Function
    static renderAnswers: Function
    static renderPlayerData: Function
    static clearGameScreen: Function

    static renderResultMessage: Function

    static newQuizz(questions: IQuestion[], playerName: string): void {
        this.playerName = playerName
        this.Questions = questions
        this.activeWindow('quizz-game')
        this.clearGameScreen()
        this.renderPlayerData(this.playerName, this.playerScore, this.gameRound)
        this.renderQuizzElements(this.currentQuestionIndex, this.Questions)
    }

    static restart(): void {
        this.playerScore = 0
        this.gameRound += 1
        this.currentQuestionIndex = 0
        this.clearGameScreen()
        this.renderPlayerData(this.playerName, this.playerScore, this.gameRound)
        this.renderQuizzElements(this.currentQuestionIndex, this.Questions)
        this.activeWindow('quizz-game')
    }

    static reset(): void {
        this.playerName = ''
        this.playerScore = 0
        this.gameRound = 1
        this.currentQuestionIndex = 0
        this.Questions = []
        this.activeWindow('quizz-loader')
    }

    static checkCorrectAnswer(index: number){
        this.renderAnswers(this.Questions[this.currentQuestionIndex].answers, true)
        if(this.Questions[this.currentQuestionIndex].answers[index].correct) {
            this.playerScore += 1
            this.renderPlayerData(this.playerName, this.playerScore, this.gameRound)
        }
    }

    static nextQuestion(): void {
        if(this.currentQuestionIndex >= this.Questions.length - 1) {
            const message = `${this.playerName}, you scored ${this.playerScore} points!`
            this.renderResultMessage(message)
            this.activeWindow('quizz-result')
            return    
        }
        this.currentQuestionIndex += 1
        this.renderQuizzElements(this.currentQuestionIndex, this.Questions)
    }
}