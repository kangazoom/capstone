import React from 'react';
import {View, Text} from 'react-native';

const Header = (props) => {
    return (
        <View>
        <Text style={styles.headerStyle}>{props.children}</Text>
        </View>
    )
}

const styles = {
    headerStyle: {
        color: '#000',
        fontFamily: 'Verdana',
        fontSize: 20,
        fontWeight: '400',
        // textDecorationLine: 'underline',
        // textDecorationColor: '#CC00FF',
        margin: 20,
    }
}

export default Header;