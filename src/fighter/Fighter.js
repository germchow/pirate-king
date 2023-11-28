import { backwardPress, forwardPress, groundAttackPress, upPress, } from "../Control.js";
import { FighterDirection, FighterState } from "../constants/fighter.js"
import { GRAVITY, STAGE } from "../constants/game.js"

export class Character {
    constructor(name, playerNumber, x, y) {
        this.name = name
        this.playerNumber = playerNumber;
        this.x = x
        this.y = y
        this.velocity = {x: 0, y: 0}
        this.direction = FighterDirection.RIGHT

        this.sprites = new Image()
        this.spriteFrames = {}
        this.animations = {}
        this.animationFrameIndex = 0
        this.framesElapsed = 0
        this.framesHold = 10

        this.states = {
            [FighterState.IDLE]: {
                enterState: () => {
                    this.velocity.x = 0
                },
                updateState: () => {
                    if (upPress(this.playerNumber) || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FighterState.JUMP)
                    }
                    else if (backwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FighterState.WALK_BACKWARD)
                    }
                    else if (forwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FighterState.WALK_FORWARD)
                    }
                    else if (groundAttackPress(this.playerNumber, this.direction)) {
                        this.changeState(FighterState.GROUND_ATTACK)
                    }
                }
            },
            [FighterState.WALK_FORWARD]: {
                enterState: () => {
                    this.velocity.x = this.correctVelocityDirection(2)
                },
                updateState: () => {
                    if (upPress(this.playerNumber) || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FighterState.JUMP)
                    }
                    else if (!forwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FighterState.IDLE)
                    }
                    else if (groundAttackPress(this.playerNumber, this.direction)) {
                        this.changeState(FighterState.GROUND_ATTACK)
                    }
                }
            },
            [FighterState.WALK_BACKWARD]: {
                enterState: () => {
                    this.velocity.x = this.correctVelocityDirection(-2)
                },
                updateState: () => {
                    if (upPress(this.playerNumber) || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FighterState.JUMP)
                    }
                    else if (!backwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FighterState.IDLE)
                    }
                    else if (groundAttackPress(this.playerNumber, this.direction)) {
                        this.changeState(FighterState.GROUND_ATTACK)
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
                    this.velocity.y += GRAVITY
                }
            },
            [FighterState.GROUND_ATTACK]: {
                enterState: () => {
                },
                updateState: () => {
                    if (this.animationFrameIndex == this.animations[this.direction][this.currentState].length) {
                        this.changeState(FighterState.IDLE)
                    }
                }
            }
        }
        this.currentState = FighterState.IDLE
        
    }

    changeState(state) {
        this.animationFrameIndex = 0
        this.framesElapsed = 0
        this.currentState = state
        this.states[this.currentState].enterState()
    }

    correctVelocityDirection(velocity){
        if (this.direction == FighterDirection.RIGHT) {
            return velocity
        } else {
            return -velocity
        }
    }

    updateDirection(otherPlayer) {
        if (this.currentState != FighterState.JUMP && otherPlayer.currentState != FighterState.JUMP) {
            if (this.x < otherPlayer.x) {
                this.direction = FighterDirection.RIGHT
            } else {
                this.direction = FighterDirection.LEFT
            }
        }
    }

    update(otherPlayer) {
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold == 0) {
            this.framesElapsed == 0
            this.animationFrameIndex++
        }

        this.updateDirection(otherPlayer)
        this.states[this.currentState].updateState()

        this.x += this.velocity.x
        this.y = Math.min(this.y + this.velocity.y, STAGE.FLOOR_Y)

        if (this.animationFrameIndex == this.animations[this.direction][this.currentState].length) {
            this.animationFrameIndex = 0
        }
    }

    drawDebug(context) {
        context.lineWidth = 2
        context.beginPath()
        context.strokeStyle = 'green'
        context.moveTo(this.x - 4, this.y)
        context.lineTo(this.x + 4, this.y)
        context.moveTo(this.x, this.y - 4)
        context.lineTo(this.x, this.y + 4)
        context.stroke()
    }

    draw(context) {
        const currentAnimation = this.animations[this.direction][this.currentState]
        const [
            [x, y, width, height],
            [anchorX, anchorY]
        ] = this.spriteFrames[currentAnimation[this.animationFrameIndex]]
        context.drawImage(this.sprites, x, y, width, height, this.x - anchorX, this.y - anchorY, width, height)
        this.drawDebug(context)
    }
}