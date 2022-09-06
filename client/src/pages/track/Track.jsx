import "./track.scss"
import Navbar from "../../components/navbar/Navbar"

const Track = () => {
  
      return (
    <div className="track">
      <div className="trackContainer">
        <Navbar />
        <div className="trackContent">
            <div className="trackText">
              <h2>Track your Luggages </h2>
              <p>Ship, manage, track, deliver.</p>
            </div>
          </div>
          <hr />
          <h4>Your result is loading....</h4>
      </div>
    </div>
  )
}

export default Track