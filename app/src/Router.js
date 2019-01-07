import React from 'react';
import ScriptContainer from './components/ScriptContainer';
import Header from './components/Header';
import { Scene, Router } from 'react-native-router-flux';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="root">
    <Scene key="script" component={ScriptContainer} title="I am a script" initial />
    <Scene key="header" component={Header} title="Header, duy" headerText={"CAN YOU SEE ME?"} />
            </Scene>
        </Router>

    );
}

export default RouterComponent;