import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setTrackingId(value);
  }
  const goToTracking = () => {
    navigate(`/track/${trackingId}`);
  }
  
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="homeContent">
          <div className="images">
            <div className="hero">
              <div className="homeText">
                <h1>Find Professionals. Get things done.</h1>
                <p>Place orders with our verified agents and track their progress</p>
                <div className="homeSearch">
                  <input type="text" placeholder="TRACKING ID" onChange={handleChange}/>
                  <button onClick={goToTracking}>Track</button>
                </div>
              </div>
            </div>
          </div>
            <div className="page-below">
              <div className="page-below-section">
                <h2>As a customer: <br />Manage all your logistics comfortably in one place</h2>
                <div className="page-below-section-text">
                  <div className="box">
                  <img className="one" src="/icons/credit-card.svg" alt="box" />
                    <h3>Order</h3>
                  </div>
                  <div className="box">
                  <img className="two" src="/icons/search-alt.svg" alt="box" />
                    <h3>Track</h3>
                  </div>
                  <div className="box">
                  <img className="three" src="/icons/question-circle.svg" alt="box" />
                    <h3>Support</h3>
                  </div>           
                </div>
                
              </div>
            </div>
            <div className="page-below">
              <div className="page-below-section">
                <h2>As an agent: <br />Get connected with the customers who need your services most</h2>
                <div className="page-below-section-text">
                  <div className="box">
                  <img className="one" src="/icons/edit.svg" alt="box" />
                    <h3>Register</h3>
                  </div>
                  <div className="box">
                  <img className="two" src="/icons/check-circle.svg" alt="box" />
                    <h3>Accept</h3>
                  </div>
                  <div className="box">
                  <img className="three" src="/icons/coins.svg" alt="box" />
                    <h3>Get Paid</h3>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
