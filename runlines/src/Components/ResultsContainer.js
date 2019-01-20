import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TextResultsComparison from './TextResultsComparison';


class ResultsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectedLine: props.selectedLine,
            // transcription: props.transcription
            selectedLine: this.props.selectedLine,
            transcription: this.props.transcription,
        }
    }

    render() {
        return (
            <View>
                {/* <Button onPress={this.evaluateExtraWords} title="show me the extra words" /> */}
                <TextResultsComparison selectedLine={this.state.selectedLine} transcription={this.state.transcription} />
                {/* <Button
                    title='Your Previous Line' />
                <Button
                    // onPress={Actions.testMemoryContainer}
                    title='Try Again' />
                <Button
                    // onPress={Actions.scriptContainer}
                    title='View Script' />
                <Button
                    title='Your Next Line' /> */}
            </View>
        );
    }
}

export default ResultsContainer;