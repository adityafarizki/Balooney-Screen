import { MainController } from "mainController"
import WS from "jest-websocket-mock"

describe(".initWebSocketConn", () => {
    it("connects to the websocket on the same host as site", async done => {
        let oldLocation = window.location
        Object.defineProperty(window, "location", {
            writable: true,
            value: { ...oldLocation, host: "localhost", port: "8080" }
        })
        let ws = new WS("wss://localhost:8080")

        new MainController({})
        await ws.connected

        done();
    })
})