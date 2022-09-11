import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Track from "./pages/track/Track";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Profile from "./pages/profile/Profile";
import Orders from "./pages/orders/Orders";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { orderInputs, adminInputs, customerInputs, agentInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { UserContext } from "./context/userContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { type } = useContext(UserContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup customerInputs={customerInputs} agentInputs={agentInputs} />} />
            <Route path="track">
              <Route index element={<Track />} />
              <Route path=":id" element={<Track />} />
            </Route>
            <Route path="profile" element={<Profile customerInputs={customerInputs} agentInputs={agentInputs}/>} />
            <Route path="admin">
              <Route index element={<Login admin={true} />} />
              {type === "admin" && <Route path="register" element={<Signup admin={true} adminInputs={adminInputs}/>} />}
            </Route>
            {type === "admin" && <Route path="agents" element={<List/>} />}
            <Route path="orders">
              <Route index element={<Orders />} />
              <Route path=":id" element={<Single />} />
              {type === "customer" && <Route
                path="new"
                element={<New inputs={orderInputs} title="Place an Order" />}
              />}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App


