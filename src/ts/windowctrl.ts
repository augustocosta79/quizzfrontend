export class WindowCtrl {
    public static hideAll(){
        const windows = document.querySelectorAll('#app section')!
        windows.forEach(window => {
          window.className = 'hide'  
        })
    }

    private static show(windowId: string){
        document.getElementById(windowId)!.className = ''
    }

    public static goTo(windowId: string){
        WindowCtrl.hideAll()
        WindowCtrl.show(windowId)

    }
}