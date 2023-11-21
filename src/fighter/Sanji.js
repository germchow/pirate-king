import { FighterState } from "../constants/fighter.js";
import { Character } from "./Fighter.js";

export class Sanji extends Character {
    constructor(playerNumber, x, y) {
        super("Sanji", playerNumber, x, y)
        this.sprites = document.querySelector("img[alt='sanji']")
        this.spriteFrames = {
            'walk_1': [[0, 0, 59, 90], [30, 90]],
            'walk_2': [[59, 0, 59, 90], [30, 90]],
            'walk_3': [[118, 0, 59, 90], [30, 90]],
            'walk_4': [[177, 0, 59, 90], [30, 90]],
            'walk_5': [[236, 0, 59, 90], [30, 90]]
        }
        this.animations = {
            [FighterState.IDLE]: ['walk_1'],
            [FighterState.WALK_FORWARD]: ['walk_1', 'walk_2', 'walk_3', 'walk_4', 'walk_5'],
            [FighterState.WALK_BACKWARD]: ['walk_5', 'walk_4', 'walk_3', 'walk_2', 'walk_1'],
            [FighterState.JUMP]: ['walk_1'],
        }
    }
}