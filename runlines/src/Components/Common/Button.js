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
    backgroundColor: '#00A8CE',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#fff',
    shadowRadius: 2,
    elevation: 1,
    margin: 20,
    padding: 20,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    },
    textStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'Helvetica'
      },
}

export default Button;