import { VIEWPORT } from "./constants/game.js";
import { StartState } from "./game_state/StartState.js";


export class Game{
    constructor() {
        this.context = this.setContext()
        this.fighter1 = null
        this.fighter2 = null
        this.inputHandler = null
    }

    // draw() {
    //     this.gameStateStack[-1].draw()
    // }

    // update() {
    //     this.gameStateStack[-1].update()
    // }

    start() {
        const startState = new StartState(this)
        startState.enterState()
    }

    setContext() {
        const canvasElement = document.querySelector('canvas')
        const context = canvasElement.getContext('2d')
        canvasElement.width = VIEWPORT.WIDTH
        canvasElement.height = VIEWPORT.HEIGHT
        context.imageSmoothingEnabled = false
        return context
    }

}

window.onload = function() {
    const game = new Game()
    game.start()
}