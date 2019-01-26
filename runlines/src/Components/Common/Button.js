import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>
        {props.children}
        </Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonStyle: {
        // flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#FFE251',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#333',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginLeft: 5,
        marginRight: 5
    },
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
      },
}

export default Button;