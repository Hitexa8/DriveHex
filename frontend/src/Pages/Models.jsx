import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { availableAtDate, viewLocations, reset } from '../features/cars_fetch/carSlice';
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import CarImg1 from "../images/cars-big/audi-box.png";
function Models() {
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const { carsAtDate, locations, isLoading } = useSelector((state) => state.cars);

  useEffect(() => {    
    dispatch(viewLocations());
    dispatch(availableAtDate(currentDate));
    console.log(currentDate);
    
  }, [dispatch, currentDate]);

  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();   
    navigate('/');
    setTimeout(() => {
      window.scrollTo(0, 1800);
    }, 2);
  }

  useEffect(() => {
    console.log(carsAtDate); // Log to see the structure
  }, [carsAtDate]);


  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <div className="container">
          <div className="models-div">
          {(!isLoading && carsAtDate && carsAtDate.available && locations) ? carsAtDate.available.map((car) => (
          <div className="models-div__box" key={car.id}>
            <div className="models-div__box__img">
              <img src={car.image} alt="car_img" />
              <div className="models-div__box__descr">
                <div className="models-div__box__descr__name-price">
                  <div className="models-div__box__descr__name-price__name">
                    <p>{car.model}</p>
                    <span>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <div className="models-div__box__descr__name-price__price">
                    <h4>₹{car.price_per_day}</h4>
                    <p>per day</p>
                  </div>
                </div>
                <div className="models-div__box__descr__name-price__details">
                  <span>
                    <i className="fa-solid fa-car-side"></i> &nbsp; {car.brand}
                  </span>
                  <span style={{ textAlign: "right" }}>
                  {car.mileage}  &nbsp; <i className="fa-solid fa fa-tachometer"></i>
                  </span>
                  <span>
                    <i className="fa-solid fa-gear"></i> &nbsp; {car.transmission}
                  </span>
                  <span style={{ textAlign: "right" }}>
                    {car.fuel_type} &nbsp; <i className="fa-solid fa-gas-pump"></i>
                  </span>
                </div>
                <div className="models-div__box__descr__name-price__btn" onClick={handleClick}>
                  <Link to='/' onClick={handleClick}>
                    Book Ride
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )) : ""}
          {(!isLoading && carsAtDate && !carsAtDate.unavailable && locations) ? carsAtDate.unavailable.map((car) => (
          <div className="models-div__box" key={car.id}>
            <div className="models-div__box__img">
              <img src={CarImg1} alt="car_img" />
              <div className="models-div__box__descr">
                <div className="models-div__box__descr__name-price">
                  <div className="models-div__box__descr__name-price__name">
                    <p>{car.model}</p>
                    <span>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </span>
                  </div>
                  <div className="models-div__box__descr__name-price__price">
                    <h4>{car.price_per_day}</h4>
                    <p>per day</p>
                  </div>
                </div>
                <div className="models-div__box__descr__name-price__details">
                  <span>
                    <i className="fa-solid fa-car-side"></i> &nbsp; {car.brand}
                  </span>
                  <span style={{ textAlign: "right" }}>
                    {car.mileage} &nbsp; <i className="fa-solid fa-car-side"></i>
                  </span>
                  <span>
                    <i className="fa-solid fa-car-side"></i> &nbsp; {car.transmission}
                  </span>
                  <span style={{ textAlign: "right" }}>
                    {car.fuel_type} &nbsp; <i className="fa-solid fa-car-side"></i>
                  </span>
                </div>
                <div className="models-div__box__descr__name-price__btn" onClick={handleClick}>
                  <Link to='/' onClick={handleClick}>
                    Book Ride
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )) : ""}
        </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Models