import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Heading from './Common/Heading';
import RecorderContainer from './RecorderContainer';
import styles from "./Common/MainStyles";


class TestMemoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedScript: props.selectedScript,
            selectedCharacter: props.selectedCharacter,
            selectedLine: props.selectedLine,
            cueLineInfo: props.selectedScript.script_data[props.selectedLineIndex - 1],
            transcription: null,
            showUserLine: false,
        }
    }

    transcriptionResponse = (data) => {
        let lineAsString = "";
        if (data !== {} && data !== null) {
            let results = data['results'];
            for (let result of results) {
                lineAsString += result["alternatives"][0]["transcript"]
            }
            this.setState({
                transcription: lineAsString,
            })

            Actions.resultsContainer({
                selectedScript: this.state.selectedScript,
                selectedCharacter: this.state.selectedCharacter,
                selectedLine: this.state.selectedLine,
                transcription: this.state.transcription
            })
        }
    }

    // create suggestion phrases to give Google Speech API some hints and improve accuracy
    wordSuggestionBuckets = () => {
        let actualTextWordsArray = this.state.selectedLine.split(" ");
        let totalChars = 0
        let charCounter = 0;
        let bigBucket = [];
        let miniBucket = "";
        let bucketCounter = 0;
        let wordCounter = 0

        for (let word of actualTextWordsArray) {
            charCounter += (word.length + 1)
            totalChars += (word.length + 1)
            wordCounter += 1

            if (totalChars >= 10000 || wordCounter >= 500) {
                break
            }
            if (charCounter > 100) {
                charCounter = 0
                charCounter += (word.length + 1)
                bigBucket.push(miniBucket)
                miniBucket = ""
            }
            miniBucket += `${word} `
        }
        bigBucket.push(miniBucket)
        return bigBucket;
    }

    toggleShowLine = () => {
        if (this.state.showUserLine) {
            this.setState({
                showUserLine: false
            })
        }
        else {
            this.setState({
                showUserLine: true
            })
        }
    }

    render() {
        let {
            selectedScript,
            showUserLine
        } = this.state;

        let phrases = this.wordSuggestionBuckets()

        let userLineBGColor = () => {
            if (showUserLine === true) {
                return '#fff'
            }
            else {
                return '#000'
            }
        }

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <Heading>{selectedScript.title} by {selectedScript.author}</Heading>
                    <Text style={{ marginBottom: 5 }}>{selectedScript.description}</Text>

                    <RecorderContainer returnedTranscriptionResponseCB={this.transcriptionResponse} phrases={phrases} />

                    <Heading>Cue Line: </Heading>
                    {this.state.cueLineInfo ?
                        <Text>{this.state.cueLineInfo.speaking_character}: {this.state.cueLineInfo.line} </Text>
                        : <Text>YOU HAVE THE FIRST LINE!</Text>}

                    <Heading>Your Line:</Heading>
                    <TouchableOpacity
                        onPress={this.toggleShowLine}
                        style={{ backgroundColor: userLineBGColor() }}
                    >
                        {showUserLine ?
                            <Text>{this.state.selectedLine}</Text> :
                            <Text style={{ color: '#00D0FF', padding: 10 }}>Tap to show/hide line</Text>}
                    </TouchableOpacity>

                </View>
            </ScrollView>
        );
    }
}

export default TestMemoryContainer;