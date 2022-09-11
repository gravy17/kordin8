import "./login.scss"
import Navbar from "../../components/navbar/Navbar"
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { UserContext } from "../../context/userContext";

const Login = ({admin}) => {
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({});
  const { userdispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setRole(value);
  }
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = JSON.stringify(formData);
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: payload,
    };
    if (!admin){
      fetch(`${SERVER_URL}/${role}/login`, opts)
        .then((res) => res.json())
        .then((data) => {
          if (data.id){
            userdispatch({ type: "SET_USER", payload: { id:data.id, type:data.type, name:data.name } });
            navigate("/dashboard");
          }   
        })
        .catch((err) => console.log(err))
    } else {
      fetch(`${SERVER_URL}/admin/login`, opts)
      .then((res) => res.json())
      .then((data) => {
        if (data.id){
          userdispatch({ type: "SET_USER", payload: { id:data.id, type:data.type, name:data.name } });
          navigate("/dashboard");
        }   
      })
      .catch((err) => console.log(err))
    }
  }

  return (
    <div className="login">
      <div className="loginContainer">
        <Navbar />
        <div className="top">
          <h1>Login</h1>
        </div>
        <div className="bottom">
          <form className="form">
            {!admin && <div className="formInput">
              <label>Login as: </label>
              <select name="role" onInput={handleChange} defaultValue="customer">
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
              </select>
            </div>}
            <div className="formInput">
              <label>Email</label>
              <input name="email" type="email" placeholder="johndoe@example.com" onChange={handleInput}/>
            </div>
            <div className="formInput">
              <label>Password</label>
              <input name="password" type="password" placeholder="123Secret" onChange={handleInput}/>
            </div>
              
            <button onClick={handleSubmit}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login