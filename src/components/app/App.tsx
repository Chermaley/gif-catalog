import React from "react";
import {Actions} from "../actions/Actions";
import {Alert} from "../alert/Alert";
import {GifsContainer} from "../gifs/gifsContainer";

import "./App.scss";

export const App = () => {
    return (
        <div className="App">
            <Actions/>
            <GifsContainer/>
            <Alert/>
        </div>
    );
};

