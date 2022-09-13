import "./profile.scss";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../config";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Sidebar from "../../components/sidebar/Sidebar";

const Profile = ({ customerInputs, agentInputs }) => {
  const [formData, setFormData] = useState({});
  const [updating, setUpdating] = useState(false);
  const [customer, setCustomer] = useState({});
  const [agent, setAgent] = useState({});
  const navigate = useNavigate();
  const { id, type, userdispatch } = useContext(UserContext);
  const role = type;

  useEffect(() => {
    if (type === "customer") {
      fetch(`${SERVER_URL}/${role}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      .then((res) => res.ok && res.json())
      .then((data) => {
        setCustomer(data.record);
      })
      .catch((err) => console.log(err));
    } else if (type === "agent") {
      fetch(`${SERVER_URL}/${role}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      .then((res) => res.ok && res.json())
      .then((data) => {
        setAgent(data.record);
      })
      .catch((err) => console.log(err));
    }
  }, [])

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(formData).forEach(([key, value]) => {
      if (value === "") {
        delete formData[key];
      }
    });
    const payload = JSON.stringify(formData);
    const opts = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: payload,
    };
    fetch(`${SERVER_URL}/${role}/${id}`, opts)
      .then((res) => res.ok && res.json())
      .then((data) => {
        if (data.updated && data.updated.firstName) {
          userdispatch({
            type: "SET_USER",
            payload: { name: data.updated.firstName },
          });
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
        <div className="top">
          <h1>Profile</h1>
        </div>
        <div className="bottom">
          <form className="form">
            {role === "customer" ? (
              <>
                {customerInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      name={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      defaultValue={customer[input.name]}
                      onInput={handleInput}
                      disabled={!updating}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {agentInputs.map((input) =>
                  input.type === "select" ? (
                    <div className="formInput" key={input.name}>
                      <label>{input.label}</label>
                      <select
                        name={input.name}
                        required
                        onInput={handleInput}
                        disabled={!updating}
                        defaultValue={{value: agent[input.name], label: agent[input.name]}}
                      >
                        {input.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="formInput" key={input.id}>
                      <label>{input.label}</label>
                      <input
                        name={input.name}
                        type={input.type}
                        placeholder={input.placeholder}
                        defaultValue={agent[input.name] || ''}
                        onInput={handleInput}
                        disabled={!updating}
                      />
                    </div>
                  )
                )}
              </>
            )}
            {updating && <button onClick={handleSubmit}>Update</button>}
            {!updating && (
              <button onClick={setUpdating.bind(null, true)}>
                Edit Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
