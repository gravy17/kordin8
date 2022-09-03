import { createContext, useReducer } from "react";
import UserReducer from "./userReducer";

const INITIAL_STATE = {
  type: null,
  name: null,
  id: null
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, userdispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ type: state.type, id: state.id, name: state.name, userdispatch }}>
      {children}
    </UserContext.Provider>
  );
};
