import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, FlatList, TextInput, Picker } from 'react-native';
import { Actions } from 'react-native-router-flux';
import FireBaseService from '../Network/FireBaseService';


class TextForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            act: "",
            scene: "",
            description: "",
            character: "",
            characterList: ['hansel', 'gretel', 'stella'],
            line: "",
            lineList: [],
            arrayHolder: [" "]
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
        // const me = this;
        FireBaseService.initializeService()
        FireBaseService.addScript(this.state)
        // .then((response) => {
        // console.log(response)
        // })
        // .catch((error) => {
        //     console.log(error)
        //     // todo: error handling
        // })
    }

    // onCharacterPress = (characterName) => {
    //     Actions.scriptContainer({ selectedCharacter: characterName, selectedScript: this.props.selectedScript })
    // }

    addCharacter = () => {

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

                {/* <Picker
                    selectedValue={this.state.character}
                    onValueChange={(itemValue, itemIndex) => this.setState({character: itemValue})}>
                    <Picker.Item label="G" value="GG" />
                    <Picker.Item label="D" value="DD" />
                    <Picker.Item label="C" value="CC" />
                    </Picker> */}

<Picker
selectedValue={this.state.character}
onValueChange={(itemValue, itemIndex) => this.setState({character: itemValue})}>
{this.state.characterList.map((item, index) => {
   return (< Picker.Item label={item} value={item} key={index} />);
})}  
</Picker>


                {/* <Button title="Save Scene"
                    onPress={this.createScene}
                /> */}

                <FlatList

                    // data={this.state.lineList}
                    data={this.state.arrayHolder}

                    // extraData={this.state.arrayHolder}
                    keyExtractor={(index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (<View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <TextInput
                                placeholder={'enter character name'}
                                onChangeText={
                                    text => {
                                        // this.setState({line: text})
                                        // this.onFieldChange(`lineList${index}`)
                                        let { characterList } = this.state;
                                        characterList[index] = text;
                                        this.setState({
                                            characterList
                                        });
                                        // this.onFieldChange("lineList")
                                    }
                                }
                            // value={this.state.lineList[index]}
                            />
                            <Text>: </Text>
                            </View>

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
                <Button title="Add Another Line"
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


            </View>
        )

    }
}

export default TextForm;
