export const heldKeys = new Set()

export function isKeyDown(code) {
    return heldKeys.has(code)
}

export function isKeyUp(code) {
    return !heldKeys.has(code)
}

export function fightKeyDown(event) {
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
