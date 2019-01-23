import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList, TextInput, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FireBaseService from '../Network/FireBaseService';

import { Overlay } from 'react-native-elements';
import MultiSelect from 'react-native-multiple-select';




class TextForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            act: "",
            scene: "",
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

    // TODO:
    // build script_data:
    //[ {line: "blah", speaking_character: "missy elliott", index: 0}]
    // decide if it should be title+author+description? --> act --> scene (description?) --> script_data
    // keep counter for index? fix if one is deleted?

    // componentDidMount() {
    //     this.setState({ lineList: [...this.array] })
    //   }

    createScene = () => {
        // let {line} = this.state
        // const me = this;
        FireBaseService.initializeService()
        FireBaseService.addScript(this.state)
        // Actions.pop({refresh: {}})
        // .then((response) => {
        // console.log(response)
        Actions.pop();
        // })
        // .catch((error) => {
            // console.log(error)
            // todo: error handling
        // })
    }

    // onCharacterPress = (characterName) => {
    //     Actions.scriptContainer({ selectedCharacter: characterName, selectedScript: this.props.selectedScript })
    // }

    // selectCharacter = () => {
    //     console.log('ADD A CHAR')
    //     return 'add a char'
    // }

    addCharacter = (character) => {
        this.setState({ characterList: character })
        this.onSelectedItemsChange(character)
        console.log(character)
        console.log([character[character.length - 1].name])
        console.log(this.state.characterList)

    }

    onSelectedItemsChange = (character, index) => {
        console.log('ADD A CHAR')
        console.log(character)
        console.log(index)
        let recentSelection = character[character.length - 1]
        let {charHolder} = this.state
        charHolder[index] = recentSelection
        // this.array[index] = recentSelection
        // charHolder[index+1] = recentSelection
        // charHolder[index] = character
        // this.setState({ charHolder: this.array })
        this.setState({charHolder })
        // this.setState({ character: charHolder[index] })
        // this.setState({ charHolder: [...charHolder, recentSelection] })

        // this.setState({ character: charHolder })
        // this.setState({ character: character })
        // console.log(this.state.character)
        console.log(this.array)
        console.log(this.state.charHolder)
        console.log([charHolder[index]])
    }

    addLine = () => {
        // this.array.push('new')
        // console.log(this.array)

        // this.array.push(this.state.line);
        this.setState({ arrayHolder: [...this.state.arrayHolder, 'new item'] })

        // let {lineList} = this.state
        // lineList="";
        // this.setState({
        //     lineList
        // })
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
        console.log('in da function')
        console.log(info)
    }



    render() {
        console.log(this.state.characterList)
        console.log(this.state.lineList)
        console.log(this.state.character)

        let { charHolder } = this.state;



        // let lineListAmountArray = ["1"]
        // console.log(lineListAmountArray)

        let scriptStarted = this.state.title && this.state.author


        // let addNewLine = () => {
        //     console.log('ADDDZ')
        //     lineListAmountArray.push("new item")
        //     lineListAmountArray.concat("new item")

        //     // console.log('workin?')
        //     // lineListAmountArray.concat('new item')
        //     // console.log(this.state.lineList)
        //     // this.setState({lineList: [...this.state.lineList, 'new item']})
        // }
        return (
            <View>
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


                {this.state.title && this.state.author ?

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        <TextInput
                            placeholder="act number"
                            onChangeText={this.onFieldChange("act")}
                            value={this.state.act}
                            keyboardType='numeric'
                            maxLength={3}
                        />
                        <TextInput
                            placeholder="scene number"
                            onChangeText={this.onFieldChange("scene")}
                            value={this.state.scene}
                            keyboardType='numeric'
                            maxLength={3}
                        />

                        <TextInput
                            placeholder="description"
                            onChangeText={this.onFieldChange("description")}
                            value={this.state.description}
                            spellcheck={true}
                        />

                    </View>
                    : <Text>{' '}</Text>}


                {/* {this.state.title && this.state.author ?



                    : <Text>{' '}</Text>} */}

<Button title="Add A Line"
                    onPress={
                        this.addLine
                        //() => {
                        // lineListAmountArray=lineListAmountArray.push("new item")
                        // this.setState({lineListAmountArray: [...this.state.lineListAmountArray, 'new item']})
                        // [...lineListAmountArray, 'new item']
                        // lineListAmountArray = [...lineListAmountArray, 'new item']

                        // }
                    }
                />

                    <Button title="Save Scene"
                    onPress={this.createScene}
                />

                <FlatList

                    // data={this.state.lineList}
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
                                    //() => {
                                    // lineListAmountArray=lineListAmountArray.push("new item")
                                    // this.setState({lineListAmountArray: [...this.state.lineListAmountArray, 'new item']})
                                    // [...lineListAmountArray, 'new item']
                                    // lineListAmountArray = [...lineListAmountArray, 'new item']

                                    // }
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
