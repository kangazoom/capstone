import {combineReducers} from 'redux';
import ScriptReducer from './ScriptReducer';
import ScriptSelectionReducer from './ScriptSelectionReducer'

export default combineReducers({
    scripts: ScriptReducer,
    selectedScriptID: ScriptSelectionReducer
});

// console.log(store.getState())