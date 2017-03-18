import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';


import { TOGGLE_SHOW_SNACKBAR } from '../actions';




function hasNewRoute(state = false, action){
    switch (action.type) {
        case TOGGLE_SHOW_SNACKBAR:
            return action.data;
        default:
            return state;
    }
}

const reducers = combineReducers({
    firebase: firebaseStateReducer,
    hasNewRoute: hasNewRoute
});

export default reducers;
