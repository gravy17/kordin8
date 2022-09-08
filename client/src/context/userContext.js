import { createContext, useReducer } from "react";
import UserReducer from "./userReducer";
import { getCookie } from "../cookieControl";

const INITIAL_STATE = {
  type: getCookie('user-type') || null,
  name: getCookie('user-name') || null,
  id: getCookie('user-id') || null,
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
