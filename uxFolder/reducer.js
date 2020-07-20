import {combineReducers} from 'redux'

import {ADD_WAYPOINT, DELETE_ROUTE} from './actions.js'

const merge = (prev , next) => Object.assign({}, prev, next);

const waypointReducer = (state = [], action) => {
  if (action.type === 'ADD_WAYPOINT') return [...state, action.payload];
  if (action.type === 'DELETE_WAYPOINT') {
    let newState = [...state];
    newState.splice(action.payload , 1);
    console.warn(action.payload);
    console.warn(newState);
    return newState
  }
  if(action.type === 'SAVE_NUMBER'){
    let newState = [...state];
    newState[action.payload].edit = 'true';
    return newState;
  }
  if (action.type === 'EDIT_WAYPOINT') {
     let newState = [...state];
     let index = newState.indexOf(newState.find(wp => wp.edit === "true"));
     console.warn(index);
     if( index !== -1){
       newState[index] = action.payload;
       console.warn(newState[index]);
       newState[index].edit = "false"
     }
     console.warn(newState);
     return newState
  }
  if (action.type === 'DELETE_ROUTE') return [];
  return state
}



const reducer = combineReducers({
  waypoint : waypointReducer,
})

export default reducer
