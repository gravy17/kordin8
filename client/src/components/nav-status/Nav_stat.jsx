import "./nav_stat.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Nav_stat = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { name } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Kordin8</span>
        </Link>
        <div className="items">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="item link">Home</span>
          </Link>
          <Link to="/track" style={{ textDecoration: "none" }}>
            <span className="item link">Track</span>
          </Link>
          { name?
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="item link">Dashboard</span>
          </Link>
          :(
          <>
            <Link to="" style={{ textDecoration: "none" }}>
              <span className="item link"></span>
            </Link>
            <Link to="" style={{ textDecoration: "none" }}>
              <span className="item link"></span>
            </Link>
          </>)
          }
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {name &&
          <div className="item">
            <span className="avatar">
              {name[0]}
            </span>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Nav_stat;
