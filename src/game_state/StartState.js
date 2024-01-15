import { VIEWPORT } from "../constants/game.js"
import { CharSelectState } from "./CharSelectState.js"
import { GameState } from "./GameState.js"

export class StartState extends GameState {
    constructor(game) {
        super(game)
        this.running = true

        this.msPrev = window.performance.now()
        this.msPerFrame = 1000 / 60

        this.animationFrameIndex = 0
        this.framesElapsed = 0
        this.framesHold = 24

        this.image = document.querySelector("img[alt='start_screen']")
        this.frames = [
            [0, 0, 384, 224], 
            [0, 224, 384, 224],
            [0, 448, 384, 224],
            [0, 672, 384, 224],
            // [0, 896, 384, 224],
        ]
    }

    update() {
        
    }

    draw() {
        if (this.animationFrameIndex == this.frames.length) {
            this.animationFrameIndex = 0
        }

        const [x, y, width, height] = this.frames[this.animationFrameIndex]

        this.context.drawImage(this.image, x, y, width, height, 0, 0, VIEWPORT.WIDTH, VIEWPORT.HEIGHT)

        if (this.framesElapsed == this.framesHold - 1) {
            this.framesElapsed = 0
            this.animationFrameIndex++
        }
        this.framesElapsed++
    }

    checkTransition() {
        if (this.running == false) {
            window.removeEventListener('keypress', this.game.inputHandler)
            const charSelectState = new CharSelectState(this.game)
            charSelectState.enterState()
        }
    }

    frame() {
        this.checkTransition()
        if (this.running) {
            window.requestAnimationFrame(this.frame.bind(this))
        }

        const msNow = window.performance.now()
        const msPassed = msNow - this.msPrev

        if (msPassed < this.msPerFrame) return

        const excessTime = msPassed % this.msPerFrame
        this.msPrev = msNow - excessTime
        
        this.update()
        this.draw()
    }

    handleKeyPress(event) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
            event.preventDefault();
        }
        if (event.code == "Space" || event.code == "Enter") {
            this.running = false
        }
    }

    registerEventListener(eventListener) {
        this.game.inputHandler = eventListener
        window.addEventListener('keypress', this.game.inputHandler)
    }

    enterState() {
        this.registerEventListener(this.handleKeyPress.bind(this))
        window.requestAnimationFrame(this.frame.bind(this))
    }
}