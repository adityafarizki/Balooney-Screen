import * as React from "react"
import { WaitScreen } from "./screens/waitScreen"
import { GameStatus, ScreenInterface } from "./screens/screenInterface"

export class MainController extends React.Component {
    comm: WebSocket
    currentScreen: ScreenInterface
    players: Player[]
    gameState: GameStatus

    constructor(props: Object) {
        super(props)
        this.gameState = GameStatus.initiating
        this.players = []
        this.currentScreen = new WaitScreen({
            gameStatus: this.gameState,
            players: this.players
        })
        this.initWebSocketConn()
    }

    initWebSocketConn() {
        let url: string = window.location.host
        let protocol: string = "wss"
        let port: string = window.location.port
        let webSocketUrl: string = protocol + "://" + url + ":" + port

        this.comm = new WebSocket(webSocketUrl)
        this.comm.onmessage = (event) => {
            this.handleMessage(event)
        }
    }

    handleMessage(event: MessageEvent) {
        try {
            let gameMsg: any = JSON.parse(event.data)
            this.processMessage(gameMsg)
        } catch (e) {
            let errorMsg = {
                statusCode: 400,
                error: "error occured: " + e
            }
            this.comm.send(JSON.stringify(errorMsg))
            return
        }
    }

    processMessage(msg: any) {
        switch(msg.action) {
            case "add_player":
                this.updatePlayers(msg.players)
                break
            default:
                throw Error("unknown action")
        }      
    }

    updatePlayers(players: Player[]) {
        this.players = players
        let updateScreenMsg = {
            action: "add_player",
            players: players
        }
        this.currentScreen.handleMessage(updateScreenMsg)
    }

    render(): React.ReactNode {
        return this.currentScreen.render()
    }
}