import { heldKeys, isKeyDown } from "../util/InputHandler.js"
import { FightState } from "./FightState.js"
import { GameState } from "./GameState.js"

export class StartState extends GameState {
    constructor(game) {
        console.log("startstate constructed")
        super(game)
        this.running = true
    }

    draw() {
        this.context.drawImage(document.querySelector("img[alt='start_screen']"), 0, 0)
    }

    update() {
        console.log("startstate update")
        if (isKeyDown('Space') || isKeyDown('Enter')) {
            this.running = false
            console.log("space pressed")
            const fightState = new FightState(this.game)
            fightState.enterState()
            
        }
    }

    frame() {
        this.update()
        this.draw()
        if (this.running) {
            window.requestAnimationFrame(this.frame.bind(this)) // TODO: debug why this cant be at the beginning
        }
    }

    enterState() {
        console.log("startstate entered")
        // super.enterState()
        window.requestAnimationFrame(this.frame.bind(this))
    }
}