import { useEffect, useState } from "react";
import CarAudi from "../images/cars-big/audia1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  availableCar,
  availableCars,
  viewLocations,
} from "../features/cars_fetch/carSlice";
import axios from "axios";
import { toast } from "react-toastify";

function BookCar() {
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).access
    : "";
  const refresh = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).refresh
    : "";
  const [modal, setModal] = useState(false); //  class - active-modal
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const today = new Date().toISOString().split("T")[0]
  const todayDate = new Date(today);
  todayDate.setDate(todayDate.getDate() + 1);
  const year1 = todayDate.getFullYear();
  const month1 = String(todayDate.getMonth() + 1).padStart(2, "0");
  const day1 = String(todayDate.getDate()).padStart(2, "0");
  const tomorrow = todayDate.toISOString().split("T")[0];
  const [date, setDate] = useState(`${year}-${month}-${day}`);
  const[tomorrowdate, setTomorrowDate] = useState(`${year1}-${month1}-${day1}`)
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    email: null,
    phone_number: null,
    address: null,
    driving_license_number: null,
    license_expiry_date: null,
    city: null,
    pincode: null,
    car_name: null,
    pickup_date: null,
    end_date: null,
    total_price: null,
    status: null,
  });

  // booking car
  const [car, setCar] = useState({
    pickTime: null,
    dropTime: null,
    carType: null,
    pickUp: null,
    dropOff: null,
  });
  const { pickUp, pickTime, carType, dropOff, dropTime } = car;
  const [carImg, setCarImg] = useState("");

  const [formdata, setFormData] = useState({
    name: null,
    lastName: null,
    phone: null,
    age: null,
    email: null,
    address: null,
    city: null,
    zipcode: null,
    driving_license_number: null,
    license_expiry_date: null,
  });


  const fetch_user = async (token, refreshToken) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user-details/",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const isValidPhoneNumber = (phone) => /^\d{10}$/.test(phone);
      const isValidAge = (age) => age >= 18 && age <= 100;

      setFormData((prev) => ({
        ...prev,
        name: response.data.first_name,
        lastName: response.data.last_name,
        email: response.data.email,
      }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        try {
          const refreshResponse = await axios.post(
            "http://localhost:8000/token/refresh/",
            {
              refresh: refreshToken,
            }
          );

          const newAccessToken = refreshResponse.data.access;
          const retryResponse = await axios.post(
            "http://localhost:8000/user-details/",
            {},
            {
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );

          setFormData((prev) => ({
            ...prev,
            name: retryResponse.data.first_name,
            lastName: retryResponse.data.last_name,
            email: retryResponse.data.email,
          }));
        } catch (refreshError) {
          console.log("Failed to refresh token:", refreshError);
        }
      } else {
        console.log("Error fetching user details:", error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!age || age < 18) {
      // toast.error("Age must be at least 18.")
      isValid = false;
    }

    if (!name) {
      // toast.error("First name is required.")
      isValid = false;
    }
    if (!lastName) {
      // toast.error("Last name is required.")
      isValid = false;
    }
    if (!phone) {
      // toast.error("Phone number is required.")
      isValid = false;
    }
    if (!email) {
      // toast.error("Email is required.")
      isValid = false;
    }
    if (!address) {
      // toast.error("Address is required.")
      isValid = false;
    }
    if (!city) {
      // toast.error("City is required.")
      isValid = false;
    }
    if (!zipcode) {
      // toast.error("Zipcode is required.")
      isValid = false;
    }

    return isValid;
  };

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    name,
    lastName,
    phone,
    age,
    email,
    address,
    city,
    zipcode,
    driving_license_number,
    license_expiry_date,
  } = formdata;

  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    if (token == "") {
      navigate("/login");
      // toast.error
    } else if (
      car.dropTime === null ||
      car.dropOff === null ||
      car.pickTime === null ||
      car.pickUp === null ||
      car.carType === null
    ) {
      errorMsg.style.display = "flex";
    } else {
      setModal(!modal);
      const modalDiv = document.querySelector(".booking-modal");
      modalDiv.scroll(0, 0);
      errorMsg.style.display = "none";
    }
  };

  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);

  const confirmBooking = (e) => {
    e.preventDefault();
    setBooking({
      email: email,
      phone_number: phone,
      address: address,
      city: city,
      pincode: zipcode,
      driving_license_number: driving_license_number,
      license_expiry_date: license_expiry_date,
      car_name: carType,
      pickup_date: pickTime,
      end_date: dropTime,
      total_price: 500,
      status: "Confirmed",
    });
    const book = Object.values(booking).every(
      (val) => val !== null && val !== ""
    );
    if (validateForm() && book) {
      const bookCar = async () => {
        try {
          const response = await axios.post(
            "http://localhost:8000/book/",
            booking,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setModal(!modal);
          const doneMsg = document.querySelector(".booking-done");
          doneMsg.style.display = "flex";
          toast.success("Booking confirmed successfully");
        } catch (error) {
          if (error.response) {
            toast.error(error.response.data.detail);
          } else {
            console.log("Failed to book car:", error);
          }
        }
      };
      bookCar();
    }
  };

  // taking value of booking inputs
  const handleCar = (e) => {
    setCar((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // based on value name show car img
  let imgUrl;
  switch (carImg) {
    case "Audi A1 S-Line":
      imgUrl = CarAudi;
      break;
    case "VW Golf 6":
      imgUrl = CarGolf;
      break;
    case "Toyota Camry":
      imgUrl = CarToyota;
      break;
    case "BMW 320 ModernLine":
      imgUrl = CarBmw;
      break;
    case "Mercedes-Benz GLK":
      imgUrl = CarMercedes;
      break;
    case "VW Passat CC":
      imgUrl = CarPassat;
      break;
    default:
      imgUrl = "";
  }

  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };

  const [locations_state, setLocationsState] = useState([]);
  const [loc, setLoc] = useState("");
  const [cars_state, setCarsState] = useState([]);
  const { carsAtLocation, locations, isLoading, isError, message } =
    useSelector((state) => state.cars);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewLocations());
    dispatch(availableCar());
    if (token != "") {
      fetch_user(token, refresh);
    }
  }, []);

  useEffect(() => {
    dispatch(availableCars({ location: loc, pickup: pickTime }));
  }, [loc, pickTime]);

  useEffect(() => {
    if (locations && carsAtLocation) {
      setLocationsState(locations.map((location) => location.name));
      setCarsState(carsAtLocation);
    }
  }, [carsAtLocation, locations]);

  return (
    <>
      <section id="booking-section" className="book-section">
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
        ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select
                    value={pickUp ? pickUp : ""}
                    onChange={(e) => {
                      const selectedLocation = e.target.value;
                      setLoc(selectedLocation);
                      handleCar({
                        target: { name: "pickUp", value: selectedLocation },
                      });
                    }}
                  >
                    <option>Select pick up location</option>
                    {locations_state.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off{" "}
                    <b>*</b>
                  </label>
                  <select
                    value={dropOff ? dropOff : ""}
                    name="dropOff"
                    onChange={handleCar}
                  >
                    <option>Select drop off location</option>
                    {locations_state.map((location, index) => (
                      <option key={index} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Your Car
                    Type <b>*</b>
                  </label>
                  <select onChange={handleCar} name="carType">
                    <option>Select your car type</option>
                    {cars_state.map((car, index) => (
                      <option key={index} value={car.model}>
                        {car.model}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    name="pickTime"
                    min={today}
                    value={pickTime ? pickTime : ""}
                    onChange={handleCar}
                    
                    onClick={(e) => {
                      if (!e.target.value) {
                        e.target.value = date;
                      }
                      car.pickTime = e.target.value;
                    }}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-off <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    name="dropTime"
                    min={tomorrow}
                    value={dropTime ? dropTime : ""}
                    onChange={handleCar}
                    onClick={(e) => {
                      if (!e.target.value) {
                        e.target.value = tomorrowdate;
                      }
                      car.dropTime = e.target.value;
                    }}
                    type="date"
                  ></input>
                </div>

                <button onClick={openModal} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>
        <div className="booking-modal__message">
          <h4>
            <i className="fa-solid fa-circle-info"></i> Upon completing this
            reservation enquiry, you will receive:
          </h4>
          <p>
            Your rental voucher to produce on arrival at the rental desk and a
            toll-free customer support number.
          </p>
        </div>
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {pickTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    {dropTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{pickUp}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{dropOff}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> {carType}
            </h5>
            {imgUrl && <img src={imgUrl} alt="car_img" />}
          </div>
        </div>
        <div className="booking-modal__person-info">
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>
                  First Name <b>*</b>
                </label>
                <input
                  value={name ? name : ""}
                  onChange={handleFormData}
                  type="text"
                  placeholder="Enter your first name"
                  name="name"
                  readOnly
                  required
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Last Name <b>*</b>
                </label>
                <input
                  value={lastName ? lastName : ""}
                  onChange={handleFormData}
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  readOnly
                  required
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>

              <span>
                <label>
                  Phone Number <b>*</b>
                </label>
                <input
                  value={phone ? phone : ""}
                  onChange={handleFormData}
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phone"
                  required
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Age <b>*</b>
                </label>
                <input
                  value={age ? age : ""}
                  onChange={handleFormData}
                  type="number"
                  placeholder="18"
                  name="age"
                  required
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email <b>*</b>
                </label>
                <input
                  value={email ? email : ""}
                  onChange={handleFormData}
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  readOnly
                  required
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Address <b>*</b>
                </label>
                <input
                  value={address ? address : ""}
                  onChange={handleFormData}
                  type="text"
                  placeholder="Enter your street address"
                  name="address"
                  required
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
              <span>
                <label>
                  Driving Licence <b>*</b>
                </label>
                <input
                  value={driving_license_number ? driving_license_number : ""}
                  onChange={handleFormData}
                  type="text"
                  placeholder="Enter your driving licence details."
                  name="driving_license_number"
                  required
                ></input>
              </span>
              <span>
                <label>
                  Driving Licence Expiry<b>*</b>
                </label>
                <input
                  value={license_expiry_date ? license_expiry_date : ""}
                  onChange={handleFormData}
                  type="text"
                  placeholder="Enter your licence expiry."
                  name="license_expiry_date"
                  required
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>
                  City <b>*</b>
                </label>
                <input
                  value={city ? city : ""}
                  onChange={handleFormData}
                  type="text"
                  placeholder="Enter your city"
                  name="city"
                  required
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Zip Code <b>*</b>
                </label>
                <input
                  value={zipcode ? zipcode : ""}
                  onChange={handleFormData}
                  type="text"
                  placeholder="Enter your zip code"
                  name="zipcode"
                  required
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <span className="info-form__checkbox">
              <input type="checkbox"></input>
              <p>Please send me latest news and updates</p>
            </span>

            <div className="reserve-button">
              <button onClick={confirmBooking}>Reserve Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BookCar;
