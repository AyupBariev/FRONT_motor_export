import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/header/Header";
import CarForm from "./components/carForm/CarForm";
import CarPage from "./components/carPage/CarPage";
import CarCard from "./components/carCard/CarCard";
function App() {
  return (
      <div className="app">
        <Header />
        <Router>
          <Routes>
           <Route path="/" element={<CarPage />} />
           <Route path="/car/:guid" element={<CarCard />} />
           <Route path="/cars/used/add/" element={<CarForm />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
