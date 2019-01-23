import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TextSelectionItem from './Common/TextSelectionItem'
import styles from "./Common/MainStyles";


class ChooseCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedScript: props.selectedScript,
            characterName: props.characterName,
            loading: false,
        }
    }

    // renderButton() {
    //     if (this.state.loading) {
    //         return <Spinner/>
    //     }
    //     return (

    //     )
    // }

    onCharacterPress = (characterName) => {

        Actions.scriptContainer({ selectedCharacter: characterName, selectedScript: this.props.selectedScript })
    }

    render() {
        
        const { selectedScript } = this.props;

        let characterList = [... new Set(selectedScript.script_data.map((eachLine) => {
            return eachLine['speaking_character']
        }))];

        return (
            <View style={styles.container}>
                <FlatList
                    data={characterList}
                    renderItem={({ item }) =>
                    <TextSelectionItem onPress={() => this.onCharacterPress(item)}>
                    {item}
                    </TextSelectionItem>
                    }
                    keyExtractor={item => item}

                />
            </View>
        );

    }
}

export default ChooseCharacter;
