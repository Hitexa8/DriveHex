import axios from "axios";

const BACKEND_DOMAIN = "http://127.0.0.1:8000/";
const LOCATION_FETCH = "http://127.0.0.1:8000/view-locations";
const GET_CAR_AT_LOCATION = "http://127.0.0.1:8000/get-car/";
const AVAILABLE_CARS_AT_DATE = "http://127.0.0.1:8000/available-cars/";
const GET_CAR = "http://127.0.0.1:8000/get-car/";
const GET_ALLCARS = "http://127.0.0.1:8000/get-car";

const config = {
    headers: {
      "Content-Type": "application/json",
    },
};

const viewLocations = async () => {
    const response = await axios.get(LOCATION_FETCH);
    return response.data.locations;
}

const availableCars = async ({location, pickup}) => {
    const response = await axios.post(GET_CAR_AT_LOCATION, {"location" : location, "pickup":pickup}, config)
    return response.data.car;
}

const availableCar = async () => {
    const response = await axios.post(GET_CAR_AT_LOCATION)
    return response.data.car;
}

const allCarsDisplay = async () => {
    const response = await axios.get(GET_ALLCARS)
    return response.data.car;
}

const availableAtDate = async (pickup_date) => {
    const response = await axios.post(AVAILABLE_CARS_AT_DATE, {"pickup_date" : pickup_date}, config)
    return response.data;
}

const getCar = async (id) => {
    const response = await axios.post(GET_CAR, {"id": id}, config)
    return response.data.car;
}

export const locService = { viewLocations }
export const carService = { availableCars, availableAtDate, getCar, availableCar, allCarsDisplay }