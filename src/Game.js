import { registerKeyboardEvents } from "./InputHandler.js";
import { Sanji } from "./character/Sanji.js";
import { Zoro } from "./character/Zoro.js";
import { STAGE, VIEWPORT } from "./constants/game.js";

export class Game {
    constructor() {
        this.context = this.setContext()
        this.player1 = new Zoro(STAGE.P1_START_X, STAGE.FLOOR_Y)
        this.player2 = new Sanji(STAGE.P2_START_X, STAGE.FLOOR_Y)

        this.msPrev = window.performance.now()
        this.msPerFrame = 1000 / 60
    }

    setContext() {
        const canvasElement = document.querySelector('canvas')
        const context = canvasElement.getContext('2d')
        canvasElement.width = VIEWPORT.WIDTH
        canvasElement.height = VIEWPORT.HEIGHT
        return context
    }

    update() {
        this.player1.update()
        this.player2.update()
    }

    draw() {
        this.context.drawImage(document.querySelector("img[alt='stage']"), 0, 0)
        this.player1.draw(this.context)
        this.player2.draw(this.context)
    }

    frame() {
        window.requestAnimationFrame(this.frame.bind(this))

        const msNow = window.performance.now()
        const msPassed = msNow - this.msPrev

        if (msPassed < this.msPerFrame) return

        const excessTime = msPassed % this.msPerFrame
        this.msPrev = msNow - excessTime
        
        this.draw()
        this.update()
    }

    start() {
        registerKeyboardEvents()
        window.requestAnimationFrame(this.frame.bind(this))
    }
}

    