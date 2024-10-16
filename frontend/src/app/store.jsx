import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import carReducer from "../features/cars_fetch/carSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carReducer
    },
})
