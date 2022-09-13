import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SERVER_URL } from "../../config";
import { UserContext } from "../../context/userContext";

const Single = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [tracker, setTracker] = useState({});
  const [copied, setCopied] = useState(false);
  const [tracking, setTracking] = useState("");
  const {type} = useContext(UserContext)

  useEffect(() => {
    fetch(`${SERVER_URL}/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
    }).then((res) => res.ok && res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [])

  const getTracking = (e) => {
    e.preventDefault();
    fetch(`${SERVER_URL}/track/order/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tracker),
      credentials: "include",
    }).then((res) => res.ok && res.json())
      .then((data) => {
        setTracking(data.id);
      });
  }

  const handleInput = (e) => {
    const trackerInfo = {
      ...tracker,
      [e.target.name]: e.target.value
    }
    setTracker(trackerInfo);
  }
  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(tracking);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000)
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {order && !!order.id && <div className="top">
          <div className="left">
            <h1 className="title">Order Information</h1>
            <div className="item">
              <div className="details">
                <h2 className="itemTitle">{order.orderType}: <span className={order.status?.replace(' ','')}>{order.status}</span></h2>
                <div className="detailItem">
                  <span className="itemKey">Order ID:</span>
                  <span className="itemValue">{order.id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{order.price}</span>
                </div>
                {!!order.recipient && <div className="detailItem">
                  <span className="itemKey">Recipient:</span>
                  <span className="itemValue">
                    {order.recipient}
                  </span>
                </div>}
                {!!order.description && <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{order.description}</span>
                </div>}
              </div>
            </div>
            <div className="item">
              <div className="details">
                <h2 className="itemTitle">Customer: {order.customer.firstName} {order.customer.lastName}</h2>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{order.customer.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{order.customer.phone}</span>
                </div>
              </div>
            </div>
            {order.assignedAgent && 
              <div className="item">
                <div className="details">
                  <h2 className="itemTitle">Agent: {order.assignedAgent.firstName} {order.assignedAgent.lastName}</h2>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{order.assignedAgent.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{order.assignedAgent.phone}</span>
                  </div>
                </div>
              </div>
            }
            {type === "customer" && 
              <div className="tracking">
                <h2 className="title">Tracking</h2>
                <div className="details">
                  <div className="formInput">
                    <label>Name</label>
                    <input name="name" type="text" placeholder="Name of contact" onChange={handleInput}/>
                  </div>
                  <div className="formInput">
                    <label>Email</label>
                    <input name="email" type="text" placeholder="Email to send updates to" onChange={handleInput}/>
                  </div>
                  <div className="formInput">
                    <label>Phone</label>
                    <input name="phone" type="text" placeholder="Phone to send text updates" onChange={handleInput}/>
                  </div>
                </div>
                <button className="button" onClick={getTracking}>Share Tracking</button>
                {!!tracking.length && <div className="details">
                    <div className="formInput" onClick={copyToClipboard}>
                      <label>New tracking id {copied?"copied!":"(click to copy to clipboard)"}:</label>
                      <input value={tracking} disabled/>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Single;
