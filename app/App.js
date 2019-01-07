// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, {Component} from 'react';
// import {StyleSheet, Text, View, FlatList} from 'react-native';
// import { List, ListItem } from "react-native-elements";

// import InputTextAPIRequests from './components/InputTextAPIRequests';
// import FireBaseService from './components/Network/FireBaseService';

// import Header from './src/components/Header';
// import ScriptContainer from './src/components/ScriptContainer';
// import ScriptLineDetail from './src/components/ScriptLineDetail';

// import Router from './src/Router';


// type Props = {};
// class App extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       scripts: [],
//     }
//   }

//   componentDidMount() {
//     const me = this;
//     FireBaseService.initializeService()
//     FireBaseService.getScripts()
//     .then((scriptsArray) => {
//       me.setState({
//         scripts: scriptsArray
//       });
//       Header();
//     })
//     .catch((error) => {
//       // todo: error handling
//     })
//   }

//   renderLines() {
//     return this.state.scripts.map(script => <ScriptLineDetail key={script.title} text={script} />)
//   }


//   render() {
//     // QUESTION: WHY DOES THE CODE STOP WORKING IF I REMOVE THIS?
//     // HOW DOES IT ENSURE THE COMPONENT LOADS FIRST???
//     if (this.state.scripts.length === 0) {
//       console.log('DID NOT LOAD')
//       return null;
//     }
//     // NOTE: working with lines first
//     console.log(JSON.stringify(this.state.scripts[1].title))
    

//     return (
//       <View style={styles.container}>
//         <Header headerText={"i am changing header props"}/>
//         <Router />
//         <Text style={styles.welcome}>Welcome to React Native!</Text>
//         <InputTextAPIRequests URL='localhost:8000/api/inputlines/'/>
//         <Text>{this.state.scripts[1].title} by {this.state.scripts[1].author}</Text>
//         {this.renderLines()}
//         <FlatList
//           style={styles.scriptText}
//           data={this.state.scripts[1].script_data}
//           renderItem={({ item }) => 
//           <Text style={styles.eachLine}>{`${item.speaking_character}: ${item.line}`}</Text>}
//           keyExtractor={item => JSON.stringify(item.index)}
//           />
//           <Text>HI WHAT</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },

//   scriptText: {
//     textAlign: 'left',
//     color: '#333333',
//     marginLeft: 5,
//     marginRight: 5,
//   },

//   eachLine: {
//     textAlign: 'left',
//     color: '#333333',
//     marginTop: 5,
//     marginBottom: 5,
//   },
// });


// export default App;

// -------------------------------------
// routing ideas
// --------------------------------------


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

// import FireBaseService from './components/Network/FireBaseService';

import Header from './src/components/Header';
import ScriptContainer from './src/components/ScriptContainer';
import ScriptLineDetail from './src/components/ScriptLineDetail';

import Router from './src/Router';
import {Actions} from 'react-native-router-flux';


type Props = {};
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scripts: [],
    }
  }

  // componentDidMount() {
  //   const me = this;
  //   FireBaseService.initializeService()
  //   FireBaseService.getScripts()
  //   .then((scriptsArray) => {
  //     me.setState({
  //       scripts: scriptsArray
  //     });
  //     // Actions.header();
  //   })
  //   .catch((error) => {
  //     // todo: error handling
  //   })
  // }

  // renderLines() {
  //   return this.state.scripts.map(script => <ScriptLineDetail key={script.title} text={script} />)
  // }


  render() {
    // QUESTION: WHY DOES THE CODE STOP WORKING IF I REMOVE THIS?
    // HOW DOES IT ENSURE THE COMPONENT LOADS FIRST???
    // if (this.state.scripts.length === 0) {
    //   console.log('DID NOT LOAD')
    //   return null;
    // }
    // NOTE: working with lines first
    // console.log(JSON.stringify(this.state.scripts[1].title))
    

    return (

        <Router />
 
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
