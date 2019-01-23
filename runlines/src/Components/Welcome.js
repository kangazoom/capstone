import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ThemeProvider } from 'react-native-elements';

// import CardSection from './Common/CardSection'
import TextSelectionItem from './Common/TextSelectionItem'
import Header from './Common/Header'
import Button from './Common/Button'

import TextForm from './TextForm'
import FireBaseService from '../Network/FireBaseService';


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
            <View style={styles.containerStyle}>
                <Button onPress={Actions.textForm}>Add A Scene</Button>
                <Header>Or choose a scene below: </Header>

                <FlatList
                    data={scriptCollection}
                    renderItem={({ item }) =>
                    <TextSelectionItem onPress={() => this.onScriptPress(item)}>
                        {item.title} by {item.author}
                        </TextSelectionItem>
                    }
                    keyExtractor={item => item.title}
                />

                {/* <TextForm /> */}
                
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

});

export default Welcome;