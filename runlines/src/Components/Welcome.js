import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

// import RecorderComponent from './RecorderComponent';

import UploadFile from './UploadFile';
import GoogleSpeechService from '../Network/GoogleSpeechService';

class Welcome extends Component {

    onScriptPress = (item) => {
        Actions.chooseCharacter({selectedScript: item});
    }

    render() {
        // ATTEMPT TO UPDATE PROPS:
        // this.onLoad()

        let {
            scriptCollection,
        } = this.props;

        return (
            <View>
                <Text style={styles.headerStyle}>You'll learn your lines in no time!</Text>
                <Text style={styles.headerStyle}>Choose or upload a PDF to start!</Text>
                <Text style={styles.headerStyle}>Choose  Script: </Text>

                <FlatList
                    data={scriptCollection}
                    renderItem={({ item }) =>
                        <Button
                            title={`${item.title} by ${item.author}`}
                            onPress={() => this.onScriptPress(item)}
                        />
                    }
                    keyExtractor={item => item.title}
                />
                
                <UploadFile />
                <Button
                    title='test me!'
                    onPress={() => GoogleSpeechService.discover()}
                />

</View>

        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        fontSize: 20,
    }
});

export default Welcome;