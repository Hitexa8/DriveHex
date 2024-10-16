import { useState } from "react";

function CarBox({ data }) {
  const [carLoad, setCarLoad] = useState(true);

  return (
    <div className="box-cars">
      <div className="pick-car">
        {carLoad && <span className="loader"></span>}
        <img
          style={{ display: carLoad ? "none" : "block" }}
          src={data.image}
          alt="car_img"
          onLoad={() => setCarLoad(false)}
        />
      </div>
      <div className="pick-description">
        <div className="pick-description__price">
          <span>₹{data.price_per_day}</span>/- day
        </div>
        <div className="pick-description__table">
          <div className="pick-description__table__col">
            <span>Model</span>
            <span>{data.model}</span> 
          </div>

          <div className="pick-description__table__col">
            <span>Brand</span>
            <span>{data.brand}</span>  
          </div>

          <div className="pick-description__table__col">
            <span>Year</span>
            <span>{data.year}</span> 
          </div>

          <div className="pick-description__table__col">
            <span>Mileage</span>
            <span>{data.mileage}</span>
          </div>

          <div className="pick-description__table__col">
            <span>Type</span>
            <span>{data.type}</span> 
          </div>

          <div className="pick-description__table__col">
            <span>Transmission</span>
            <span>{data.transmission}</span>  
          </div>

          <div className="pick-description__table__col">
            <span>Fuel</span>
            <span>{data.fuel_type}</span>  
          </div>

          <div className="pick-description__table__col">
            <span>Pickup Location</span>
            <span>{data.pickup_location}</span>  
          </div>
        </div>
        <a className="cta-btn" href="#booking-section">
          Reserve Now
        </a>
      </div>
    </div>
  );
}

export default CarBox;
