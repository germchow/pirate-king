import { GameState } from "./GameState.js"
import { StartState } from "./StartState.js"

export class EndState extends GameState {
    constructor(game, splash) {
        super(game)
        this.running = true
        this.splash = splash
    }

    draw() {
        this.context.drawImage(this.splash, 0, 0)
        this.context.drawImage(document.querySelector(`img[alt='game_over']`), 0, 0)
    }

    checkTransition() {
        if (this.running == false) {
            window.removeEventListener('keypress', this.game.inputHandler)
            this.game.fighter1 = null
            this.game.fighter2 = null
            const startState = new StartState(this.game)
            startState.enterState()
        }
    }

    update() {
        
    }

    frame() {
        this.checkTransition()
        if (this.running) {
            window.requestAnimationFrame(this.frame.bind(this))
        }
        this.update()
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