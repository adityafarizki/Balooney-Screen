import * as React from "react";
import * as ReactDOM from "react-dom";

import { WaitScreen } from "./screens/waitScreen";
import { GameStatus } from "./screens/screenInterface";

class MainController extends React.Component {
    comm: WebSocket;
    currentScreen: typeof React.Component;

    constructor(props: Object) {
        super(props);
        this.currentScreen = WaitScreen;
        this.initWebSocketConn();
    }

    initWebSocketConn() {
        let url: string = window.location.host;
        let protocol: string = 'wss';
        let webSocketUrl: string = protocol + url;

        this.comm = new WebSocket(webSocketUrl)
    }

    render(): React.ReactNode {
        return <this.currentScreen gameStatus={GameStatus.initiating} players={{}}></this.currentScreen>
    }
}

ReactDOM.render(
    <MainController/>,
    document.getElementById("app")
);