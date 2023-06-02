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
    const [engineGroup, setEngineGroup] = useState(null);
    const [gearType, setGearType] = useState(null);
    const [transmission, setTransmission] = useState(null);
    const [bodyTypeGroup, setBodyTypeGroup] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [displacementFrom, setDisplacementFrom] = useState(null);
    const [displacementTo, setDisplacementTo] = useState(null);
    const [yearFrom, setYearFrom] = useState(null);
    const [yearTo, setYearTo] = useState(null);
    const [showFilter, setShowFilter] = useState(false);

    const handleToggleFilter = () => {
        setShowFilter(!showFilter);
    };

    const countryOptions = countriesByIsoCode.map((country) => {
        const isoCode = Object.keys(country)[0];
        const countryName = Object.values(country)[0];
        return {value: isoCode, label: countryName};
    });

    const handleFilterChange = (event) => {
        // Обработчик изменений фильтра
        const {name, value} = event.target;
        onChange(name, value);
    };
    const {priceFrom, priceTo, mileageFrom, mileageTo} = onChange;
    return (
        <>
            <button className="Tag filter-toggle-button" onClick={handleToggleFilter}>
                <span className="Tag__child Tag__child_element">
                <svg className="IconSvg IconSvg_filter-16 IconSvg_size_16">
                    <path fill="currentColor" fillRule="evenodd" clipRule="evenodd"
                          d="M5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1.5c1.38 0 2.542-.932 2.892-2.2H16V3.8H7.918a3.001 3.001 0 0 0-5.836 0H0v1.5h2.108A3.001 3.001 0 0 0 5 7.5zm6 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 1.5a3.001 3.001 0 0 1-2.892-2.2H0v-1.5h8.082a3.001 3.001 0 0 1 5.836 0H16v1.5h-2.108A3.001 3.001 0 0 1 11 14.5z"></path>
                </svg>
                </span>
                <span className="Tag__child Tag__child_text">Filter</span>

            </button>
            <div className={`ListingCarsFilters ${showFilter ? 'show' : ''}`}>
                <div className="MultiFilter__row">
                    <div className="ListingCarsFilters__column">
                        <CarSelector onChange={handleFilterChange}/>
                    </div>
                    <div className="ListingCarsFilters__column">
                        <CustomSelectContainer
                            label="Country"
                            name="country"
                            selectedOption={selectedCountry}
                            options={countryOptions}
                            onChange={(selectedOption) => {
                                setSelectedCountry(selectedOption);
                                handleFilterChange({
                                    target: {
                                        name: 'country',
                                        value: selectedOption ? selectedOption.value : null
                                    }
                                });
                            }}
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
                            onChange={(selectedOption) => {
                                setEngineGroup(selectedOption);
                                handleFilterChange({
                                    target: {
                                        name: 'engineGroup',
                                        value: selectedOption ? selectedOption.value : null
                                    }
                                });
                            }}
                            padding="2px"
                        />
                        <CustomSelectContainer
                            label="Body Type"
                            name="bodyTypeGroup"
                            selectedOption={bodyTypeGroup}
                            options={bodyTypeGroupOptions}
                            onChange={(selectedOption) => {
                                setBodyTypeGroup(selectedOption);
                                handleFilterChange({
                                    target: {
                                        name: 'bodyTypeGroup',
                                        value: selectedOption ? selectedOption.value : null
                                    }
                                });
                            }}
                            padding="2px"
                        />
                    </div>
                    <div className="ListingCarsFilters__column">
                        <CustomSelectContainer
                            label="Gear Type"
                            name="gearType"
                            selectedOption={gearType}
                            options={gearTypeOptions}
                            onChange={(selectedOption) => {
                                setGearType(selectedOption);
                                handleFilterChange({
                                    target: {
                                        name: 'gearType',
                                        value: selectedOption ? selectedOption.value : null
                                    }
                                });
                            }}
                            padding="2px"
                        />
                        <CustomSelectContainer
                            label="Transmission"
                            name="transmission"
                            selectedOption={transmission}
                            options={transmissionOptions}
                            onChange={(selectedOption) => {
                                setTransmission(selectedOption);
                                handleFilterChange({
                                    target: {
                                        name: 'transmission',
                                        value: selectedOption ? selectedOption.value : null
                                    }
                                });
                            }}
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
                                    handleFilterChange({
                                        target: {
                                            name: 'yearFrom',
                                            value: selectedOption ? selectedOption.value : null
                                        }
                                    });
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
                                    handleFilterChange({
                                        target: {
                                            name: 'yearTo',
                                            value: selectedOption ? selectedOption.value : null
                                        }
                                    });
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
                                    handleFilterChange({
                                        target: {
                                            name: 'displacementFrom',
                                            value: selectedOption ? selectedOption.value : null
                                        }
                                    });
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
                                    handleFilterChange({
                                        target: {
                                            name: 'displacementTo',
                                            value: selectedOption ? selectedOption.value : null
                                        }
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CarFilter;
