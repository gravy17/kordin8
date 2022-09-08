import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SERVER_URL } from "../../config";

const Sidebar = () => {
  const { type, userdispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {  
    fetch(`${SERVER_URL}/${type}/logout`)
    .then((res) => { 
      if (res.ok) {
        userdispatch({ type: "SET_USER", payload: { id: '', type: '', name: '' } }); 
        navigate('/');
      }
    })
  }
  
  return (
    <div className="sidebar">
      <div className="top">
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          {type === "admin" && <Link to="/agents" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Agents</span>
            </li>
          </Link>}
          <Link to="/orders" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>
          <p className="title">USER</p>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link to="#" style={{ textDecoration: "none" }}>
              <ExitToAppIcon className="icon"/>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
