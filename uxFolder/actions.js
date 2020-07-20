

// action types
export const ADD_WAYPOINT = 'ADD_WAYPOINT';
export const DELETE_WAYPOINT = 'DELETE_WAYPOINT';
export const EDIT_WAYPOINT = 'EDIT_WAYPOINT';
export const SAVE_NUMBER = 'SAVE_NUMBER';
export const DELETE_ROUTE = "DELETE_ROUTE";


// action creators
export const addWaypoint = waypoint => ({
  type: ADD_WAYPOINT,
  payload: waypoint,
})

export const deleteWaypoint = number => ({
  type: DELETE_WAYPOINT,
  payload: number,
})

export const editWaypoint = waypoint => ({
  type: EDIT_WAYPOINT,
  payload: waypoint,
})

export const saveNumber = number => ({
  type: SAVE_NUMBER,
  payload: number,
})


export const deleteRoute = () => ({
  type: DELETE_ROUTE,
  payload: [],
})
