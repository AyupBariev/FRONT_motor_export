import React, {useState, useEffect} from "react";
import axios from "axios";
import CarouselComponent from "../CarCarousel/CarouselComponent";
import "./CarList.css";
import {engineCapacity} from "../../../data/engineCapacity";
import {countriesByIsoCode} from "../../../data/countriesByIsoCode";
import {bodyTypeGroupOptions} from "../../../data/bodyTypeGroupOptions";
import {engineGroupOptions} from "../../../data/engineGroupOptions";
import {gearTypeOptions} from "../../../data/gearTypeOptions";
import {transmissionOptions} from "../../../data/transmissionOptions";

const CarList = ({filter}) => {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(30);
    const [totalPages, setTotalPages] = useState(1);
    const carModels = [{
        "imagePaths": [
            "/images/1.webp",
            "/images/2.webp"
        ]
    }];

    useEffect(() => {
        // Загрузка списка автомобилей с учетом фильтра и пагинации
        const url = `${process.env.REACT_APP_BACKEND_MOTOR_EXPORT}/api/v1/car/list?page=${page}&size=${size}`;
        axios
            .get(url, { params: filter }) // Передача фильтра как параметров запроса
            .then((response) => {
                setCars(response.data.carModels);
                setTotalPages(response.data.totalPages);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [page, size, filter]);

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
                <a href={process.env.REACT_APP_APP_URL + "/car/" +car.id} className="no-link-style">
                    <div className="ListingItem">
                        <div className="ListingItem__main">
                            <div className="car-image-container">
                                <CarouselComponent carModels={carModels}/>
                            </div>
                            <div className="car-details">
                                <div className="grid-item">
                                    <h3>{car.make} {car.model}</h3>
                                    {/* Вывод остальной информации из endpoint */}
                                    <div className="ListingItem__main">
                                        <div
                                            className="ListingItemTechSummaryDesktop__column ListingItemTechSummaryDesktop__cell">
                                            <span>{engineCapacity.find((engine) => engine.value === car.displacement).label}&nbsp;/&nbsp;{engineGroupOptions.find((engineGroup) => engineGroup.value === car.engineGroup).label}</span>
                                            <p>{transmissionOptions.find((transmission) => transmission.value === car.transmission).label}</p>
                                            <p>{gearTypeOptions.find((gearType) => gearType.value === car.gearType).label}</p>
                                        </div>
                                        <div
                                            className="ListingItemTechSummaryDesktop__column ListingItemTechSummaryDesktop__cell">
                                            <span>{countriesByIsoCode.find((country) => Object.keys(country)[0] === car.country)[car.country]}</span>
                                            <p>{bodyTypeGroupOptions.find((bodyType) => bodyType.value === car.bodyTypeGroup).label}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-item">
                                    <h3>{car.price}&nbsp;$</h3>
                                </div>
                                <div className="grid-item">
                                    <h3 className="fontWeightLight">{car.year}&nbsp;y.</h3>
                                </div>
                                <div className="grid-item">
                                    <h3 className="fontWeightLight">{car.mileage} ml.</h3>
                                    <a  className="linkMessage" href={"https://api.whatsapp.com/send/?phone=971559299569&text=" + encodeURIComponent('Hello! I want to buy the car ' + process.env.REACT_APP_BACKEND_MOTOR_EXPORT + '/api/v1/car/' + car.id) + "&type=phone_number&app_absent=0"}><img
                                        className="w30percent"
                                        src={process.env.REACT_APP_APP_URL + "/images/whatsApp.png"}
                                        alt="Write the message"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            ))}

            <div>
                <label>Page:</label>
                <select value={page} onChange={handlePageChange}>
                    {/* Опции для выбора страницы */}
                    {Array.from({length: totalPages}, (_, index) => (
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
