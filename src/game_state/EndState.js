import { GameState } from "./GameState.js"

export class EndState extends GameState {
    constructor(game) {
        super(game)
        this.running = true
    }

    draw() {
        this.context.drawImage(document.querySelector(`img[alt='game_over']`), 0, 0)

    }

    checkTransition() {
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

    enterState() {
        window.requestAnimationFrame(this.frame.bind(this))
    }
}