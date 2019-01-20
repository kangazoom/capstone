import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ChooseCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characterName: props.characterName
        }
    }

    onCharacterPress = (characterName) => {
        Actions.scriptContainer({ selectedCharacter: characterName, selectedScript: this.props.selectedScript })
    }

    render() {
        
        const { selectedScript } = this.props;

        let characterList = [... new Set(selectedScript.script_data.map((eachLine) => {
            return eachLine['speaking_character']
        }))];

        return (
            <View>
                <Text>CHOOSE A CHARACTER:</Text>
                <FlatList
                    data={characterList}
                    renderItem={({ item }) =>
                        <Button
                            title={`${item}`}
                            onPress={() => {
                                this.onCharacterPress(item)
                            }}
                        />
                    }
                    keyExtractor={item => item}

                />
            </View>
        );

    }
}

export default ChooseCharacter;
