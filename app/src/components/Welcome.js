import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';

import UploadFile from './UploadFile';

class Welcome extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        let scriptCollection = this.props.scriptCollection;
        console.log(scriptCollection)

        // if (scriptCollection===undefined) {
        //     console.log('DID NOT LOAD')
        //     return null;
        //   }

        return (
            <View>
                <Text style={styles.headerStyle}>You'll learn your lines in no time!</Text>
                <Text style={styles.headerStyle}>Choose or upload a PDF to start!</Text>
                <Text style={styles.headerStyle}>Choose  Script: </Text>
                <FlatList
          data={scriptCollection}
          renderItem={({ item }) => 
          <Text>{`${item.title} by ${item.author}`}</Text>}
          keyExtractor={item => JSON.stringify(item.title, item.author)}
          />
                <UploadFile />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        fontSize: 20,
    }
});

export default Welcome;

/* <FlatList
data={scriptCollection}
renderItem={({ script }) =>
    <Text>{`${script.title} by ${script.author}`}</Text>}
/> */
