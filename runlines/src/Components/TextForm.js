import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import FireBaseService from '../Network/FireBaseService';
import MultiSelect from 'react-native-multiple-select';
import Heading from './Common/Heading';
import Button from './Common/Button'
import styles from "./Common/MainStyles";


class TextForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            description: "",
            character: [],
            characterList: [],
            line: "",
            lineList: [],
            arrayHolder: [" "],
            isVisible: false,
            charHolder: [],
            isValid: false,
        }
    }

    onFieldChange = fieldName => textInput => {
        this.setState({
            [fieldName]: textInput
        })

    }

    createScene = async() => {
        await this.validateInput()
        if (this.state.isValid === true) {
            FireBaseService.initializeService()
            FireBaseService.addScript(this.state)
            alert('Success!')
            Actions.welcome();
        }
        else {
            alert('You left a mandatory field empty!')
        }
    }

    validateInput = () => {
        let countBlankFields = 0

        if (this.state.title.trim().length === 0 || this.state.author.trim().length === 0) {
            countBlankFields++
            console.log(countBlankFields)
        }

        for (let i = 0; i < this.state.lineList; i++) {
            if (this.state.lineList[i].trim().length === 0 || this.state.characterList[i].trim().length===0) {
                countBlankFields++
                console.log(countBlankFields)
            }
        }

        console.log(countBlankFields)
        if (countBlankFields === 0) {
            this.setState({ isValid: true })
        }
    }

    addCharacter = (character) => {
        this.setState({ characterList: character })
        this.onSelectedItemsChange(character)
    }

    onSelectedItemsChange = (character, index) => {
        let recentSelection = character[character.length - 1]
        let { charHolder } = this.state
        charHolder[index] = recentSelection
        this.setState({ charHolder })
    }

    addLine = (index) => {
        this.setState({ arrayHolder: [...this.state.arrayHolder, 'new item'] })
    }

    render() {
        let {
            title,
            author,
            charHolder
        } = this.state;

        let scriptStarted = title && author

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', width: 325 }}>
                        <Heading>Input Your Scene:</Heading>
                        <TextInput
                            style={stylesForm.formStyle}
                            placeholder="script title"
                            onChangeText={this.onFieldChange("title")}
                            value={this.state.title}
                        />
                        <TextInput
                            style={stylesForm.formStyle}
                            placeholder="script author"
                            onChangeText={this.onFieldChange("author")}
                            value={this.state.author}
                        />
                        <TextInput
                            style={stylesForm.formStyle}
                            placeholder="description [optional]"
                            onChangeText={this.onFieldChange("description")}
                            value={this.state.description}
                            spellcheck={true}
                        />

                        <FlatList
                            data={this.state.arrayHolder}
                            extraData={this.state}
                            keyExtractor={(index) => index.toString()}
                            contentContainerStyle={{ width: 325 }}
                            renderItem={({ item, index }) => {
                                return (<View>

                                    <MultiSelect
                                        single={true}
                                        items={this.state.characterList}
                                        uniqueKey="name"
                                        onSelectedItemsChange={(text) => this.onSelectedItemsChange(text, index)}
                                        selectedItems={[charHolder[index]]}
                                        selectText={'Enter character name'}
                                        searchInputPlaceholderText="Enter New or Search for Characters..."
                                        onChangeInput={(text) => console.log(text)}
                                        hideSubmitButton={false}
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#333"
                                        tagTextColor="#333"
                                        selectedItemTextColor="#333"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        canAddItems={true}
                                        onAddItem={this.addCharacter}
                                        searchInputStyle={{ color: '#333' }}
                                    />

                                    <TextInput
                                        style={{height: 100, width: "95%", borderColor: "#333", borderWidth: 2}}
                                        placeholder={'enter new line'}
                                        onChangeText={
                                            text => {
                                                let { lineList } = this.state;
                                                lineList[index] = text;
                                                this.setState({
                                                    lineList
                                                });
                                            }
                                        }
                                        spellcheck={true}
                                        multiline={true}
                                        numberOfLines={4}
                                    />
                                </View>
                                )
                            }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                            <Button onPress={this.addLine}>
                                <Text>Add A Line</Text>
                            </Button>

                            <Button onPress={this.createScene}>
                                <Text>Save Scene</Text>
                            </Button>
                        </View>


                    </View>
                </View>
            </ScrollView>
        )

    }
}

const stylesForm = StyleSheet.create({
    formStyle: {
        height: 45,
        width: "95%",
        borderColor: "#333",
        borderWidth: 2
    }
})

export default TextForm;
