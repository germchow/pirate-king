export const heldKeys = new Set()

export function handleKeyDown(event) {
    heldKeys.add(event.code)
}

export function handleKeyUp(event) {
    heldKeys.delete(event.code)
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
}

export function isKeyDown(code) {
    return heldKeys.has(code)
}

export function isKeyUp(code) {
    return !heldKeys.has(code)
}