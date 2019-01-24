import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Overlay } from 'react-native-elements';

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
            charHolder: []
        }
    }

    onFieldChange = fieldName => textInput => {
        this.setState({
            [fieldName]: textInput
        })

    }

    createScene = () => {
        FireBaseService.initializeService()
        FireBaseService.addScript(this.state)
        Actions.welcome();
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
                            placeholder="script title"
                            onChangeText={this.onFieldChange("title")}
                            value={this.state.title}
                            spellcheck={true}
                        />
                        <TextInput
                            placeholder="script author"
                            onChangeText={this.onFieldChange("author")}
                            value={this.state.author}
                            spellcheck={true}
                        />
                        <TextInput
                            placeholder="description"
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
                                        selectText={[charHolder[index]].toString()}
                                        searchInputPlaceholderText="Search or Enter Characters..."
                                        onChangeInput={(text) => console.log(text)}
                                        hideSubmitButton={false}
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        canAddItems={true}
                                        onAddItem={this.addCharacter}
                                        searchInputStyle={{ color: '#CCC' }}
                                    />

                                    <TextInput
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

export default TextForm;
