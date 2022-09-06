import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <Navbar />
        <div className="homeContent">
        <div className="images">
            <div className="homeText">
              <h1>Find your Luggages </h1>
              <p>Ship, manage, track, deliver.</p>
            </div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="homeSearch">
            <input type="text" placeholder="TRACKING ID" /><button>Track</button>
          </div>
          </div>
            <div className="page-below">
              <div className="page-below-image"></div>
              <div className="page-below-section">
                <h2>Manage your shipment and returns</h2>
                <div className="page-below-section-text">
                  <div className="box">
                  <img className="one" src="https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-notifications-automation-technology-flaticons-flat-flat-icons.png" alt="box" />
                    <h3>Notifications</h3>
                  </div>
                  <div className="box">
                  <img className="two" src="https://img.icons8.com/external-soft-fill-juicy-fish/60/000000/external-hour-contact-us-soft-fill-soft-fill-juicy-fish.png" alt="box" />
                    <h3>24/7 Support</h3>
                  </div>
                  <div className="box">
                  <img className="three" src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/000000/external-lorry-transportation-icongeek26-glyph-icongeek26-1.png" alt="box" />
                    <h3>Delivery</h3>
                  </div>
                  
                  <div className="box">
                  <img className="four" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-notifications-automation-technology-flaticons-lineal-color-flat-icons.png" alt="box" />
                    <h3>Get Alerted</h3>
                  </div>             
     
                </div>
                
              </div>
            </div>
           
            <footer class="footer">
                
               
              </footer>
            
            
            
        </div>
      </div>
    </div>
  );
};

export default Home;
