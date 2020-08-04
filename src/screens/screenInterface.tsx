export enum GameStatus {
    initiating = "INITIATING",
    running = "RUNNING",
    waiting = "WAITING"
}

export interface Props {
    gameStatus: GameStatus,
    playersStatus: Object
}

export interface State {
    screenStatus: string,
    playersState: Object
}