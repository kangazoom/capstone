import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList, TextInput, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FireBaseService from '../Network/FireBaseService';

import { Overlay } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';

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

        this.array = [""]
    }

    onFieldChange = fieldName => textInput => {
        this.setState({
            [fieldName]: textInput
        })

    }

    // delay = ms => new Promise(res => setTimeout(res, ms));


    createScene = () => {
        FireBaseService.initializeService()
        FireBaseService.addScript(this.state)
        // await this.delay(5000);
        Actions.welcome();
    }

    addCharacter = (character) => {
        this.setState({ characterList: character })
        this.onSelectedItemsChange(character)
    }

    onSelectedItemsChange = (character, index) => {
        let recentSelection = character[character.length - 1]
        let {charHolder} = this.state
        charHolder[index] = recentSelection
        this.setState({charHolder })
    }

    addLine = () => {
        this.setState({ arrayHolder: [...this.state.arrayHolder, 'new item'] })
    }

    removeLine = (info) => {
        // this.array.push('new')
        // console.log(this.array)

        // this.array.push(this.state.line);
        // this.setState({ arrayHolder: [...this.state.arrayHolder, 'new item'] })

        // let {lineList} = this.state
        // lineList="";
        // this.setState({
        //     lineList
        // })
        console.log('in the removal function')
        console.log(info)
    }



    render() {

        let { charHolder } = this.state;
        let scriptStarted = this.state.title && this.state.author

        return (
            <View style={styles.container}>
                <Text>Input Your Scene:</Text>
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


                {/* {this.state.title && this.state.author ? */}

                    {/* // <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}


                        <TextInput
                            placeholder="description"
                            onChangeText={this.onFieldChange("description")}
                            value={this.state.description}
                            spellcheck={true}
                        />

                    {/* // </View> */}
                    {/* // : <Text>{' '}</Text>} */}


                {/* {this.state.title && this.state.author ?



                    : <Text>{' '}</Text>} */}

<Button title="Add A Line"
                    onPress={
                        this.addLine
                    }
                />
                    <Button title="Save Scene"
                    onPress={this.createScene}
                />

                <FlatList
                    data={this.state.arrayHolder}
                    extraData={this.state}
                    keyExtractor={(index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (<View>
                            {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}

                                <MultiSelect
                                    single={true}
                                    items={this.state.characterList}
                                    uniqueKey="name"
                                    //   ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={(text) => this.onSelectedItemsChange(text, index)}
                                    selectedItems={[charHolder[index]]}
                                    selectText={[charHolder[index]].toString()}
                                    searchInputPlaceholderText="Search or Enter Characters..."
                                    onChangeInput={(text) => console.log(text)}
                                    hideSubmitButton={false}
                                    // textInputProps={(text) => this.onSelectedItemsChange(text, index)}
                                    //   tagRemoveIconColor="#CCC"
                                    //   tagBorderColor="#CCC"
                                    //   tagTextColor="#CCC"
                                    //   selectedItemTextColor="#CCC"
                                    //   selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    canAddItems={true}
                                    onAddItem={this.addCharacter}
                                    // flatListProps={[charHolder[index]]}
                                //   searchInputStyle={{ color: '#CCC' }}
                                //   submitButtonColor="#CCC"
                                //   submitButtonText="Submit"
                                />
                            {/* </View> */}

                            <TextInput
                                placeholder={'enter new line'}
                                onChangeText={
                                    text => {
                                        // this.setState({line: text})
                                        // this.onFieldChange(`lineList${index}`)
                                        let { lineList } = this.state;
                                        lineList[index] = text;
                                        this.setState({
                                            lineList
                                        });
                                        // this.onFieldChange("lineList")
                                    }
                                }
                                spellcheck={true}
                                multiline={true}
                                numberOfLines={4}
                            // value={this.state.lineList[index]}
                            />

                            <Button title="Remove Line"
                                onPress={
                                    this.removeLine(item)
                                }
                            />
                        </View>


                        )



                    }} />


            </View>
        )

    }
}

export default TextForm;
