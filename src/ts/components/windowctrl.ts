import { GameState } from "../project-state/gamestate.js"

export class WindowCtrl {

    constructor(){
        
        GameState.activeWindow = (windowId: string) => {
            this.goTo(windowId)
        }
    }

    hideAll(){
        const windows = document.querySelectorAll('#app section')!
        windows.forEach(window => {
          window.className = 'hide' 
        })
    }

    show(windowId: string){
        document.getElementById(windowId)!.className = ''
    }

    goTo(windowId: string){
        this.hideAll()
        this.show(windowId)

    }
}