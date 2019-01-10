// action creator --> use w components
import FireBaseService from '../components/Network/FireBaseService';
// import GRAB_SCRIPT_SUCCESS from './types';


export const selectScript = (scriptID) => {
    return {
        type: 'select_script',
        payload: scriptID
    };
};

export const grabScriptList = () => {
    // componentDidMount() {
        FireBaseService.initializeService()
        FireBaseService.getScripts()
        .then((scriptsArray) => {
          // Actions.header();
        (dispatch) => {scriptsArray}
      })
            
            // => {
                    // console.log(scriptsArray)
                    //  dispatch({type: GRAB_SCRIPT_SUCCESS, payload: scriptsArray})
                // Actions.header();
        
            // .catch((error) => {
            //     // todo: error handling
            //     console.log('nope')
            // })
        }
      
    
