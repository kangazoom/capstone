// import data from './ScriptList.json';
// import data from '../components/FireBaseInputText';

import GRAB_SCRIPT_SUCCESS from '../Actions/types';

const INITIAL_STATE = {
    scripts: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case (state.length > 0):
        console.log(action.payload)
            // return {...state, id: action.payload};
            return action.payload
        default:
            return state;
    }
};