import { CharSelectState } from "./CharSelectState.js"
import { GameState } from "./GameState.js"

export class StartState extends GameState {
    constructor(game) {
        super(game)
        this.running = true
    }

    draw() {
        this.context.drawImage(document.querySelector("img[alt='start_screen']"), 0, 0)
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
        this.draw()
    }

    handleKeyPress(event) {
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