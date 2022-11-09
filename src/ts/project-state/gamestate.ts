import { IQuestion } from "../models/quizz"

export class GameState {
    static playerName: string = ''
    static playerScore: number = 0
    static gameRound: number = 1
    static Questions: IQuestion[] = []
    static currentQuestionIndex: number = 0

    static activeWindow: Function
    static renderQuizzElements: Function
    static renderPlayerData: Function
    static clearGameScreen: Function

    static newQuizz(questions: IQuestion[], playerName: string): void {
        this.playerName = playerName
        this.Questions = questions
        this.activeWindow('quizz-game')
        this.clearGameScreen()
        this.renderPlayerData(this.playerName, this.playerScore, this.gameRound)
        this.renderQuizzElements(this.currentQuestionIndex, this.Questions)
    }

    static restart(): void {
        this.playerName = ''
        this.playerScore = 0
        this.gameRound = 1
        this.clearGameScreen()
    }

    static reset(): void {
        this.restart()
        this.Questions = []
        this.activeWindow('quizz-loader')
    }
}