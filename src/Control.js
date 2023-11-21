import { isKeyDown } from "./InputHandler.js";

export function forwardPress(playerNum, direction) {
    if (playerNum == 1) {
        if (direction == 1) {
            return isKeyDown('KeyD')
        } else {
            return isKeyDown('KeyA')
        }
        
    }
    else {
        if (direction == 1) {
            return isKeyDown('ArrowRight')
        } else {
            return isKeyDown('ArrowLeft')
        }
    }
}

export function backwardPress(playerNum, direction) {
    if (playerNum == 1) {
        if (direction == 1) {
            return isKeyDown('KeyA')
        } else {
            return isKeyDown('KeyD')
        }
    }
    else {
        if (direction == 1) {
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

