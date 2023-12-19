import { isKeyDown } from "./InputHandler.js";
import { FIGHTERDIRECTION } from "../constants/fighter.js";
import { PLAYERS } from "../constants/game.js";

export function forwardPress(playerNum, direction) {
    if (playerNum == PLAYERS.PLAYER_ONE) {
        if (direction == FIGHTERDIRECTION.RIGHT) {
            return isKeyDown('KeyD')
        } else {
            return isKeyDown('KeyA')
        }
        
    }
    else {
        if (direction == FIGHTERDIRECTION.RIGHT) {
            return isKeyDown('ArrowRight')
        } else {
            return isKeyDown('ArrowLeft')
        }
    }
}

export function backwardPress(playerNum, direction) {
    if (playerNum == PLAYERS.PLAYER_ONE) {
        if (direction == FIGHTERDIRECTION.RIGHT) {
            return isKeyDown('KeyA')
        } else {
            return isKeyDown('KeyD')
        }
    }
    else {
        if (direction == FIGHTERDIRECTION.RIGHT) {
            return isKeyDown('ArrowLeft')
        } else {
            return isKeyDown('ArrowRight')
        }
    }
}

export function upPress(playerNum) {
    if (playerNum == PLAYERS.PLAYER_ONE) {
        return isKeyDown('KeyW')
    }
    else {
        return isKeyDown('ArrowUp')
    }
}

export function groundAttackPress(playerNum) {
    if (playerNum == PLAYERS.PLAYER_ONE) {
        return isKeyDown('KeyF')
    }
    else {
        return isKeyDown('Period')
    }
}

