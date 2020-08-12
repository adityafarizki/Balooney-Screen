import * as React from "react";
import { Props, State, ScreenInterface } from "./screenInterface";

export class WaitScreen
    extends React.Component<Props, State>
    implements ScreenInterface {

    render(): React.ReactNode {
        return <h1>Hello World!</h1>
    }

    handleMessage(msg: any) {
        
    }
}

