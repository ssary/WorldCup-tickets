import React from "react";
import Home from "./Pages/Home";
import Reservation from "./Pages/Reservation";
import { Route, Routes } from "react-router-dom";
import { ReactDOM } from "react";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </div>
  );
}

export default App;
