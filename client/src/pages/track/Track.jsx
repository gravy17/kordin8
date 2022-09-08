import "./track.scss"
import Navbar from "../../components/navbar/Navbar"
import { useState } from "react";
import { SERVER_URL } from "../../config";

const Track = () => {
  const [trackingId, setTrackingId] = useState("");
  const [orderDetails, setOrderDetails] = useState({});

  const handleChange = (e) => {
    const { value } = e.target;
    setTrackingId(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${SERVER_URL}/track/${trackingId}`)
      .then((res) => res.ok && res.json())
      .then((data) => {
        setOrderDetails(data);
      })
      .catch((err) => console.log(err))
  }

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
              <input name="tracking" type="text" placeholder="Tracking ID here eg.: 374bc0e0-e3dd-4cf9-a5f3-4a5cb3f26ac7" onChange={handleChange}/>
            </div>   
            <button onClick={handleSubmit}>Track</button>
          </form>
        </div>
        <div className="bottom">
          {orderDetails.order && 
            <div className="orderDetails">
              <h2>Order Details</h2>
              <div className="order">
                <div className="orderInfo">
                </div>
              </div>  
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Track