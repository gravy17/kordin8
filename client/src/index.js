import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { UserContextProvider } from "./context/userContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

