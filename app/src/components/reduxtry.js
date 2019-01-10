
import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { List, ListItem } from "react-native-elements";

import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import FireBaseService from './src/components/Network/FireBaseService';

import Header from './src/components/Header';
// import Welcome from './src/components/Welcome';
// import ChooseCharacter from './src/components/ChooseCharacter';
// import ScriptContainer from './src/components/ScriptContainer';
// import TestMemoryContainer from './src/components/TestMemoryContainer';
// import ResultsContainer from './src/components/TestMemoryContainer';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './src/Reducers';
import ReduxThunk from 'redux-thunk'
// import Router from './src/Router';
// import {Actions} from 'react-native-router-flux';

// class App extends Component {
  const App = () => {
    // super()
    // this.state = {
    //     scripts: [],
    //     selectedScript: null,
    //     selectedCharacter: null,
    //     selectedLine: null,
    // }




// componentDidMount() {
//   const me = this;
//   FireBaseService.initializeService()
//   FireBaseService.getScripts()
//       .then((scriptsArray) => {
//           me.setState({
//               scripts: scriptsArray
//           });
//           // Actions.header();
//       })
//       .catch((error) => {
//           // todo: error handling
//       })
// }

// ----- SCRIPT SELECTION ----- //

// findScript = (scriptID) => {
//   return this.state.scripts.find(script => script.id === scriptID)
//   // this.props.selectedCustomerCB(clickedCustomer)
// }

// setSelectedScript = (ScriptID) => {
//   let clickedScript = this.findScript(ScriptID)
//   console.log(clickedScript)
//   this.setState({
//       selectedScript: clickedScript
//   })
// }


// ----- CHARACTER SELECTION ----- //

// findCharacter = (scriptID) => {
//     return this.state.scripts.find(script => script.id === scriptID)
//     // this.props.selectedCustomerCB(clickedCustomer)
// }

// setSelectedCharacter = (characterName) => {
//     console.log(characterName)

//   this.setState({
//       selectedCharacter: characterName
//   });
// }



// render() {


  // console.log(this.state.selectedCharacter)


  // if (this.state.scripts.length === 0) {
  //     return null;
  // }

    return (

      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
     <View>
       <Header />
     </View>
      </Provider>
 
    );
  // }
}


export default App;
