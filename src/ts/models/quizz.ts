export interface Answer { text: string, correct: boolean, _id: number }

export interface IQuestion {
    _id: string,
    question: string,
    category: string,
    answers: Answer[]

}