export const SET_USER = "SET_USER";
export const ADD_RESULTS = "ADD_RESULTS";
export const DELETE_RESULTS = "DELETE_RESULTS";

export function setUser(data) {
  return {
    type: SET_USER,
    data,
  };
}

export function addResults(results) {
  return {
    type: ADD_RESULTS,
    results,
  };
}

export function createDeleteResults(index) {
  return {
    type: DELETE_RESULTS,
    index,
  };
}