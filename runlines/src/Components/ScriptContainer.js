import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Heading from './Common/Heading'
import styles from './Common/MainStyles';


class ScriptContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedScript: props.selectedScript,
            selectedCharacter : props.selectedCharacter }

        this.renderCell = this.renderCell.bind(this);
    }

    renderCell(cellData) {
        const selectedCharacter = this.state.selectedCharacter;
        const textColor = (cellData.item.speaking_character === selectedCharacter) ? '#FFE251' : '#fff';
        return (
            <View style={{ borderColor:'#333', borderWidth: 1}}>
                <Text 
                style={{ backgroundColor: textColor, color: '#000', flexWrap: "wrap", padding: 2}}
                onPress={() => {this.onLinePress(cellData)}}
                >
                <Text style={{fontWeight: 'bold'}}>{cellData.item.speaking_character}:</Text> 
                {cellData.item.line}</Text>
            </View>
        );
    }

    onLinePress = (pressedLine) => {
        console.log(pressedLine)
        Actions.testMemoryContainer({ 
            selectedScript: this.state.selectedScript,
            selectedCharacter: this.state.characterName, 
            selectedLine: pressedLine.item.line, 
            selectedLineIndex: pressedLine.item.index 
        })
    }

    render() {
        let {
            selectedScript,
        } = this.state

        return (
            <View style={styles.container}>
                <Heading>{selectedScript.title} by {selectedScript.author}</Heading>
                <Text style={{marginBottom: 5}}>{selectedScript.description}</Text>
                <FlatList
                    data={selectedScript.script_data}
                    renderItem={this.renderCell}
                    keyExtractor={item => JSON.stringify(item.index)}
                />
            </View>
        );
    }
}

export default ScriptContainer;