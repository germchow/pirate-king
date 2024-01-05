export const heldKeys = new Set()

export function emptyKeys() {
    heldKeys.clear()
}

export function isKeyDown(code) {
    return heldKeys.has(code)
}

export function isKeyUp(code) {
    return !heldKeys.has(code)
}

export function fightKeyDown(event) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
    }
    heldKeys.add(event.code)
}

export function fightKeyUp(event) {
    heldKeys.delete(event.code)
}

export function registerFighterControls() {
    window.addEventListener('keydown', fightKeyDown)
    window.addEventListener('keyup', fightKeyUp)
}

export function unregisterFighterControls() {
    window.removeEventListener('keydown', fightKeyDown)
    window.removeEventListener('keyup', fightKeyUp)
}
