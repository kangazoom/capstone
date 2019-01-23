import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TextResultsComparison from './TextResultsComparison';


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
            <View style={styles.containerStyle}>
                <TextResultsComparison selectedLine={this.state.selectedLine} transcription={this.state.transcription} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#fff'
        },
    headerStyle: {
        fontSize: 20,
    }
});

export default ResultsContainer;