import { backwardPress, forwardPress, groundAttackPress, upPress, } from "../util/Control.js";
import { FIGHTERDIRECTION, FIGHTERSTATE } from "../constants/fighter.js"
import { GRAVITY, STAGE } from "../constants/game.js"

export class Character {
    constructor(name, playerNumber, x, y) {
        this.name = name
        this.playerNumber = playerNumber;
        this.x = x
        this.y = y
        this.velocity = {x: 0, y: 0}
        this.direction = FIGHTERDIRECTION.RIGHT

        this.sprites = new Image()
        this.spriteFrames = {}
        this.animations = {}
        this.currentAnimation = {}
        this.animationFrameIndex = 0
        this.framesElapsed = 0
        this.framesHold = 10

        this.hitbox = []
        this.hurtbox = []

        this.states = {
            [FIGHTERSTATE.IDLE]: {
                enterState: () => {
                    this.velocity.x = 0
                },
                updateState: () => {
                    if (upPress(this.playerNumber) || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FIGHTERSTATE.JUMP)
                    }
                    else if (backwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FIGHTERSTATE.WALK_BACKWARD)
                    }
                    else if (forwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FIGHTERSTATE.WALK_FORWARD)
                    }
                    else if (groundAttackPress(this.playerNumber)) {
                        this.changeState(FIGHTERSTATE.GROUND_ATTACK)
                    }
                }
            },
            [FIGHTERSTATE.WALK_FORWARD]: {
                enterState: () => {
                    this.velocity.x = this.correctVelocityDirection(2)
                },
                updateState: () => {
                    if (upPress(this.playerNumber) || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FIGHTERSTATE.JUMP)
                    }
                    else if (!forwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FIGHTERSTATE.IDLE)
                    }
                    else if (groundAttackPress(this.playerNumber, this.direction)) {
                        this.changeState(FIGHTERSTATE.GROUND_ATTACK)
                    }
                }
            },
            [FIGHTERSTATE.WALK_BACKWARD]: {
                enterState: () => {
                    this.velocity.x = this.correctVelocityDirection(-2)
                },
                updateState: () => {
                    if (upPress(this.playerNumber) || this.y < STAGE.FLOOR_Y) {
                        this.changeState(FIGHTERSTATE.JUMP)
                    }
                    else if (!backwardPress(this.playerNumber, this.direction)) {
                        this.changeState(FIGHTERSTATE.IDLE)
                    }
                    else if (groundAttackPress(this.playerNumber, this.direction)) {
                        this.changeState(FIGHTERSTATE.GROUND_ATTACK)
                    }
                }
            },
            [FIGHTERSTATE.JUMP]: {
                enterState: () => {
                    this.y -= 1
                    this.velocity.y = -12
                },
                updateState: () => {
                    if (this.y >= STAGE.FLOOR_Y) {
                        this.changeState(FIGHTERSTATE.IDLE)
                    }
                    this.velocity.y += GRAVITY
                }
            },
            [FIGHTERSTATE.GROUND_ATTACK]: {
                enterState: () => {
                },
                updateState: () => {
                    if (this.animationFrameIndex == this.animations[this.direction][this.currentState].length) {
                        this.changeState(FIGHTERSTATE.IDLE)
                    }
                }
            }
        }
        this.currentState = FIGHTERSTATE.IDLE
        
    }

    changeState(state) {
        this.animationFrameIndex = 0
        this.framesElapsed = 0
        this.currentState = state
        this.states[this.currentState].enterState()
    }

    correctVelocityDirection(velocity){
        if (this.direction == FIGHTERDIRECTION.RIGHT) {
            return velocity
        } else {
            return -velocity
        }
    }

    updateDirection(otherPlayer) {
        if (this.currentState != FIGHTERSTATE.JUMP && otherPlayer.currentState != FIGHTERSTATE.JUMP) {
            if (this.x < otherPlayer.x) {
                this.direction = FIGHTERDIRECTION.RIGHT
            } else {
                this.direction = FIGHTERDIRECTION.LEFT
            }
        }
    }

    update(otherPlayer) {
        this.updateDirection(otherPlayer)
        this.states[this.currentState].updateState()

        this.x += this.velocity.x
        this.y = Math.min(this.y + this.velocity.y, STAGE.FLOOR_Y)
    }

    drawAnchor(context) {
        context.lineWidth = 2
        context.beginPath()
        context.strokeStyle = 'pink'
        context.moveTo(this.x - 4, this.y)
        context.lineTo(this.x + 4, this.y)
        context.moveTo(this.x, this.y - 4)
        context.lineTo(this.x, this.y + 4)
        context.stroke()
    }

    drawHurtbox(context) {
        context.beginPath()
        context.strokeStyle = 'lime'
        context.rect(this.hurtbox.x, this.hurtbox.y, this.hurtbox.width, this.hurtbox.height)
        context.stroke()
    }

    drawHitBox(context) {
        context.beginPath()
        context.strokeStyle = 'red'
        context.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height)
        context.stroke()
    }

    draw(context) {
        if (this.animationFrameIndex == this.animations[this.direction][this.currentState].length) {
            this.animationFrameIndex = 0
        }

        const currentAnimation = this.animations[this.direction][this.currentState]
        const [
            [x, y, width, height],
            [anchorX, anchorY],
            [hurtboxX, hurtboxY, hurtboxWidth, hurtboxHeight],
            [hitboxX, hitboxY, hitboxWidth, hitboxHeight],
        ] = this.spriteFrames[currentAnimation[this.animationFrameIndex]]

        this.hurtbox = {x: this.x - anchorX + hurtboxX, y: this.y - anchorY + hurtboxY, width: hurtboxWidth, height: hurtboxHeight}
        this.hitbox = {x: this.x - anchorX + hitboxX, y: this.y - anchorY + hitboxY, width: hitboxWidth, height: hitboxHeight}

        context.drawImage(this.sprites, x, y, width, height, this.x - anchorX, this.y - anchorY, width, height)
        this.drawAnchor(context)
        this.drawHurtbox(context)
        this.drawHitBox(context)

        if (this.framesElapsed % this.framesHold == 0) {
            this.framesElapsed = 0
            this.animationFrameIndex++
        }
        this.framesElapsed++
    }
}