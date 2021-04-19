import { ADD_RESULTS, DELETE_RESULTS, SET_USER } from "./actions";

export function userReducer(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.data;
    default:
      return state;
  }
}

export function resultsReducers(state = [], action) {
  switch (action.type) {
    case ADD_RESULTS:
      return [...state, action.results];     
    case DELETE_RESULTS:
      const newState=[...state]
      newState.splice(action.index, 1)
      return newState;
    default:
      return state;
  }
}
