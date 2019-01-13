
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import FireBaseService from './Network/FireBaseService';

// import Header from './src/components/Welcome';
import Welcome from './Components/Welcome';
import ChooseCharacter from './Components/ChooseCharacter';
import ScriptContainer from './Components/ScriptContainer';
import TestMemoryContainer from './Components/TestMemoryContainer';
import ResultsContainer from './Components/TestMemoryContainer';

// import {Actions} from 'react-native-router-flux';

class App extends Component {  
  constructor() {
    super()
    this.state = {
        scripts: [],
        selectedScript: null,
        selectedCharacter: null,
        selectedLine: null,
    }
}


// GRAB SCRIPTS

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

// ----- SCRIPT SELECTION ----- //

findScript = (scriptID) => {
  return this.state.scripts.find(script => script.id === scriptID)
}

setSelectedScript = (ScriptID) => {
  let clickedScript = this.findScript(ScriptID)
  // console.log(clickedScript)
  this.setState({
      selectedScript: clickedScript
  })
}


// ----- CHARACTER SELECTION ----- //

// findCharacter = (scriptID) => {
//     return this.state.scripts.find(script => script.id === scriptID)
//     // this.props.selectedCustomerCB(clickedCustomer)
// }

setSelectedCharacter = (characterName) => {
    console.log(characterName)

  this.setState({
      selectedCharacter: characterName
  });
}



render() {

console.log('From App.js: this.state.selectedScript.title')
{this.state.selectedScript !== null ? console.log(this.state.selectedScript.title) : null}
console.log('From App.js: this.state.selectedCharacter')
console.log(this.state.selectedCharacter)

// I think I need this so that stuff doesn't render before the scripts do
  if (this.state.scripts.length === 0) {
      return null;
  }

    return (
// originally, i had these props lined up with the scenes,
// but i don't think it matters

      <Router
      // text='hi'
      scriptCollection={this.state.scripts}
      selectedScript={this.state.selectedScript}
      selectedCharacter={this.state.selectedCharacter}
      getNewer = {() => this.state}
      selectScriptCB={this.setSelectedScript}
      selectCharacterCB={this.setSelectedCharacter}
      // {...this.state}
      >
      <Scene key="root">
          <Scene key="welcome"
              title="Welcome!"
              // onExit={() => Actions.refresh(this.state)}
              component={Welcome}
              // scriptCollection={this.state.scripts}
              // selectedScript={this.state.selectedScript}
              // selectedCharacter={this.state.selectedCharacter}
              // selectScriptCB={this.setSelectedScript}
              initial={true}/>
          <Scene key="chooseCharacter"
              title="Choose a Character:"
              // onEnter={() => Actions.refresh(this.state)}
              component={ChooseCharacter}
              // selectedScript={this.state.selectedScript}
              // selectedCharacter={this.state.selectedCharacter}
              // selectCharacterCB={this.setSelectedCharacter}
              // getNewer = {() => this.state}
              />
          <Scene
              key="scriptContainer"
              title="Select A Line to Study:"
              // onEnter={() => Actions.refresh(this.state)}
              component={ScriptContainer}
              scriptLines={this.state.scripts[1]}/>
          <Scene key="TestMemoryContainer" component={TestMemoryContainer} title="Test Your Memory" />
          <Scene key="ResultsContainer" component={ResultsContainer} title="Results: XX% Accurate" />
      </Scene>
  </Router>
 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  scriptText: {
    textAlign: 'left',
    color: '#333333',
    marginLeft: 5,
    marginRight: 5,
  },

  eachLine: {
    textAlign: 'left',
    color: '#333333',
    marginTop: 5,
    marginBottom: 5,
  },
});


export default App;
