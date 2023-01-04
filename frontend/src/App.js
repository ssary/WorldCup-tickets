import React from "react";
import Home from "./Pages/Home";
import Reservation from "./Pages/Reservation";
import Analytics from "./Pages/Analytics"
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/Analytics" element={<Analytics/>}/>
      </Routes>
    </div>
  );
}

export default App;
