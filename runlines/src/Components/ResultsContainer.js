import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


class ResultsContainer extends Component {
    render() {
        return (
            <View>
                <Text>Actual Line: jlkfjs </Text>
                <Text>You Said: jdklsjfd</Text>
                <Text>[alt: Build Dialogue] </Text>
                <Button
                    title='Your Previous Line' />
                <Button
                    // onPress={Actions.testMemoryContainer}
                    title='Try Again' />
                <Button
                    // onPress={Actions.scriptContainer}
                    title='View Script' />
                <Button
                    title='Your Next Line' />
            </View>
        );
    }
}

export default ResultsContainer;