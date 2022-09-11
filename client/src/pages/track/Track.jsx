import "./track.scss"
import Navbar from "../../components/navbar/Navbar"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../config";

const Track = () => {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState({});
  const {id} = useParams();

  const handleChange = (e) => {
    const { value } = e.target;
    setTrackingId(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${SERVER_URL}/track/${trackingId}`)
      .then((res) => res.ok && res.json())
      .then((data) => {
        setOrder(data.order);
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if(id) {
      setTrackingId(id);
      fetch(`${SERVER_URL}/track/${id}`)
      .then((res) => res.ok && res.json())
      .then((data) => {
        setOrder(data.order);
      })
      .catch((err) => console.log(err))
    }
  }, [])

  return (
    <div className="track">
      <div className="trackContainer">
        <Navbar />
        <div className="top">
          <h1>Track Order</h1>
        </div>
        <div className="bottom">
          <form className="form">
            <div className="formInput">
              <label>Tracking ID</label>
              <input name="tracking" type="text" defaultValue={trackingId} onChange={handleChange}/>
            </div>   
            <button onClick={handleSubmit}>Track</button>
          </form>
        </div>
        {order && !!order.status &&
          <div className="bottom">
            <div className="orderDetails">
              <h1 className="title">Order Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{order.orderType}: <span className={order.status?.replace(' ','')}>{order.status}</span></h1>
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
              </div>
            </div>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">Customer: {order.customer.firstName} {order.customer.lastName}</h1>
              </div>
            </div>
            {order.assignedAgent && 
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">Agent: {order.assignedAgent.firstName} {order.assignedAgent.lastName}</h1>
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
            </div>
        </div>}
      </div>
    </div>
  )
}

export default Track