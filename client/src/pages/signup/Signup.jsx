import "./signup.scss";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {SERVER_URL} from "../../config";

const Signup = ({ customerInputs, agentInputs, adminInputs, admin}) => {
  const [role, setRole] = useState("customer");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setRole(value);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, 
      [name]:value
    })
  };

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
      fetch(`${SERVER_URL}/${role}/register`, opts)
      .then((res) => res.ok && navigate("/login"))
      .catch((err) => console.log(err))
    } else {
      fetch(`${SERVER_URL}/admin/register`, opts)
      .then((res) => res.ok && navigate("/admin"))
      .catch((err) => console.log(err))
    }
  }

  if (admin){
    return (
      <div className="signup">
      <div className="signupContainer">
        <Navbar />
        <div className="top">
          <h1>Signup</h1>
        </div>
        <div className="bottom">
          <form className="form">
            <>
              {adminInputs.map((input) => 
                input.type === "select" ? (
                  <div className="formInput" key={input.name}>
                    <label>{input.label}</label>
                    <select name={input.name} required onInput={handleInput}>
                      {input.options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                ):(
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input name={input.name} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                </div>
                )
              )}
            </> 
            <button onClick={handleSubmit}>Register</button>
          </form>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="signup">
      <div className="signupContainer">
        <Navbar />
        <div className="top">
          <h1>Signup</h1>
        </div>
        <div className="bottom">
          <form className="form">
            {!admin && <div className="formInput">
              <label>Sign up as: </label>
              <select name="role" onInput={handleChange} defaultValue="customer">
                <option value="customer">Customer</option>
                <option value="agent">Agent</option>
              </select>
            </div>}
            {role === "customer" ? (
              <>
                {customerInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input name={input.name} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                  </div>
                ))}
              </>
            ): (
              <>
                {agentInputs.map((input) => 
                  input.type === "select" ? (
                    <div className="formInput" key={input.name}>
                      <label>{input.label}</label>
                      <select name={input.name} required onChange={handleInput}>
                        {input.options.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  ):(
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input name={input.name} type={input.type} placeholder={input.placeholder} onChange={handleInput}/>
                  </div>
                  )
                )}
              </>
            )}
            <button onClick={handleSubmit}>Signup</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup