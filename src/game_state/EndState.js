import { GameState } from "./GameState.js"

export class EndState extends GameState {
    constructor(game) {
        super(game)
        this.running = true
    }

    draw() {
        if (this.game.fighter1.health == 0) {
            this.context.drawImage(document.querySelector(`img[alt='${this.game.fighter2.name}_splash']`), 0, 0)
        } else {
            this.context.drawImage(document.querySelector(`img[alt='${this.game.fighter1.name}_splash']`), 0, 0)
        }
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