import { FighterDirection, FighterState } from "../constants/fighter.js";
import { Character } from "./Fighter.js";

export class Zoro extends Character {
    constructor(playerNumber, x, y) {
        super("Zoro", playerNumber, x, y)
        this.sprites = document.querySelector("img[alt='zoro']")
        this.spriteFrames = {
            'right_fwalk_1': [[0, 0, 59, 90], [30, 90]],
            'right_fwalk_2': [[59, 0, 59, 90], [30, 90]],
            'right_fwalk_3': [[118, 0, 59, 90], [30, 90]],
            'right_fwalk_4': [[177, 0, 59, 90], [30, 90]],
            'right_fwalk_5': [[236, 0, 59, 90], [30, 90]],
            'left_fwalk_1': [[0, 91, 59, 90], [30, 90]],
            'left_fwalk_2': [[59, 91, 59, 90], [30, 90]],
            'left_fwalk_3': [[118, 91, 59, 90], [30, 90]],
            'left_fwalk_4': [[177, 91, 59, 90], [30, 90]],
            'left_fwalk_5': [[236, 91, 59, 90], [30, 90]],
        }
        this.animations = {
            [FighterDirection.RIGHT]: {
                [FighterState.IDLE]: ['right_fwalk_1'],
                [FighterState.WALK_FORWARD]: ['right_fwalk_1', 'right_fwalk_2', 'right_fwalk_3', 'right_fwalk_4', 'right_fwalk_5'],
                [FighterState.WALK_BACKWARD]: ['right_fwalk_5', 'right_fwalk_4', 'right_fwalk_3', 'right_fwalk_2', 'right_fwalk_1'],
                [FighterState.JUMP]: ['right_fwalk_1'],
            },
            [FighterDirection.LEFT]: {
                [FighterState.IDLE]: ['left_fwalk_1'],
                [FighterState.WALK_FORWARD]: ['left_fwalk_1', 'left_fwalk_2', 'left_fwalk_3', 'left_fwalk_4', 'left_fwalk_5'],
                [FighterState.WALK_BACKWARD]: ['left_fwalk_5', 'left_fwalk_4', 'left_fwalk_3', 'left_fwalk_2', 'left_fwalk_1'],
                [FighterState.JUMP]: ['left_fwalk_1'],
            }
        }
 
    }
}