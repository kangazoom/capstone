import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import TextSelectionItem from './Common/TextSelectionItem'


class ChooseCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <View style={styles.containerStyle}>
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

const styles = StyleSheet.create({
    containerStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: '#fff'
        },
    headerStyle: {
        fontSize: 20,
    }
});

export default ChooseCharacter;
