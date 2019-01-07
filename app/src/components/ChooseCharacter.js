import React, { Component } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ChooseCharacter extends Component {
    render() {
        return (
            <View>
                <Text>CHOOSE A CHARACTER:</Text>
                <Button
                    onPress={Actions.scriptContainer}
                    title="I don't want to choose a character" />
                <Button
                    onPress={Actions.scriptContainer}
                    title='Astrov' />
                <Button
                    onPress={Actions.scriptContainer}
                    title='Sonya' />
            </View>
        );
    }
}

export default ChooseCharacter;