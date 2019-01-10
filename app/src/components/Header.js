import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, Button } from 'react-native';

import ScriptLineDetail from './ScriptLineDetail'

import * as actions from '../Actions';
import { connect } from 'react-redux';

class Header extends Component {
    renderItem(script) {
        return <ScriptLineDetail script={script} />;
    }

    render() {
        console.log(this.props)
        data = this.props.scripts;
        return (
            <FlatList
                data={data}
                renderItem={this.renderItem}
                keyExtractor={item => item.title}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps)
    return { scripts: state.scripts }

};

export default connect(mapStateToProps, actions)(Header);
