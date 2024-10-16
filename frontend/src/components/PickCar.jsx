import { useState,useEffect } from "react";
import CarBox from "./CarBox";
import axios from 'axios'
import { CAR_DATA } from "./CarData";

function PickCar() {
  const [active, setActive] = useState("S Class Maybach");
  const [isLoading, setIsLoading] = useState(true)
  const [colorBtn, setColorBtn] = useState("btn1");
  const [cars, setCars] = useState([]); 

  const btnID = (id) => {
    setColorBtn(colorBtn === id ? "" : id);
  };

  const coloringButton = (id) => {
    return colorBtn === id ? "colored-button" : "";
  };

  useEffect(() => {
    setIsLoading(true)
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/get-car"); 
        setCars(response.data.car); 
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(()=>{
    if(cars){
      setIsLoading(false)
     
    }
  }, [cars])


  return (
    <>
      <section className="pick-section">
        <div className="container">
          <div className="pick-container">
            <div className="pick-container__title">
              <h3>Vehicle Models</h3>
              <h2>Our rental fleet</h2>
              <p>
                Choose from a variety of our amazing vehicles to rent for your
                next adventure or business trip
              </p>
            </div>
            <div className="pick-container__car-content">
              <div className="pick-box">
                {(!isLoading && cars) ? cars.map((car, index) => (
                  <button
                    key={car.id}
                    id={`btn${car.id}`}
                    className={`${coloringButton(`btn${car.id}`)}`}
                    onClick={() => {
                      setActive(car.model);
                      btnID(`btn${car.id}`);
                    }}
                  >
                    {car.model}
                  </button>
                )) : <h1>Loading</h1>}
              </div>

              {(!isLoading && cars) ? cars.map(
                (car) =>
                  active === car.model && <CarBox key={car.id} data={car} />
              ) : <h1>LOADING...</h1>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PickCar;
{
  /* <div className="pick-container__car-content">
              <div className="pick-box">
                <button
                id="btn1"
                  className={`${coloringButton("btn1")}`}
                  onClick={() => {
                    setActive("FirstCar");
                    btnID("btn1");
                  }}
                >
                  Audi A1 S-Line
                </button>
                <button
                  className={`${coloringButton("btn2")}`}
                  id="btn2"
                  onClick={() => {
                    setActive("SecondCar");
                    btnID("btn2");
                  }}
                >
                  VW Golf 6
                </button>
                <button
                  className={`${coloringButton("btn3")}`}
                  id="btn3"
                  onClick={() => {
                    setActive("ThirdCar");
                    btnID("btn3");
                  }}
                >
                  Toyota Camry
                </button>
                <button
                  className={`${coloringButton("btn4")}`}
                  id="btn4"
                  onClick={() => {
                    setActive("FourthCar");
                    btnID("btn4");
                  }}
                >
                  BMW 320 ModernLine
                </button>
                <button
                  className={`${coloringButton("btn5")}`}
                  id="btn5"
                  onClick={() => {
                    setActive("FifthCar");
                    btnID("btn5");
                  }}
                >
                  Mercedes-Benz GLK
                </button>
                <button
                  className={`${coloringButton("btn6")}`}
                  id="btn6"
                  onClick={() => {
                    setActive("SixthCar");
                    btnID("btn6");
                  }}
                >
                  VW Passat CC
                </button>
              </div>

              {active === "FirstCar" && <CarBox data={CAR_DATA} carID={1} />}
              {active === "SecondCar" && <CarBox data={CAR_DATA} carID={0} />}
              {active === "ThirdCar" && <CarBox data={CAR_DATA} carID={2} />}
              {active === "FourthCar" && <CarBox data={CAR_DATA} carID={3} />}
              {active === "FifthCar" && <CarBox data={CAR_DATA} carID={4} />}
              {active === "SixthCar" && <CarBox data={CAR_DATA} carID={5} />}
              
            </div> */
}
