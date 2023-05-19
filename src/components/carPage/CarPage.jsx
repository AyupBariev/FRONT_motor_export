import React, {useState} from 'react';
import CarFilter from './CarFilter/CarFilter';
import CarList from './CarList/CarList';
import "./CarPage.css";

const CarPage = () => {
    const [filter, setFilter] = useState({make: '', model: ''});

    const handleFilterChange = (name, value) => {
        setFilter({...filter, [name]: value});
    };

    return (
        <div className="car-page-container">
            <div className="content-container">
                <CarFilter onChange={handleFilterChange}/>

                <CarList filter={filter}/>
            </div>
            <div className="sidebar-container">

            </div>
        </div>
    );
};

export default CarPage;
