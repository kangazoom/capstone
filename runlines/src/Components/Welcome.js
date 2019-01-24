import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Overlay } from 'react-native-elements';

import FireBaseService from '../Network/FireBaseService';
import TextSelectionItem from './Common/TextSelectionItem';
import Heading from './Common/Heading';
import Button from './Common/Button';
import styles from './Common/MainStyles';
import ErrorOverlay from './Common/ErrorOverlay';

class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            scriptCollection: [],
            selectedScript: null,
            isVisible: false,
            statusMessage: null,
            isLoading: true,
        }
    }

    // grab scripts
    componentDidMount() {
        const self = this;

        FireBaseService.initializeService()
        FireBaseService.getScripts()
            .then((scriptsArray) => {
                self.setState({
                    scriptCollection: scriptsArray,
                    statusMessage: 'success!',
                });
            })
            .catch((error) => {
                self.setState({
                    isVisible: true,
                    statusMessage: error,
                });
            })
        this.setState({
            isLoading: false
        });
    }

    renderCell(cellData) {
        let scriptObject = cellData.item
        return (
            <TextSelectionItem
                onPress={() => Actions.chooseCharacter({ selectedScript: scriptObject })}
            >
                {scriptObject.title} by {scriptObject.author}
            </TextSelectionItem>
        );
    }

    render() {
        let {
            scriptCollection,
            isLoading,
            isVisible,
            statusMessage,
        } = this.state;

        let displayStatusMessage = () => {
            if (statusMessage === 'success!') {
                return 'Successfully loaded scripts'
            }
            else {
                return
            }
        }

        let displayErrorMessage = statusMessage!=='success!' ? `Encountered an error: ${statusMessage}` : ""

        return (
            <View style={styles.container}>

                <Button onPress={Actions.textForm}>Add A Scene</Button>
                <Heading>Or choose a scene below: </Heading>

                {isLoading === true &&
                    <ActivityIndicator size="large" color="#00D0FF" />

                }

                {scriptCollection.length > 0 &&
                    <FlatList
                        data={scriptCollection}
                        keyExtractor={item => item.id}
                        renderItem={this.renderCell}
                    />
                }

                {scriptCollection.length === 0 && isLoading === false &&
                    <Text>To get started, add some scenes!</Text>
                }

                <ErrorOverlay
                    isVisible={isVisible}                    
                    onBackdropPress={() => this.setState({ isVisible: false })}
                >
                    <Text>{displayErrorMessage}</Text>
                </ErrorOverlay>
            </View>
        );
    }
}

export default Welcome;