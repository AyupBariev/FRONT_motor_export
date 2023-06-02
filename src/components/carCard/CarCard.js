import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './CarCard.css';
import {CardInfoByKey} from "../../data/CardInfoByKey";
import {engineCapacity} from "../../data/engineCapacity";
import {gearTypeOptions} from "../../data/gearTypeOptions";
import {transmissionOptions} from "../../data/transmissionOptions";
import CarouselComponent from "../carPage/CarCarousel/CarouselComponent";
import {countriesByIsoCode} from "../../data/countriesByIsoCode";
import {bodyTypeGroupOptions} from "../../data/bodyTypeGroupOptions";
import SpaceDigitComponent from "../common/SpaceDigitComponent";
import {engineGroupOptions} from "../../data/engineGroupOptions";

const CarCard = () => {
    const {guid} = useParams();
    const navigate = useNavigate();
    const [carData, setCarData] = useState(null);
    const carModels = [{
        "imagePaths": [
            "/images/1.webp",
            "/images/2.webp"
        ]
    }];
    const countryOptions = countriesByIsoCode.map((country) => {
        const isoCode = Object.keys(country)[0];
        const countryName = Object.values(country)[0];
        return {value: isoCode, label: countryName};
    });

    useEffect(() => {
        // Функция для загрузки информации о машине с использованием guid
        const fetchCarData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/car/?id=${guid}`);
                setCarData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchCarData();
    }, [guid]);

    if (!carData) {
        return <div>Loading...</div>;
    }
    const goBack = () => {
        navigate(-1); // Редирект на предыдущую страницу
    };

    return (
        <div className="car-card">
            <button onClick={goBack}>←&nbsp;Go&nbsp;back</button>
            <div className="CardHead__topRow">
                <div className="CardHead__topRowLeftColumn">
                    <h3 className="nowrap">{carData.make} {carData.model}, {carData.year}</h3>
                    <a
                        className="linkMessage"
                        href={"https://api.whatsapp.com/send/?phone=971559299569&text=" + encodeURIComponent('Hello! I want to buy the car ' + process.env.REACT_APP_BACKEND_MOTOR_EXPORT + '/api/v1/car/' + guid) + "&type=phone_number&app_absent=0"}
                        style={{textAlign:"right", paddingRight: "21px"}}
                    >
                        <img
                            className="w20percent"
                            src={process.env.REACT_APP_APP_URL + "/images/whatsApp.png"}
                            alt="Write the message"
                        />
                    </a>
                </div>
            </div>
            <div className="CardOfferBody__columnsWrapper">
                <div className="CardOfferBody__leftColumn">
                    <ul className="CardInfo__list-MZpc1">
                        {Object.entries(carData).map(([key, value]) => {
                            const info = CardInfoByKey.find((item) => item.key === key);
                            if (key === "gearType") {
                                const gearTypeLabel = gearTypeOptions.find(option => option.value === value)?.label;
                                value = gearTypeLabel || value;
                            } else if (key === "engineGroup") {
                                const engineGroupLabel = engineGroupOptions.find(option => option.value === value)?.label;
                                value = engineGroupLabel || value;
                            } else if (key === "displacement") {
                                const engineCapacityLabel = engineCapacity.find(option => option.value === value)?.label;
                                value = engineCapacityLabel || value;
                            } else if (key === "country") {
                                const engineCapacityLabel = countryOptions.find(option => option.value === value)?.label;
                                value = engineCapacityLabel || value;
                            } else if (key === "bodyTypeGroup") {
                                const engineCapacityLabel = bodyTypeGroupOptions.find(option => option.value === value)?.label;
                                value = engineCapacityLabel || value;
                            } else if (key === "transmission") {
                                const transmissionLabel = transmissionOptions.find(option => option.value === value)?.label;
                                value = transmissionLabel || value;
                            } else if (key === "price") {
                                value = <span><SpaceDigitComponent digits={value}/>&nbsp;{"$"}</span>;
                            } else if (key === "mileage") {
                                value = <span><SpaceDigitComponent digits={value}/>&nbsp;{"ml."}</span>;
                            }
                            if (info) {
                                return <li key={key} className="CardInfoRow">
                                    <span className="CardInfoRow__cell">{info.label}</span>
                                    <span className="CardInfoRow__cell">{value}</span>
                                </li>;
                            }
                            return null;
                        })}
                    </ul>
                    {/*<a className="linkMessage"*/}
                    {/*   href={"https://api.whatsapp.com/send/?phone=971559299569&text=" + encodeURIComponent('Hello! I want to buy the car ' + process.env.REACT_APP_BACKEND_MOTOR_EXPORT + '/api/v1/car/' + guid) + "&type=phone_number&app_absent=0"}><img*/}
                    {/*    className="w20percent"*/}
                    {/*    src={process.env.REACT_APP_APP_URL + "/images/whatsApp.png"}*/}
                    {/*    alt="Write the message"/></a>*/}
                </div>
                <div className="CardOfferBody__rightColumn">
                    <CarouselComponent carModels={carModels}/>
                </div>
            </div>

            {/* Другие свойства машины */}
        </div>
    );
};

export default CarCard;
