import { FIGHTERDIRECTION, FIGHTERSTATE, } from "../constants/fighter.js";
import { Character } from "./Fighter.js";

export class Sanji extends Character {
    constructor(playerNumber, x, y) {
        super("Sanji", playerNumber, x, y)
        this.splash = document.querySelector("img[alt='sanji_splash']")
        this.sprites = document.querySelector("img[alt='sanji_sprites']")
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

            'right_ground_1': [[0, 364, 89, 90], [29, 90], [19, 17, 18, 64], [0, 0, 0, 0]],
            'right_ground_2': [[89, 364, 89, 90], [29, 90], [12, 21, 28, 60], [0, 0, 0, 0]],
            'right_ground_3': [[178, 364, 89, 90], [29, 90], [16, 23, 25, 60], [44, 38, 42, 18]],
            'right_ground_4': [[267, 364, 89, 90], [29, 90], [14, 26, 24, 60], [40, 40, 48, 16]],
            'right_ground_5': [[356, 364, 89, 90], [29, 90], [12, 21, 28, 60], [0, 0, 0, 0]],

            'left_ground_1': [[0, 455, 89, 90], [59, 90], [52, 17, 18, 64], [0, 0, 0, 0]],
            'left_ground_2': [[89, 455, 89, 90], [59, 90], [49, 21, 28, 60], [0, 0, 0, 0]],
            'left_ground_3': [[178, 455, 89, 90], [59, 90], [48, 23, 25, 60], [3, 38, 42, 18]],
            'left_ground_4': [[267, 455, 89, 90], [59, 90], [51, 26, 24, 60], [1, 40, 48, 16]],
            'left_ground_5': [[356, 455, 89, 90], [59, 90], [49, 21, 28, 60], [0, 0, 0, 0]],

            'right_flinch': [[0, 546, 59, 90], [29, 90], [0, 0, 0, 0], [0, 0, 0, 0]],

            'left_flinch': [[0, 637, 59, 90], [29, 90], [17, 10, 23, 75], [0, 0, 0, 0]],

            'right_jump_attack_1': [[0, 728, 89, 120], [29, 90], [19, 17, 18, 64], [0, 0, 0, 0]],
            'right_jump_attack_2': [[89, 728, 89, 120], [29, 90], [12, 21, 28, 60], [0, 0, 0, 0]],
            'right_jump_attack_3': [[178, 728, 89, 120], [29, 90], [16, 23, 25, 60], [44, 38, 42, 18]],
            'right_jump_attack_4': [[267, 728, 89, 120], [29, 90], [14, 26, 24, 60], [40, 40, 48, 16]],
            'right_jump_attack_5': [[356, 728, 89, 120], [29, 90], [12, 21, 28, 60], [0, 0, 0, 0]],

            'left_jump_attack_1': [[0, 849, 89, 120], [59, 90], [52, 17, 18, 64], [0, 0, 0, 0]],
            'left_jump_attack_2': [[89, 849, 89, 120], [59, 90], [49, 21, 28, 60], [0, 0, 0, 0]],
            'left_jump_attack_3': [[178, 849, 89, 120], [59, 90], [48, 23, 25, 60], [3, 38, 42, 18]],
            'left_jump_attack_4': [[267, 849, 89, 120], [59, 90], [51, 26, 24, 60], [1, 40, 48, 16]],
            'left_jump_attack_5': [[356, 849, 89, 120], [59, 90], [49, 21, 28, 60], [0, 0, 0, 0]],

            'right_land': [[0, 970, 59, 90], [29, 90], [17, 40, 23, 45], [0, 0, 0, 0]],

            'left_land': [[0, 1061, 59, 90], [29, 90], [17, 40, 23, 45], [0, 0, 0, 0]],
        }
        this.animations = {
            [FIGHTERDIRECTION.RIGHT]: {
                [FIGHTERSTATE.IDLE]: ['right_fwalk_1'],
                [FIGHTERSTATE.WALK_FORWARD]: ['right_fwalk_2', 'right_fwalk_3', 'right_fwalk_4', 'right_fwalk_5'],
                [FIGHTERSTATE.WALK_BACKWARD]: ['right_fwalk_5', 'right_fwalk_4', 'right_fwalk_3', 'right_fwalk_2'],
                [FIGHTERSTATE.JUMP]: ['right_jump_1', 'right_jump_2', 'right_jump_3', 'right_jump_4'],
                [FIGHTERSTATE.GROUND_ATTACK]: ['right_ground_1', 'right_ground_2', 'right_ground_3', 'right_ground_4', 'right_ground_5'],
                [FIGHTERSTATE.FLINCH]: ['right_flinch', 'right_flinch'],
                [FIGHTERSTATE.JUMP_ATTACK]: ['right_jump_attack_1', 'right_jump_attack_2', 'right_jump_attack_3', 'right_jump_attack_4'],
                [FIGHTERSTATE.LAND]: ['right_land', 'right_land']
            },
            [FIGHTERDIRECTION.LEFT]: {
                [FIGHTERSTATE.IDLE]: ['left_fwalk_1'],
                [FIGHTERSTATE.WALK_FORWARD]: ['left_fwalk_2', 'left_fwalk_3', 'left_fwalk_4', 'left_fwalk_5'],
                [FIGHTERSTATE.WALK_BACKWARD]: ['left_fwalk_5', 'left_fwalk_4', 'left_fwalk_3', 'left_fwalk_2'],
                [FIGHTERSTATE.JUMP]: ['left_jump_1', 'left_jump_2', 'left_jump_3', 'left_jump_4'],
                [FIGHTERSTATE.GROUND_ATTACK]: ['left_ground_1', 'left_ground_2', 'left_ground_3', 'left_ground_4', 'left_ground_5'],
                [FIGHTERSTATE.FLINCH]: ['left_flinch', 'left_flinch'],
                [FIGHTERSTATE.JUMP_ATTACK]: ['left_jump_attack_1', 'left_jump_attack_2', 'left_jump_attack_3', 'left_jump_attack_4'],
                [FIGHTERSTATE.LAND]: ['left_land', 'left_land']
            }
        }
    }
}