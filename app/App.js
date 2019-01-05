/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import InputTextAPIRequests from './components/InputTextAPIRequests';
import FireBaseService from './components/Network/FireBaseService';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

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

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <InputTextAPIRequests URL='localhost:8000/api/inputlines/'/>
        <Text>{this.state.scripts.length}</Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default App;
