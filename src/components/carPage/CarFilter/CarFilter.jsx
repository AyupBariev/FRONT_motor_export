import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CarSelector from "../../carSelector/CarSelector";
import "./CarFilter.css";
import CustomSelectContainer from "../../customTags/CustomSelectContainer";
import {countriesByIsoCode} from "../../../data/countriesByIsoCode";
import {engineGroupOptions} from "../../../data/engineGroupOptions";
import {gearTypeOptions} from "../../../data/gearTypeOptions";
import {transmissionOptions} from "../../../data/transmissionOptions";
import {bodyTypeGroupOptions} from "../../../data/bodyTypeGroupOptions";
import CustomInputContainer from "../../customTags/CustomInputContainer";
import {engineCapacity} from "../../../data/engineCapacity";
import {years} from "../../../data/years";

const CarFilter = ({onChange}) => {
    const [carModels, setCarModels] = useState([]);
    const [engineGroup, setEngineGroup] = useState(null);
    const [gearType, setGearType] = useState(null);
    const [transmission, setTransmission] = useState(null);
    const [bodyTypeGroup, setBodyTypeGroup] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [displacementFrom, setDisplacementFrom] = useState(null);
    const [displacementTo, setDisplacementTo] = useState(null);
    const [yearFrom, setYearFrom] = useState(null);
    const [yearTo, setYearTo] = useState(null);

    const countryOptions = countriesByIsoCode.map((country) => {
        const isoCode = Object.keys(country)[0];
        const countryName = Object.values(country)[0];
        return {value: isoCode, label: countryName};
    });
    useEffect(() => {
        // Загрузка списка моделей автомобилей
        axios.get(process.env.REACT_APP_BACKEND_MOTOR_EXPORT + '/api/v1/car/list')
            .then(response => {
                setCarModels(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleFilterChange = (event) => {
        // Обработчик изменений фильтра
        const {name, value} = event.target;
        onChange(name, value);
    };
    const {priceFrom, priceTo, mileageFrom, mileageTo} = onChange;
    return (
        <div className="ListingCarsFilters">
            <div className="MultiFilter__row">
                <div className="ListingCarsFilters__column">
                    <CarSelector onChange={handleFilterChange} activeLabel={false}/>
                </div>
                <div className="ListingCarsFilters__column">
                    <CustomSelectContainer
                        label="Country"
                        name="country"
                        selectedOption={selectedCountry}
                        options={countryOptions}
                        onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                    />
                </div>
            </div>
            <div className="ListingCarsFilters__row">
                <div className="ListingCarsFilters__column">
                    <CustomSelectContainer
                        label="Engine"
                        name="engineGroup"
                        selectedOption={engineGroup}
                        options={engineGroupOptions}
                        onChange={(selectedOption) => setEngineGroup(selectedOption)}
                        padding="2px"
                    />
                    <CustomSelectContainer
                        label="Body Type"
                        name="bodyTypeGroup"
                        selectedOption={bodyTypeGroup}
                        options={bodyTypeGroupOptions}
                        onChange={(selectedOption) => setBodyTypeGroup(selectedOption)}
                        padding="2px"
                    />
                </div>
                <div className="ListingCarsFilters__column">
                    <CustomSelectContainer
                        label="Gear Type"
                        name="gearType"
                        selectedOption={gearType}
                        options={gearTypeOptions}
                        onChange={(selectedOption) => setGearType(selectedOption)}
                        padding="2px"
                    />
                    <CustomSelectContainer
                        label="Transmission"
                        name="transmission"
                        selectedOption={transmission}
                        options={transmissionOptions}
                        onChange={(selectedOption) => setTransmission(selectedOption)}
                        padding="2px"
                    />

                </div>
                <div className="ListingCarsFilters__column">
                    <CustomInputContainer
                        label="Price from, $"
                        value={priceFrom}
                        onChange={handleFilterChange}
                        name="priceFrom"
                        type="number"
                    />

                    <CustomInputContainer
                        label="Price to, $"
                        value={priceTo}
                        onChange={handleFilterChange}
                        name="priceTo"
                        type="number"
                    />
                </div>
            </div>
            <div className="ListingCarsFilters__row">
                <div className="ListingCarsFilters__column">
                    <CustomSelectContainer
                        label="Year from"
                        name="yearFrom"
                        selectedOption={yearFrom}
                        options={years}
                        onChange={(selectedOption) => {
                            if (!yearTo || !selectedOption || selectedOption.value <= yearTo.value) {
                                setYearFrom(selectedOption);
                            }
                        }}
                    />
                    <CustomSelectContainer
                        label="Year to"
                        name="yearTo"
                        selectedOption={yearTo}
                        options={years}
                        onChange={(selectedOption) => {
                            if (!yearFrom || !selectedOption || selectedOption.value >= yearFrom.value) {
                                setYearTo(selectedOption);
                            }
                        }}
                    />
                </div>
                <div className="ListingCarsFilters__column">
                    <CustomInputContainer
                        label="Mileage from, ml"
                        value={mileageFrom}
                        onChange={handleFilterChange}
                        name="mileageFrom"
                        type="number"
                    />
                    <CustomInputContainer
                        label="Mileage to, ml"
                        value={mileageTo}
                        onChange={handleFilterChange}
                        name="mileageTo"
                        type="number"
                    />
                </div>
                <div className="ListingCarsFilters__column">
                    <CustomSelectContainer
                        label="Displ. from"
                        name="displacementFrom"
                        selectedOption={displacementFrom}
                        options={engineCapacity}
                        onChange={(selectedOption) => {
                            if (!displacementTo || !selectedOption || selectedOption.value <= displacementTo.value) {
                                setDisplacementFrom(selectedOption);
                            }
                        }}
                    />
                    <CustomSelectContainer
                        label="Displ. to"
                        name="displacementTo"
                        selectedOption={displacementTo}
                        options={engineCapacity}
                        onChange={(selectedOption) => {
                            if (!displacementFrom || !selectedOption || selectedOption.value >= displacementFrom.value) {
                                setDisplacementTo(selectedOption);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CarFilter;
