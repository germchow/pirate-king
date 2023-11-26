import { isKeyDown } from "./InputHandler.js";
import { FighterDirection } from "./constants/fighter.js";

export function forwardPress(playerNum, direction) {
    if (playerNum == 1) {
        if (direction == FighterDirection.RIGHT) {
            return isKeyDown('KeyD')
        } else {
            return isKeyDown('KeyA')
        }
        
    }
    else {
        if (direction == FighterDirection.RIGHT) {
            return isKeyDown('ArrowRight')
        } else {
            return isKeyDown('ArrowLeft')
        }
    }
}

export function backwardPress(playerNum, direction) {
    if (playerNum == 1) {
        if (direction == FighterDirection.RIGHT) {
            return isKeyDown('KeyA')
        } else {
            return isKeyDown('KeyD')
        }
    }
    else {
        if (direction == FighterDirection.RIGHT) {
            return isKeyDown('ArrowLeft')
        } else {
            return isKeyDown('ArrowRight')
        }
    }
}

export function upPress(playerNum) {
    if (playerNum == 1) {
        return isKeyDown('KeyW')
    }
    else {
        return isKeyDown('ArrowUp')
    }
}

