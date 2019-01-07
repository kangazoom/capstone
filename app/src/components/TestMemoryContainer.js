import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class TestMemoryContainer extends Component {
    render() {
        return (
            <View>
                <Text>Cue Line:</Text>
                <Text>Record</Text>
                <Button
                    onPress={Actions.resultsContainer}
                    title="Start Over" />
                <Button
                    onPress={Actions.resultsContainer}
                    title='View Results' />

            </View>
        );
    }
}

export default TestMemoryContainer;