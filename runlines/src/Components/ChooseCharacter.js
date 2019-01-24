import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TextSelectionItem from './Common/TextSelectionItem'
import Heading from './Common/Heading';
import styles from "./Common/MainStyles";


class ChooseCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedScript: props.selectedScript,
        }
    }

    onCharacterPress = (characterName) => {
        Actions.scriptContainer({ 
            selectedScript: this.props.selectedScript,
            selectedCharacter: characterName
        })
    }

    render() {
        const { selectedScript } = this.props;

        let characterList = [... new Set(selectedScript.script_data.map((eachLine) => {
            return eachLine['speaking_character']
        }))];

        return (
            <View style={styles.container}>
                <Heading>{this.props.selectedScript.title} by {this.props.selectedScript.author}</Heading>
                <Text style={{marginBottom: 5}}>{this.props.selectedScript.description}</Text>
                <FlatList
                    data={characterList}
                    keyExtractor={item => item}
                    renderItem={({ item }) =>
                    <TextSelectionItem onPress={() => this.onCharacterPress(item)}>
                    {item}
                    </TextSelectionItem>
                    }
                />
            </View>
        );
    }
}

export default ChooseCharacter;
