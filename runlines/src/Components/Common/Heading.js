import React from 'react';
import {View, Text} from 'react-native';

const Heading = (props) => {
    return (
        <View>
        <Text style={styles.headerStyle}>{props.children}</Text>
        </View>
    )
}

const styles = {
    headerStyle: {
        color: '#000',
        fontFamily: 'Helvetica',
        fontSize: 20,
        fontWeight: '400',
        marginTop: 20,
    }
}

export default Heading;