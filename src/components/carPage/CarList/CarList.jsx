import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselComponent from "../CarCarousel/CarouselComponent";
import "./CarList.css";
const CarList = () => {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(2);
    const [totalPages, setTotalPages] = useState(1);
    const carModels = [{
        "imagePaths" :[
        "/images/1.webp",
        "/images/2.webp"
    ]}];

    useEffect(() => {
        // Загрузка списка автомобилей с учетом фильтра и пагинации
        const url = `http://localhost:8080/api/v1/car/list?page=${page}&size=${size}`;
        axios
            .get(url)
            .then((response) => {
                setCars(response.data.carModels);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page, size]);

    const handlePageChange = (event) => {
        // Обработчик изменения страницы
        const newPage = parseInt(event.target.value);
        setPage(newPage);
    };

    const handlePreviousPage = () => {
        // Обработчик для переключения на предыдущую страницу
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        // Обработчик для переключения на следующую страницу
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handleSizeChange = (event) => {
        // Обработчик изменения размера страницы
        const newSize = parseInt(event.target.value);
        setSize(newSize);
        setPage(1); // Сброс текущей страницы до 1 при изменении размера
    };

    return (
        <div>
            {/* Отображение списка автомобилей */}
            {cars.map((car) => (
                <div className="ListingItem" key={car.id}>
                    <div className="car-listing">
                        <div className="car-image-container">
                            <CarouselComponent carModels={carModels} />
                        </div>
                        <div className="car-details">
                            <h2>{car.make}</h2>
                            <p>{car.model}</p>
                            {/* Вывод остальной информации из endpoint */}
                            <p>Engine: {car.engineGroup}</p>
                            <p>Gear Type: {car.gearType}</p>
                            <p>Transmission: {car.transmission}</p>
                            <p>Body Type: {car.bodyTypeGroup}</p>
                            <p>In Stock: {car.inStock}</p>
                            <p>Year: {car.year}</p>
                            <p>Price: {car.price}</p>
                            <p>Mileage: {car.mileage}</p>
                            <p>Displacement: {car.displacement}</p>
                            <p>Country: {car.country}</p>
                        </div>
                    </div>
                </div>
            ))}

            <div>
                <label>Page:</label>
                <select value={page} onChange={handlePageChange}>
                    {/* Опции для выбора страницы */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
                <button onClick={handlePreviousPage} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>

            <div>
                <label>Size:</label>
                <select value={size} onChange={handleSizeChange}>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>
        </div>
    );
};

export default CarList;
