import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';


class UploadFile extends Component {
    render() {
        return (
            <View>
            <Text>Select the text's format: </Text>
             <Text>Play/Theater - Movie/TV - Other </Text>
                <Text style={styles.headerStyle}>[alt: Build Dialogue] </Text>
                <Button
                    onPress={Actions.chooseCharacter}
                    title='[to add: UPLOAD FILE]' />
            </View>
        );
    }
}

export default UploadFile;