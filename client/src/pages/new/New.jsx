import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {SERVER_URL} from "../../config";

const New = ({ inputs, title }) => {
  const [order, setOrder] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target)
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = JSON.stringify(order);
    console.log(payload);
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: payload,
    };
    fetch(`${SERVER_URL}/order`, opts)
    .then((res) => res.ok && navigate("/orders"))
    .catch((err) => console.log(err))
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <form>
            {inputs.map((input) =>
              input.type === "select" ? (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <select name={input.name} defaultValue={{ label: "Select service", value: ""}} onInput={handleChange} required>
                  <option key="select_service" value="">Select service</option>
                    {input.options.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              ):(
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input type={input.type} name={input.name} placeholder={input.placeholder} onChange={handleChange}/>
              </div>
              )
            )}
            <button onClick={handleSubmit}>Place Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
