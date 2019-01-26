import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const TextSelectionItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.containerStyle}>
        <Text style={styles.textStyle}>
        {props.children}
        </Text>
        </TouchableOpacity>
    )
}

const styles = {
    containerStyle: {
    backgroundColor: '#00D0FF',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#fff',
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    padding: 20
    },
    textStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Helvetica'
      },
}

export default TextSelectionItem;