import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        headerText = this.props.headerText;

        return (
            <Text style={styles.headerStyle}> {headerText} </Text>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        fontSize: 50,
    }
});

export default Header;
