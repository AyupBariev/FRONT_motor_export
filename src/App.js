import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Header from "./components/header/Header";
import CarForm from "./components/carForm/CarForm";
import CarPage from "./components/carPage/CarPage";

function App() {
  const [filter, setFilter] = useState({
    make: "",
    bodyType: "",
    year: "",
    engineType: "",
    transmission: "",
  });

  const [cars, setCars] = useState([
    {
      id: 1,
      make: "BMW",
      model: "3-series",
      bodyType: "седан",
      year: "2015",
      engineType: "бензин",
      transmission: "автомат",
      price: 1500000,
      imageUrl: "https://avatars.mds.yandex.net/get-autoru-vos/1935053/ddf48934f71e1a1d1358cf4176b1d325/1200x900n",
    },
    {
      id: 2,
      make: "Mercedes-Benz",
      model: "C-class",
      bodyType: "седан",
      year: "2017",
      engineType: "дизель",
      transmission: "автомат",
      price: 1800000,
      imageUrl: "https://avatars.mds.yandex.net/get-autoru-vos/2158987/bc59417b508e21f360a645620689aedb/1200x900n",
    },
    {
      id: 3,
      make: "Audi",
      model: "A4",
      bodyType: "седан",
      year: "2016",
      engineType: "бензин",
      transmission: "механика",
      price: 1200000,
      imageUrl: "https://avatars.mds.yandex.net/get-autoru-vos/4432101/237e9a199f1aa39d2e9a86890b58552b/1200x900n",
    },
    {
      id: 4,
      make: "Volkswagen",
      model: "Passat",
      bodyType: "седан",
      year: "2018",
      engineType: "бензин",
      transmission: "автомат",
      price: 1300000,
      imageUrl: "https://avatars.mds.yandex.net/get-autoru-vos/1959786/581c13680667c3adbf3e72c4efd07fdb/1200x900n",
    },
  ]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const filteredCars = cars.filter((car) => {
    return (
        (filter.make === "" || car.make === filter.make) &&
        (filter.bodyType === "" || car.bodyType === filter.bodyType) &&
        (filter.year === "" || car.year === filter.year) &&
        (filter.engineType === "" || car.engineType === filter.engineType) &&
        (filter.transmission === "" || car.transmission === filter.transmission)
    );
  });

  return (
      <div className="app">
        <Header />
        <Router>
          <Routes>
           <Route path="/" element={<CarPage />} />
           <Route path="/cars/used/add/" element={<CarForm />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
