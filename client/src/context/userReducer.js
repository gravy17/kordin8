import { setCookie } from '../cookieControl'; 

const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      const newState = {
        ...state,
        ...action.payload,
      }
      setCookie("user-type", newState.type, 7);
      setCookie("user-id", newState.id, 7);
      setCookie("user-name", newState.name, 7);
      return newState
    }
    default:
      return state;
  }
};

export default UserReducer;
