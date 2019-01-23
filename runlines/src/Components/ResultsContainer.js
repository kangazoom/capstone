import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TextResultsComparison from './TextResultsComparison';

import styles from "./Common/MainStyles";


class ResultsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLine: props.selectedLine,
            transcription: props.transcription,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextResultsComparison selectedLine={this.state.selectedLine} transcription={this.state.transcription} />
            </View>
        );
    }
}

export default ResultsContainer;