import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

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
        <div className="max-w-[1200px] px-3 mx-auto  relative">
          <Header />

          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={route.component} />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
