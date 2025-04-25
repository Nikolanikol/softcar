import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../Slices/FilterSlice";
import carReduser from "../Slices/CarSlise";
export const store = configureStore({ reducer: { filterReducer, carReduser } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
