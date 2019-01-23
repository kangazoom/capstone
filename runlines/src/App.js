
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import FireBaseService from './Network/FireBaseService';

// import Header from './src/components/Welcome';
import Welcome from './Components/Welcome';
import ChooseCharacter from './Components/ChooseCharacter';
import ScriptContainer from './Components/ScriptContainer';
import TestMemoryContainer from './Components/TestMemoryContainer';
import ResultsContainer from './Components/ResultsContainer';
import TextForm from './Components/TextForm';

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

    // setTester = (testerText) => {
    //     console.log(testerText)

    //   this.setState({
    //       tester: testerText
    //   });
    // }



    render() {

        // stuff doesn't render before the scripts do
        if (this.state.scripts.length === 0) {
            return null;
        }

        return (

            <Router
                // sceneStyle={{ paddingTop: 100 }}
                scriptCollection={this.state.scripts}
                selectedScript={this.state.selectedScript}
                selectedCharacter={this.state.selectedCharacter}
                selectedLine={this.state.selectedLine}
                selectScriptCB={this.setSelectedScript}
                selectCharacterCB={this.setSelectedCharacter}>

                <Scene 
                key="root" 
                navigationBarStyle={{backgroundColor: "#BEBBBB", borderBottomWidth: 5, borderColor: '#fff'}} 
                titleStyle= {{color: "#fff", fontSize: 20, fontFamily: 'Verdana', fontWeight: '100'}}
                navBarButtonColor = "#fff">

                    <Scene 
                        key="welcome"
                        title="Welcome"
                        // onEnter={() => Actions.refresh(this.state)}
                        component={Welcome}
                        initial={true} />
                    <Scene
                        key="textForm"
                        component={TextForm}
                        title="Add Dialogue"
                        onExit={() => Actions.refresh()}
                    />
                    <Scene 
                        key="chooseCharacter"
                        title="Select Character"
                        component={ChooseCharacter}
                    />
                    <Scene
                        key="scriptContainer"
                        title="Select Line"
                        component={ScriptContainer}
                        scriptLines={this.state.scripts[1]} />
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
    }
}



export default App;
