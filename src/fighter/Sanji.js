import { FighterDirection, FighterState } from "../constants/fighter.js";
import { Character } from "./Fighter.js";

export class Sanji extends Character {
    constructor(playerNumber, x, y) {
        super("Sanji", playerNumber, x, y)
        this.sprites = document.querySelector("img[alt='sanji']")
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

            'right_jump_1': [[0, 182, 59, 90], [30, 90]],
            'right_jump_2': [[59, 182, 59, 90], [30, 90]],
            'right_jump_3': [[118, 182, 59, 90], [30, 90]],
            'right_jump_4': [[177, 182, 59, 90], [30, 90]],

            'left_jump_1': [[0, 273, 59, 90], [30, 90]],
            'left_jump_2': [[59, 273, 59, 90], [30, 90]],
            'left_jump_3': [[118, 273, 59, 90], [30, 90]],
            'left_jump_4': [[177, 273, 59, 90], [30, 90]],

            'right_ground_1': [[0, 364, 89, 90], [30, 90]],
            'right_ground_2': [[89, 364, 89, 90], [30, 90]],
            'right_ground_3': [[178, 364, 89, 90], [30, 90]],
            'right_ground_4': [[267, 364, 89, 90], [30, 90]],
            'right_ground_5': [[356, 364, 89, 90], [30, 90]],

            'left_ground_1': [[0, 455, 89, 90], [59, 90]],
            'left_ground_2': [[89, 455, 89, 90], [59, 90]],
            'left_ground_3': [[178, 455, 89, 90], [59, 90]],
            'left_ground_4': [[267, 455, 89, 90], [59, 90]],
            'left_ground_5': [[356, 455, 89, 90], [59, 90]],
        }
        this.animations = {
            [FighterDirection.RIGHT]: {
                [FighterState.IDLE]: ['right_fwalk_1'],
                [FighterState.WALK_FORWARD]: ['right_fwalk_1', 'right_fwalk_2', 'right_fwalk_3', 'right_fwalk_4', 'right_fwalk_5'],
                [FighterState.WALK_BACKWARD]: ['right_fwalk_5', 'right_fwalk_4', 'right_fwalk_3', 'right_fwalk_2', 'right_fwalk_1'],
                [FighterState.JUMP]: ['right_jump_1', 'right_jump_2', 'right_jump_3', 'right_jump_4'],
                [FighterState.GROUND_ATTACK]: ['right_ground_1', 'right_ground_2', 'right_ground_3', 'right_ground_4', 'right_ground_5']
            },
            [FighterDirection.LEFT]: {
                [FighterState.IDLE]: ['left_fwalk_1'],
                [FighterState.WALK_FORWARD]: ['left_fwalk_1', 'left_fwalk_2', 'left_fwalk_3', 'left_fwalk_4', 'left_fwalk_5'],
                [FighterState.WALK_BACKWARD]: ['left_fwalk_5', 'left_fwalk_4', 'left_fwalk_3', 'left_fwalk_2', 'left_fwalk_1'],
                [FighterState.JUMP]: ['left_jump_1', 'left_jump_2', 'left_jump_3', 'left_jump_4'],
                [FighterState.GROUND_ATTACK]: ['left_ground_1', 'left_ground_2', 'left_ground_3', 'left_ground_4', 'left_ground_5']
            }
        }
    }
}