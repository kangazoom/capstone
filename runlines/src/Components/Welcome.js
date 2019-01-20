import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RecorderContainer from './RecorderContainer';
import GoogleSpeechService from '../Network/GoogleSpeechService'
import FireBaseService from '../Network/FireBaseService';


import UploadFile from './UploadFile';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { transcription : null }
    }

    transcriptionResponse = (data) => {
        this.setState({
          transcription: data
        })
      }

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