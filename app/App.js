/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import { List, ListItem } from "react-native-elements";

import InputTextAPIRequests from './components/InputTextAPIRequests';
import FireBaseService from './components/Network/FireBaseService';


type Props = {};
class App extends Component {
  constructor(props) {
    super(props)

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
    })
    .catch((error) => {
      // todo: error handling
    })
  }


  render() {
    // QUESTION: WHY DOES THE CODE STOP WORKING IF I REMOVE THIS?
    // HOW DOES IT ENSURE THE COMPONENT LOADS FIRST???
    if (this.state.scripts.length === 0) {
      console.log('DID NOT LOAD')
      return null;
    }
    // NOTE: working with lines first
    console.log(JSON.stringify(this.state.scripts[1].title))

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <InputTextAPIRequests URL='localhost:8000/api/inputlines/'/>
        <Text>{this.state.scripts[1].title} by {this.state.scripts[1].author}</Text>
        <FlatList
          style={styles.scriptText}
          data={this.state.scripts[1].script_data}
          renderItem={({ item }) => 
          <Text style={styles.eachLine}>{`${item.speaking_character}: ${item.line}`}</Text>}
          keyExtractor={item => JSON.stringify(item.index)}
          />
          <Text>HI WHAT</Text>
      </View>
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
