import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "./App.css";
import { CarapisClient, CarapisClientError } from "encar";
import { runEncarApiExamples } from "./Servise/encarApi";
import MyFilter from "./Components/MyFilter/MyFilter";
import { useDispatch, useSelector } from "react-redux";
import { getCarsByManufacturer } from "./Servise";
import { AppDispatch, RootState } from "./Store/Store";
import { Root } from "@radix-ui/react-slot";
import { Car } from "lucide-react";
import CarList from "./Components/CarList/CarList";
import { routes } from "./Pages/Router";
import Header from "./Components/Header";

//////////////////////////////////////////

//////////////////////////////////////////////////

function App() {
  //   if (!data) return <div>Loading...</div>;
  //   if (loading) return <div>Loading...</div>;
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={route.component} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
