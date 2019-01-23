import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Overlay } from 'react-native-elements';

import FireBaseService from '../Network/FireBaseService';
import TextSelectionItem from './Common/TextSelectionItem'
import Header from './Common/Header'
import Button from './Common/Button'
import styles from "./Common/MainStyles";

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            scriptCollection: [],
            selectedScript: null,
            isVisible: false,
            statusMessage: null,
            isLoading: false,
        }
        this.statusColor = null
    }

    // TODO: remove or keep?
    // advance to ChooseCharacter component
    // onScriptPress = (item) => {
    //     Actions.chooseCharacter({selectedScript: item});
    // }

    // grab scripts
    componentDidMount() {
        const self = this;
        self.setState({
            isLoading: true
        });

        FireBaseService.initializeService()
        FireBaseService.getScripts()
            .then((scriptsArray) => {
                self.setState({
                    scriptCollection: scriptsArray,
                    isVisible: true,
                    statusMessage: 'success!'
                });
                // self.clearSuccessStatus()

            })
            .catch((error) => {
                self.setState({
                    isVisible: true,
                    statusMessage: error
                });
            })

        self.setState({
            isLoading: false
        });
    }

    // TODO: how is this workingggg?
    clearSuccessStatus = setInterval(() => {
        this.statusColor = 'green'
        this.setState({
            isVisible: false
        });
    }, 3000)


    renderCell(cellData) {
        let scriptObject = cellData.item
        return (
            <TextSelectionItem onPress={() => Actions.chooseCharacter({ selectedScript: scriptObject })}>
                {scriptObject.title} by {scriptObject.author}
            </TextSelectionItem>
        );
    }

    render() {
        let { scriptCollection, statusMessage, isLoading } = this.state;

        let displayStatusMessage = () => {
            if (statusMessage === 'success!') {
                this.statusColor = 'green'
                return 'Successfully loaded scripts'
            }
            else {
                this.statusColor = 'red'
                return `Encountered an error: ${statusMessage}`
            }
        }
            
        
console.log(this.statusColor)
        // TODO: error handling/loading
        // view shouldn't render until the scripts come in
        // what if there are no scripts??
        if (scriptCollection.length === 0) {
            return (<ActivityIndicator size="large" color="#00D0FF" />
            )
        }
        // if (scriptCollection.length === 0 && isLoading===true) {
        //     return (<ActivityIndicator size="large" color="#00D0FF" />)
        // }
        //     else if (scriptCollection.length === 0 && isLoading===false) {
        //     return (<Text>Add some scenes to get started!</Text>)
        //     }

        return (
            <View style={styles.container}>
                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor='transparent'
                      overlayBackgroundColor='blue'
                      width="auto"
                      height="auto"
                    onBackdropPress={() => this.setState({ isVisible: false })}

                >
                    <Text style={{backgroundColor: this.state.statusColor}}>{displayStatusMessage()}</Text>
                </Overlay>


                <Button onPress={Actions.textForm}>Add A Scene</Button>
                <Header>Or choose a scene below: </Header>
                <FlatList
                    data={scriptCollection}
                    keyExtractor={item => item.id}
                    renderItem={this.renderCell}
                />
            </View>
        );
    }
}

export default Welcome;