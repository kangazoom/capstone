import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

class ChooseCharacter extends Component {
    constructor(props) {
        super(props)
        // THIS MY ATTEMPT TO MANUALLY GRAB THE OUTSIDE+UPDATED PROPS
        this.updatedProps = props.getNewer()
    }

    onCharacterPress = (characterName) => {
        console.log(`Name (param) of selected character: ${characterName}`);
        this.props.selectCharacterCB(characterName);
        // this.updatedProps.selectedCharacter = characterName;
        // Actions.refresh(this.props)
        // Actions.refresh(this.updatedProps)
        // this.proceed()
        // Actions.refresh(this.updatedProps)
    }

    // proceed = () => {
    //     Actions.scriptContainer()
    // }


    render() {

        // if (this.props === null) {
        //     return null;
        // }

        console.log(`In Character Screen: Props...`)
        console.log(this.props)

        console.log(`In Character Screen: Updated Props from getNewer()...`)
        console.log(this.updatedProps)

        console.log('The important difference between props and updatedProps (selectedScript):')
        console.log(this.props.selectedScript===null)
        console.log(this.updatedProps.selectedScript===null)

        console.log('Still broken in props and updatedProps (selectedCharacter):')
        console.log(this.props.selectedCharacter)
        console.log(this.updatedProps.selectedCharacter)

        let {
            selectedScript,
            selectedCharacter,
        } = this.updatedProps;


        console.log(`In Character Screen: This is the navigation function...`)
        console.log(this.props.navigation)
        console.log(`In Character Screen: This is the navigation function's state...`)
        console.log(this.props.navigation.state)


        let characterList = [... new Set(selectedScript.script_data.map((eachLine) => {
            return eachLine['speaking_character']
        }))]


        // console.log(characterList)
        // console.log(selectedCharacter)
        // console.log(this.updatedProps)
        // console.log(this.updatedProps)

        return (
            <View>
                <Text>CHOOSE A CHARACTER:</Text>
                {/* <Button
                    onPress={Actions.scriptContainer}
                    title="I don't want to choose a character" />
                <Button
                    onPress={Actions.scriptContainer}
                    title='Astrov' />
                <Button
                    onPress={Actions.scriptContainer}
                    title='Sonya' /> */}

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
<Text>script selected: {selectedScript.title}</Text>
                {selectedCharacter !== null ? <Button
                    onPress={Actions.scriptContainer}
                    title={`Continue with: ${selectedCharacter}`} /> : <Text>character: no selection</Text>}

            </View>
        );

    }
}

export default ChooseCharacter;
