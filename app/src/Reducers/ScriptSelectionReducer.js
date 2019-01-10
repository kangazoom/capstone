export default (state = null, action) => {
    switch (action.type) {
        case 'select_script':
            return action.payload;
        default:
            return state;
    }
};