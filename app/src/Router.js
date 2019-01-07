import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import FireBaseService from './components/Network/FireBaseService';


import Header from './components/Header';
import Welcome from './components/Welcome';
import ChooseCharacter from './components/ChooseCharacter';
import ScriptContainer from './components/ScriptContainer';
import TestMemoryContainer from './components/TestMemoryContainer';
import ResultsContainer from './components/TestMemoryContainer';

class RouterComponent extends Component {
    constructor() {
        super()
        this.state = {
            scripts: []
        }
    }

      componentDidMount() {
    const me = this;
    FireBaseService.initializeService()
    FireBaseService.getScripts()
    .then((scriptsArray) => {
      me.setState({
        scripts: scriptsArray
      });
      // Actions.header();
    })
    .catch((error) => {
      // todo: error handling
    })
  }

//   renderLines() {
//     return this.state.scripts.map(script => <ScriptLineDetail key={script.title} text={script} />)
//   }
    render() {

    // QUESTION: WHY DOES THE CODE STOP WORKING IF I REMOVE THIS?
    // HOW DOES IT ENSURE THE COMPONENT LOADS FIRST???
    if (this.state.scripts.length === 0) {
      console.log('DID NOT LOAD')
      return null;
    }
    // NOTE: working with lines first
    // console.log(JSON.stringify(this.state.scripts[1].title))
    
    // console.log(this.state.scripts[0].title)
        return (
            <Router>
                <Scene key="root">
                    <Scene key="welcome" 
                    component={Welcome} title="Welcome!" 
                    scriptCollection = {this.state.scripts}
                    initial />
                    <Scene key="chooseCharacter" component={ChooseCharacter} title="Choose a Character:" />
                    <Scene key="scriptContainer" component={ScriptContainer} title="Select A Line to Study:" />
                    <Scene key="TestMemoryContainer" component={TestMemoryContainer} title="Test Your Memory" />
                    <Scene key="ResultsContainer" component={ResultsContainer} title="Results: XX% Accurate" />
                </Scene>
            </Router>

        );
    }
}

export default RouterComponent;