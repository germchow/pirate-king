import { VIEWPORT } from "../constants/game.js";
import { GameState } from "./GameState.js";
import { EndState } from "./EndState.js";
import { emptyKeys, registerFighterControls, unregisterFighterControls } from "../util/InputHandler.js";

export class FightState extends GameState {
    constructor(game) {
        super(game)
        emptyKeys()
        this.msPrev = window.performance.now()
        this.msPerFrame = 1000 / 60
        
        this.debugMode = false
        this.running = true
    }

    drawUI(context) {
        // Player 1 health bar
        context.beginPath()
        context.strokeStyle = 'lime'
        context.fillStyle = 'green'
        context.rect(0, 10, this.game.fighter1.health, 10)
        context.stroke()
        context.fill()

        // Player 2 health bar
        context.beginPath()
        context.rect(VIEWPORT.WIDTH - this.game.fighter2.health, 10, this.game.fighter2.health, 10)
        context.stroke()
        context.fill()
    }

    checkTransition() {
        if (this.game.fighter1.health == 0 || this.game.fighter2.health == 0) {
            unregisterFighterControls()
            this.running = false

            let splash = document.querySelector(`img[alt='${this.game.fighter2.name}_splash']`)
            if (this.game.fighter2.health == 0) {
                splash = document.querySelector(`img[alt='${this.game.fighter1.name}_splash']`)
            }

            const fightState = new EndState(this.game, splash)
            fightState.enterState()
        }
    }

    update() {
        this.game.fighter1.update(this.game.fighter2)
        this.game.fighter2.update(this.game.fighter1)
    }

    draw() {
        this.context.drawImage(document.querySelector("img[alt='stage']"), 0, 0)
        this.game.fighter1.draw(this.context)
        this.game.fighter2.draw(this.context)
        if (this.debugMode) {
            this.game.fighter1.drawDebug(this.context)
            this.game.fighter2.drawDebug(this.context)
        }
        this.drawUI(this.context)
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

    enterState() {
        registerFighterControls()

        var checkbox = document.querySelector("input[id=debug]")
        if (checkbox.checked) {
            this.debugMode = true
        } else {
            this.debugMode = false
        }
        var self = this
        checkbox.addEventListener('change', function() {
        if (this.checked) {
            self.debugMode = true
        } else {
            self.debugMode = false
        }
        })

        window.requestAnimationFrame(this.frame.bind(this))
    }
}

    