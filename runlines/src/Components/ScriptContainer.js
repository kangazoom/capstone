import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';



class ScriptContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedCharacter : props.selectedCharacter }

        this.renderCell = this.renderCell.bind(this);
    }

    renderCell(cellData) {
        const selectedCharacter = this.state.selectedCharacter;
        const textColor = (cellData.item.speaking_character === selectedCharacter) ? 'yellow' : 'white';
        return (
            <View style={{ borderColor:'black', borderWidth: 2 }}>
                <Text 
                style={{ backgroundColor: textColor, color:  'black'}}
                onPress={() => {
                    this.onLinePress(cellData)
                }}>{`${cellData.item.speaking_character}: ${cellData.item.line}`}</Text>
            </View>
        );
    }

    onLinePress = (pressedLine) => {
        console.log(pressedLine)
        Actions.testMemoryContainer({ selectedCharacter: this.props.characterName, selectedScript: this.props.selectedScript, selectedLine: pressedLine.item.line, selectedLineIndex: pressedLine.item.index })
    }

    // onTesterPress = (info) => {
    //     console.log(info)
    //     this.props.testerCB('IT WORKED')
    // }


    render() {

        return (
            <View style={styles.containerStyle}>
                {/* <Button 
                title="TEST ME"
                onPress={this.onTesterPress}
                />
                <Text>{this.props.tester}</Text> */}
                <FlatList
                    data={this.props.selectedScript.script_data}
                    renderItem={this.renderCell}
                    keyExtractor={item => JSON.stringify(item.index)}
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

export default ScriptContainer;