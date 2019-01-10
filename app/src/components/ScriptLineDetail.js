import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../Actions';

class ScriptLineDetail extends Component {
    renderTitle() {
        const {script, selected} = this.props
        if (selected) {
            return (
                <Text>selected: {script.item.title}</Text>
            )
        }
    }
    render() {
        const {id, title} = this.props.script.item
        console.log(id);
        // console.log(this.props.SelectedScriptID)

        return (
            <View>
                <Button title={`${title}`}
                 onPress={() => this.props.selectScript(id)}
 />
{this.renderTitle()}</View>


        );
    }
}

const mapStatetoProps = (state, ownProps) => {
    const selected = state.selectedScriptID === ownProps.script.item.id
    return {selected}
}

export default connect(mapStatetoProps, actions)(ScriptLineDetail);

