import { IQuestion } from "./models.js"

export class GameData {
    protected static currentQuestionIndex: number = 0
    protected static playerScore: number = 0
    protected static questions: IQuestion[] = []
    protected static playerName: string = ''
    protected static round: number = 1

    public static create(questions: IQuestion[], playerName: string): void {
        this.questions = questions
        this.playerName = playerName
    }
    
    public static resetGame(): void {
        this.currentQuestionIndex = 0
        this.playerScore = 0
        this.questions = []
        this.playerName = ''
        this.round = 1
    }

}