import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import UploadFile from './UploadFile';

class Welcome extends Component {
    constructor(props) {
        super(props)
    }

    onScriptPress = (id) => {
        console.log(id)
        this.props.selectScriptCB(id)
    }

    render() {

        // let scriptCollection = this.props.scriptCollection.map((script, i) => {
        //     script['id'] = i;
        //     return (<Button key={i} title={script.title} onPress={onScriptPress} />);
        // });

        let {
            scriptCollection,
            selectScriptCB,
            selectedScript,
        } = this.props;

        let {
            id,
            title,
            author,
            description,
            script_data,
        } = scriptCollection;

        // let selectScriptCB = this.props.selectScriptCB;


        return (
            <View>
                <Text style={styles.headerStyle}>You'll learn your lines in no time!</Text>
                <Text style={styles.headerStyle}>Choose or upload a PDF to start!</Text>
                <Text style={styles.headerStyle}>Choose  Script: </Text>
                <Text>{ selectedScript!==null ? selectedScript.title : ''} </Text>

                <FlatList
                    data={scriptCollection}
                    renderItem={({ item }) =>
                        <Button
                            title={`${item.title} by ${item.author}`}
                            onPress={() => this.onScriptPress(item.id)}
                        />
                    }
                    keyExtractor={item => item.title}
                // keyExtractor = {(item, index) => item.title}
                />



                <UploadFile />
            </View>);
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


/* <FlatList
data={scriptCollection}
renderItem={({ item }) => 
<Button 
title={`${item.title} by ${item.author}`} 
onPress={this.onScriptPress}
/> */

// <Button
// title={`${item.title} by ${item.author}`}
// onPress={this.onScriptPress}
// id={i}
// />