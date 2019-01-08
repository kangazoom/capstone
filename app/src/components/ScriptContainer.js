import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';

class ScriptContainer extends Component {
    render() {
        return (
            <View>
             <FlatList
          data={this.props.scriptLines.script_data}
          renderItem={({ item }) => 
          <Text>{`${item.speaking_character}: ${item.line}`}</Text>}
          keyExtractor={item => JSON.stringify(item.index)}
          />
            </View>
        );
    }
}

export default ScriptContainer;