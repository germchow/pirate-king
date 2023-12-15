import { Sanji } from "../fighter/Sanji.js";
import { Zoro } from "../fighter/Zoro.js";
import { PLAYERS, STAGE, VIEWPORT } from "../constants/game.js";
import { GameState } from "./GameState.js";

export class FightState extends GameState {
    constructor(game) {
        console.log("fightstate constructed")
        super(game)
        this.player1 = new Zoro(PLAYERS.PLAYER_ONE, STAGE.P1_START_X, STAGE.FLOOR_Y)
        this.player2 = new Sanji(PLAYERS.PLAYER_TWO, STAGE.P2_START_X, STAGE.FLOOR_Y)

        this.msPrev = window.performance.now()
        this.msPerFrame = 1000 / 60
        
        // this.debugMode = true
        this.running = true
    }

    drawUI(context) {
        if (this.player1.health == 0) {
            this.context.drawImage(this.player2.splash, 0, 0)
            this.context.drawImage(document.querySelector("img[alt='game_over']"), 0, 0)
            this.running = false
        }
        else if (this.player2.health == 0) {
            this.context.drawImage(this.player1.splash, 0, 0)
            this.context.drawImage(document.querySelector("img[alt='game_over']"), 0, 0)
            this.running = false
        }

        // Player 1 health bar
        context.beginPath()
        context.strokeStyle = 'lime'
        context.fillStyle = 'green'
        context.rect(0, 10, this.player1.health, 10)
        context.stroke()
        context.fill()

        // Player 2 health bar
        context.beginPath()
        context.rect(VIEWPORT.WIDTH - this.player2.health, 10, this.player2.health, 10)
        context.stroke()
        context.fill()
    }

    update() {
        this.player1.update(this.player2)
        this.player2.update(this.player1)
    }

    draw() {
        this.context.drawImage(document.querySelector("img[alt='stage']"), 0, 0)
        this.player1.draw(this.context)
        this.player2.draw(this.context)
        if (this.debugMode) {
            this.player1.drawDebug(this.context)
            this.player2.drawDebug(this.context)
        }
        this.drawUI(this.context)
    }

    frame() {
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
        console.log("fightstate entered")
        // super.enterState()
        window.requestAnimationFrame(this.frame.bind(this))
    }
}

    