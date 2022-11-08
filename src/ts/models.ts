export interface Answer { text: string, correct: boolean, _id: number }

export interface IQuestion {
    _id: string,
    question: string,
    category: string,
    answers: Answer[]

}

export interface Validatable {
    value: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    max?: number;
    min?: number;
  }
