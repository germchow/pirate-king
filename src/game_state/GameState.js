export class GameState {
    constructor(game) {
        this.game = game
        this.context = game.context
    }

    enterState() {
        // this.game.gameStateStack.push(self)
        // console.log('enterState done')
    }

    exitState() {
        // this.game.gameStateStack.pop()
    }

    draw() {
        //pass
    }

    update() {
        //pass
    }
}