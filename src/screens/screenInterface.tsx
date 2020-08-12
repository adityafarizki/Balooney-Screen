import * as React from "react"

export enum GameStatus {
    initiating = "INITIATING",
    running = "RUNNING",
    waiting = "WAITING"
}

export interface Props {
    gameStatus: GameStatus,
    players: Player[]
}

export interface State {
    screenStatus: string,
    playersState: any
}

export interface ScreenInterface {
    render: () => React.ReactNode,
    handleMessage: (msg: any) => void
}