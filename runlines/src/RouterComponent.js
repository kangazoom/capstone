import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Welcome from './Components/Welcome';
import ChooseCharacter from './Components/ChooseCharacter';
import ScriptContainer from './Components/ScriptContainer';
import TestMemoryContainer from './Components/TestMemoryContainer';
import ResultsContainer from './Components/ResultsContainer';
import TextForm from './Components/TextForm';


const RouterComponent = () => {
  return (
      <Router>
    <Scene 
    key="root" 
    navigationBarStyle={{backgroundColor: "#BEBBBB", borderBottomWidth: 5, borderColor: '#fff'}} 
    titleStyle= {{color: "#fff", fontSize: 20, fontFamily: 'Verdana', fontWeight: '100'}}
    navBarButtonColor = "#333">

        <Scene 
            key="welcome"
            title="Welcome"
            component={Welcome}
            initial={true} />
        <Scene
            key="textForm"
            component={TextForm}
            title="Add Dialogue"
        />
        <Scene 
            key="chooseCharacter"
            title="Select Character"
            component={ChooseCharacter}
        />
        <Scene
            key="scriptContainer"
            title="Select Line"
            component={ScriptContainer}/>
        <Scene
            key="testMemoryContainer"
            title="Practice"
            component={TestMemoryContainer}/>
        <Scene
            key="resultsContainer"
            title="Results"
            component={ResultsContainer} />

    </Scene>
    </Router>
    );
};

export default RouterComponent;