import { CHARACTERS, PLAYERS, STAGE } from "../constants/game.js"
import { Sanji } from "../fighter/Sanji.js"
import { Zoro } from "../fighter/Zoro.js"
import { FightState } from "./FightState.js"
import { GameState } from "./GameState.js"

export class CharSelectState extends GameState {
    constructor(game) {
        super(game)
        this.running = true
        this.characters = []
        this.currentCharacterIndex = 0
        this.characterSelectionMap = {}
        this.currentPlayerSelecting = PLAYERS.PLAYER_ONE
        this.initCharacters()
        this.initMap()
    }

    initCharacters() {
        for (const character in CHARACTERS) {
            this.characters.push(CHARACTERS[character])
        }
    }

    initMap() {
        for (const player in PLAYERS) {
            for (let i = 0; i < this.characters.length; i++) {
                if (!this.characterSelectionMap[PLAYERS[player]]) {
                    this.characterSelectionMap[PLAYERS[player]] = {}
                } 
                this.characterSelectionMap[PLAYERS[player]][this.characters[i]] = {
                    image: document.querySelector(`img[alt='${PLAYERS[player]}_${this.characters[i]}']`),
                    selected: false,
                }
            }  
        }
    }

    getFighterByName(player, name) {
        let startX = STAGE.P1_START_X
        if (player == PLAYERS.PLAYER_TWO) {
            startX = STAGE.P2_START_X
        }

        if (name == CHARACTERS.ZORO) {
            return new Zoro(this.currentPlayerSelecting, startX, STAGE.FLOOR_Y)
        }
        else if (name == CHARACTERS.SANJI) {
            return new Sanji(this.currentPlayerSelecting, startX, STAGE.FLOOR_Y)
        }        
    }

    draw() {
        this.context.drawImage(document.querySelector("img[alt='character_select']"), 0, 0)

        if (this.currentPlayerSelecting == PLAYERS.PLAYER_ONE) {
            this.context.drawImage(this.characterSelectionMap[this.currentPlayerSelecting][this.characters[this.currentCharacterIndex]].image, 0, 0)
        }
        else if (this.game.fighter1) {
            this.context.drawImage(this.characterSelectionMap[PLAYERS.PLAYER_ONE][this.game.fighter1.name].image, 0, 0)
        }
        
        if (this.currentPlayerSelecting == PLAYERS.PLAYER_TWO) {
            this.context.drawImage(this.characterSelectionMap[this.currentPlayerSelecting][this.characters[this.currentCharacterIndex]].image, 0, 0)
        }
        else if (this.game.fighter2) {
            this.context.drawImage(this.characterSelectionMap[PLAYERS.PLAYER_TWO][this.game.fighter2.name].image, 0, 0)
        }
        
    }

    checkTransition() {
        if (this.game.fighter1 && this.game.fighter2) {
            window.removeEventListener('keydown', this.game.inputHandler)
            this.running = false
            const fightState = new FightState(this.game)
            fightState.enterState()
        }
    }

    update() {
    }

    frame() {
        this.checkTransition()
        if (this.running) {
            window.requestAnimationFrame(this.frame.bind(this))
        }
        this.update()
        this.draw()
    }

    handleKeydown(event) {
        if (this.currentPlayerSelecting == PLAYERS.PLAYER_ONE) {
            if (event.code == "KeyG") {
                this.game.fighter1 = this.getFighterByName(this.currentPlayerSelecting, this.characters[this.currentCharacterIndex])
                this.currentPlayerSelecting = PLAYERS.PLAYER_TWO
                this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length
            }
            if (event.code == "KeyA") {
                this.currentCharacterIndex = this.currentCharacterIndex - 1
                if (this.currentCharacterIndex < 0) {
                    this.currentCharacterIndex = this.characters.length - 1
                }
            }
            if (event.code == "KeyD") {
                this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length
            }
        }
        if (this.currentPlayerSelecting == PLAYERS.PLAYER_TWO) {
            if (event.code == "Slash") {
                this.game.fighter2 = this.getFighterByName(this.currentPlayerSelecting, this.characters[this.currentCharacterIndex])
            }
            if (event.code == "ArrowLeft") {
                this.currentCharacterIndex = this.currentCharacterIndex - 1
                if (this.currentCharacterIndex < 0) {
                    this.currentCharacterIndex = this.characters.length - 1
                }
            }
            if (event.code == "ArrowRight") {
                this.currentCharacterIndex = (this.currentCharacterIndex + 1) % this.characters.length
            }
        }
        
    }

    registerEventListener(eventListener) {
        this.game.inputHandler = eventListener
        window.addEventListener('keydown', this.game.inputHandler)
    }

    enterState() {
        this.registerEventListener(this.handleKeydown.bind(this))
        window.requestAnimationFrame(this.frame.bind(this))
    }
}