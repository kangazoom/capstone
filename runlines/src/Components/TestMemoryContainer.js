import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RecorderContainer from './RecorderContainer';


class TestMemoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLine: props.selectedLine
        }
    }
    
    render() {
        return (
            <View>
                <Text>Cue Line: [FIX ME]</Text>
                <Text>{this.state.selectedLine.item.line}</Text>
                <Text>Record</Text>
                <RecorderContainer />
                <Button
                    // onPress={Actions.resultsContainer}
                    title="Start Over" />
                <Button
                    // onPress={Actions.resultsContainer}
                    title='View Results' />

            </View>
        );
    }
}

export default TestMemoryContainer;