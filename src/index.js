import { VIEWPORT } from "./constants/game.js";
import { FightState } from "./game_state/FightState.js";
import { StartState } from "./game_state/StartState.js";
import { registerKeyboardEvents } from "./util/InputHandler.js";


export class Game{
    constructor() {
        this.context = this.setContext()
    }

    // draw() {
    //     this.gameStateStack[-1].draw()
    // }

    // update() {
    //     this.gameStateStack[-1].update()
    // }

    start() {
        console.log(this)
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
    registerKeyboardEvents()
    const game = new Game()
    game.start()
}