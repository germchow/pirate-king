import { FIGHTERDIRECTION, FIGHTERSTATE, } from "../constants/fighter.js";
import { Character } from "./Fighter.js";

export class Zoro extends Character {
    constructor(playerNumber, x, y) {
        super("Zoro", playerNumber, x, y)
        this.sprites = document.querySelector("img[alt='zoro']")
        this.spriteFrames = {
            'right_fwalk_1': [[0, 0, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'right_fwalk_2': [[59, 0, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'right_fwalk_3': [[118, 0, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'right_fwalk_4': [[177, 0, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'right_fwalk_5': [[236, 0, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],

            'left_fwalk_1': [[0, 91, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'left_fwalk_2': [[59, 91, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'left_fwalk_3': [[118, 91, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'left_fwalk_4': [[177, 91, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],
            'left_fwalk_5': [[236, 91, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],

            'right_jump_1': [[0, 182, 59, 90], [29, 90], [17, 13, 23, 60], [0, 0, 0, 0]],
            'right_jump_2': [[59, 182, 59, 90], [29, 90], [17, 13, 23, 60], [0, 0, 0, 0]],
            'right_jump_3': [[118, 182, 59, 90], [29, 90], [17, 13, 23, 60], [0, 0, 0, 0]],
            'right_jump_4': [[177, 182, 59, 90], [29, 90], [17, 13, 23, 60], [0, 0, 0, 0]],

            'left_jump_1': [[0, 273, 59, 90], [29, 90], [18, 13, 23, 60], [0, 0, 0, 0]],
            'left_jump_2': [[59, 273, 59, 90], [29, 90], [18, 13, 23, 60], [0, 0, 0, 0]],
            'left_jump_3': [[118, 273, 59, 90], [29, 90], [18, 13, 23, 60], [0, 0, 0, 0]],
            'left_jump_4': [[177, 273, 59, 90], [29, 90], [18, 13, 23, 60], [0, 0, 0, 0]],

            'right_ground_1': [[0, 364, 89, 90], [29, 90], [28, 20, 30, 64], [0, 0, 0, 0]],
            'right_ground_2': [[89, 364, 89, 90], [29, 90], [31, 34, 38, 54], [0, 0, 0, 0]],
            'right_ground_3': [[178, 364, 89, 90], [29, 90], [30, 39, 40, 46], [74, 28, 14, 46]],
            'right_ground_4': [[267, 364, 89, 90], [29, 90], [31, 34, 42, 50], [66, 24, 20, 46]],
            'right_ground_5': [[356, 364, 89, 90], [29, 90], [25, 28, 35, 55], [0, 0, 0, 0]],

            'left_ground_1': [[0, 455, 89, 90], [59, 90], [31, 20, 30, 64], [0, 0, 0, 0]],
            'left_ground_2': [[89, 455, 89, 90], [59, 90], [20, 34, 38, 54], [0, 0, 0, 0]],
            'left_ground_3': [[178, 455, 89, 90], [59, 90], [19, 39, 40, 46], [1, 28, 14, 46]],
            'left_ground_4': [[267, 455, 89, 90], [59, 90], [16, 34, 42, 50], [3, 24, 20, 46]],
            'left_ground_5': [[356, 455, 89, 90], [59, 90], [29, 28, 35, 55], [0, 0, 0, 0]],
        }
        this.animations = {
            [FIGHTERDIRECTION.RIGHT]: {
                [FIGHTERSTATE.IDLE]: ['right_fwalk_1'],
                [FIGHTERSTATE.WALK_FORWARD]: ['right_fwalk_1', 'right_fwalk_2', 'right_fwalk_3', 'right_fwalk_4', 'right_fwalk_5'],
                [FIGHTERSTATE.WALK_BACKWARD]: ['right_fwalk_5', 'right_fwalk_4', 'right_fwalk_3', 'right_fwalk_2', 'right_fwalk_1'],
                [FIGHTERSTATE.JUMP]: ['right_jump_1', 'right_jump_2', 'right_jump_3', 'right_jump_4'],
                [FIGHTERSTATE.GROUND_ATTACK]: ['right_ground_1', 'right_ground_2', 'right_ground_3', 'right_ground_4', 'right_ground_5']
            },
            [FIGHTERDIRECTION.LEFT]: {
                [FIGHTERSTATE.IDLE]: ['left_fwalk_1'],
                [FIGHTERSTATE.WALK_FORWARD]: ['left_fwalk_1', 'left_fwalk_2', 'left_fwalk_3', 'left_fwalk_4', 'left_fwalk_5'],
                [FIGHTERSTATE.WALK_BACKWARD]: ['left_fwalk_5', 'left_fwalk_4', 'left_fwalk_3', 'left_fwalk_2', 'left_fwalk_1'],
                [FIGHTERSTATE.JUMP]: ['left_jump_1', 'left_jump_2', 'left_jump_3', 'left_jump_4'],
                [FIGHTERSTATE.GROUND_ATTACK]: ['left_ground_1', 'left_ground_2', 'left_ground_3', 'left_ground_4', 'left_ground_5']
            }
        }
 
    }
}