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
            let lineAsString = "";
            if (data!==null) {
            let results = data['results'];
            for (let result of results) {
                lineAsString += result["alternatives"][0]["transcript"]
            }

        }
        console.log(lineAsString)
            this.setState({
              transcription: lineAsString
            })
          }

          onResultsPress = () => {
            //   Actions.resultsContainer()
            // Actions.resultsContainer({selectedCharacter: this.props.selectedCharacter, selectedScript: this.props.selectedScript, selectedLine: this.state.selectedLine, transcription: this.state.transcription})
            // hard coding:
            Actions.resultsContainer({selectedCharacter: this.props.selectedCharacter, selectedScript: this.props.selectedScript, selectedLine: this.state.selectedLine, transcription: this.state.transcription})
        }
    
    render() {
        return (
            <View>
                <Text>Cue Line: [FIX ME]</Text>
                <Text>{this.state.selectedLine}</Text>
                <Text>Record</Text>
                <RecorderContainer returnedTranscriptionResponseCB={this.transcriptionResponse} />
                <Text>{JSON.stringify(this.state.transcription)}</Text>
                <Button
                title="CONTINUE TO NEXT PAGE (CHANGE LATER)"
                onPress={this.onResultsPress}
                />

            </View>
        );
    }
}

export default TestMemoryContainer;