import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
// broken: import { List, ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import UploadFile from './UploadFile';

class Welcome extends Component {
    constructor(props) {
        super(props)        
    }

    onScriptPress = (id) => {
        console.log(`In Welcome Screen: You clicked on a script with ID: ${id}`)
        this.props.selectScriptCB(id)
        // Actions.chooseCharacter()
    }

    // ATTEMPT TO UPDATE PROPS:
    //     onLoad = () => {
    //     Actions.refresh({...this.props});
    //     console.log(this.props)
    // }

    render() {
        // ATTEMPT TO UPDATE PROPS:
        // this.onLoad()

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

        // navigation function
        const { navigate } = this.props.navigation

        // let selectScriptCB = this.props.selectScriptCB;

       console.log(`In Welcome Screen: This is the navigation function...`)
       console.log(this.props.navigation)
       console.log(`In Welcome Screen: This is the navigation function's state...`)
       console.log(this.props.navigation.state)

        return (
            <View>
                <Text style={styles.headerStyle}>You'll learn your lines in no time!</Text>
                <Text style={styles.headerStyle}>Choose or upload a PDF to start!</Text>
                <Text style={styles.headerStyle}>Choose  Script: </Text>

                <FlatList
                    data={scriptCollection}
                    renderItem={({ item }) =>
                        <Button
                            title={`${item.title} by ${item.author}`}
                            onPress={() => this.onScriptPress(item.id)}
                        />
                    }
                    keyExtractor={item => item.title}
                />

                {selectedScript !== null ? <Button
                    onPress={Actions.chooseCharacter}
                    title={`Continue with: ${selectedScript.title}`} /> : <Text></Text>}

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