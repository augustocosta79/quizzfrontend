import { Autobind } from "./autobind.js"
import { API } from "./fetchdata.js"
import { Game } from "./game.js"
import { IQuestion, Validatable } from "./models.js"
import { validate } from './validation.js'
import { WindowCtrl } from "./windowctrl.js"

export class QuizzLoader {

    private selectList = document.getElementById('category')! as HTMLSelectElement
    private playerName = document.getElementById('name')! as HTMLInputElement
    private startButton = document.getElementById('startButton')! as HTMLButtonElement
    private APICategories: string = 'http://localhost:3000/quizz/categories'
    private APIQuestions: string = 'http://localhost:3000/quizz/categories/'

    constructor(){
        this.appendCategories()
        this.configStartButton()
    }



    async appendCategories(){
        let categories:string[]
        try {
            categories = await API.fetchData<string>(this.APICategories)
            console.log('connected')
            
        } catch (err) {
            categories = ['None available']
            alert('Unable to get Quizz categories')
        }
        

        categories.forEach(
            category => {
                const optionEl = document.createElement('option')
                optionEl.value = category
                optionEl.textContent = category
                this.selectList.appendChild(optionEl)
            }
        )
    }

    private configStartButton(){
        this.startButton.addEventListener('click', this.startGame)
    }


    @Autobind
    private async startGame(event: Event){
        event.preventDefault()

        const playerName = this.playerName.value
        const categoryName = this.selectList.value

        const inputValidatable: Validatable = {value: playerName, required: true}
        const selectValidatable: Validatable = {value: categoryName, required: true}

        if (!validate(inputValidatable || selectValidatable)){
            alert('Insert a Player Name and choose a category')
            return
        }

        try {
            
            const questions: IQuestion[] = await API.fetchData<IQuestion>(this.APIQuestions + categoryName)
            Game.create(questions, playerName)
            console.log(questions)
            WindowCtrl.goTo('quizz-game')
            console.log('get questions ok')
        } catch (error) {
            alert('No questions available at the moment. Please check your internet connection')
        }
    }

}