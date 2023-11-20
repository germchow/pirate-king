import { isKeyDown } from "../InputHandler.js"
import { FighterState } from "../constants/fighter.js"
import { STAGE } from "../constants/game.js"

export class Character {
    constructor(name, x, y) {
        this.name = name
        this.x = x
        this.y = y
        this.velocity = {x: 0, y: 0}
        this.gravity = 1

        this.sprites = new Image()
        this.spriteFrames = {}
        this.animations = {}
        this.animationFrameIndex = 0
        this.framesElapsed = 0
        this.framesHold = 5

        this.states = {
            [FighterState.IDLE]: {
                enterState: () => {
                    this.velocity.x = 0
                },
                updateState: () => {
                    if (isKeyDown('KeyW') || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FighterState.JUMP)
                    }
                    if (isKeyDown('KeyA')) {
                        this.changeState(FighterState.WALK_BACKWARD)
                    }
                    if (isKeyDown('KeyD')) {
                        this.changeState(FighterState.WALK_FORWARD)
                    }
                }
            },
            [FighterState.WALK_FORWARD]: {
                enterState: () => {
                    this.velocity.x = 2
                },
                updateState: () => {
                    if (isKeyDown('KeyW') || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FighterState.JUMP)
                    }
                    if (!isKeyDown('KeyD')) {
                        this.changeState(FighterState.IDLE)
                    }
                }
            },
            [FighterState.WALK_BACKWARD]: {
                enterState: () => {
                    this.velocity.x = -2
                },
                updateState: () => {
                    if (isKeyDown('KeyW') || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FighterState.JUMP)
                    }
                    if (!isKeyDown('KeyA')) {
                        this.changeState(FighterState.IDLE)
                    }
                }
            },
            [FighterState.JUMP]: {
                enterState: () => {
                    this.y -= 1
                    this.velocity.y = -12
                },
                updateState: () => {
                    if (this.y >= STAGE.FLOOR_Y) {
                        this.changeState(FighterState.IDLE)
                    }
                    this.velocity.y += this.gravity
                }
            }
        }
        this.currentState = FighterState.IDLE
        
    }

    changeState(state) {
        this.animationFrameIndex = 0
        this.currentState = state
        this.states[this.currentState].enterState()
    }

    update() {
        this.states[this.currentState].updateState()
        this.x += this.velocity.x
        this.y = Math.min(this.y + this.velocity.y, STAGE.FLOOR_Y)
        
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold == 0) {
            this.framesElapsed == 0
            this.animationFrameIndex++
            if (this.animationFrameIndex >= this.animations[this.currentState].length) {
                this.animationFrameIndex = 0
            }
        }
    }

    drawDebug(context) {
        context.lineWidth = 2
        context.beginPath()
        context.strokeStyle = 'green'
        context.moveTo(this.x - 5, this.y)
        context.lineTo(this.x + 4, this.y)
        context.moveTo(this.x, this.y - 5)
        context.lineTo(this.x, this.y + 4)
        context.stroke()
    }

    draw(context) {
        const currentAnimation = this.animations[this.currentState]
        const [
            [x, y, width, height],
            [anchorX, anchorY]
        ] = this.spriteFrames[currentAnimation[this.animationFrameIndex]]
        context.drawImage(this.sprites, x, y, width, height, this.x - anchorX, this.y - anchorY, width, height)
        this.drawDebug(context)
    }
}