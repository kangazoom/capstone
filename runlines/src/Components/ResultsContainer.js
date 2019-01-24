import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import Heading from './Common/Heading';
import TextResultsComparison from './TextResultsComparison';

import styles from "./Common/MainStyles";

class ResultsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedScript: props.selectedScript,
            selectedCharacter: props.selectedCharacter,
            selectedLine: props.selectedLine,
            transcription: props.transcription,
        }
    }

    render() {
        let {
        selectedScript,
        selectedLine,
        transcription
        } = this.state

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                <Heading>{selectedScript.title} by {selectedScript.author}</Heading>
                <Text style={{marginBottom: 5}}>{selectedScript.description}</Text>
                <TextResultsComparison selectedLine={selectedLine} transcription={transcription} />
            </View>
            </ScrollView>
        );
    }
}

export default ResultsContainer;