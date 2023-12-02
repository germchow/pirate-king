
export function areColliding(box1, box2) {
    if (box1 == {x: 0, y: 0, width: 0, height: 0} || box2 == {x: 0, y: 0, width: 0, height: 0}) {
        return false
    }
    if (box1.x < box2.x + box2.width &&
        box1.x + box1.width > box2.x &&
        box1.y < box2.y + box2.height &&
        box1.y + box1.height > box2.y) {
            return true
        } else {
            return false
        }
}