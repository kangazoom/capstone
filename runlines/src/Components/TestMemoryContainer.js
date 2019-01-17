import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RecorderContainer from './RecorderContainer';


class TestMemoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLine: props.selectedLine,
            transcription: null
        }
    }
    
        transcriptionResponse = (data) => {
            this.setState({
              transcription: data
            })
          }
    
    render() {
        return (
            <View>
                <Text>Cue Line: [FIX ME]</Text>
                <Text>{this.state.selectedLine.item.line}</Text>
                <Text>Record</Text>
                <RecorderContainer returnedTranscriptionResponseCB={this.transcriptionResponse} />
                <Text>{JSON.stringify(this.state.transcription)}</Text>

            </View>
        );
    }
}

export default TestMemoryContainer;