import React, {useState} from "react";
import axios from "axios";
import PhotoList from "../photoList/PhotoList";
import "./CarForm.css";
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import CarSelector from "../carSelector/CarSelector";
import {countriesByIsoCode} from "../../data/countriesByIsoCode";
import CustomSelectContainer from "../customTags/CustomSelectContainer";
import CustomInputContainer from "../customTags/CustomInputContainer";
import {engineGroupOptions} from "../../data/engineGroupOptions";
import {gearTypeOptions} from "../../data/gearTypeOptions";
import {transmissionOptions} from "../../data/transmissionOptions";
import {bodyTypeGroupOptions} from "../../data/bodyTypeGroupOptions";
import {years} from "../../data/years";
import {engineCapacity} from "../../data/engineCapacity";
import { useNavigate } from 'react-router-dom';

const CarForm = () => {
    const [request, setRequest] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [engineGroup, setEngineGroup] = useState(null);
    const [gearType, setGearType] = useState(null);
    const [transmission, setTransmission] = useState(null);
    const [bodyTypeGroup, setBodyTypeGroup] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [year, setYear] = useState(null);
    const [displacement, setDisplacement] = useState(null);
    const countryOptions = countriesByIsoCode.map((country) => {
        const isoCode = Object.keys(country)[0];
        const countryName = Object.values(country)[0];
        return {value: isoCode, label: countryName};
    });
    const navigate = useNavigate();
    const handleChange = (event) => {
        const input = event.target;
        if(event.target.name !== "files") {
            if (event.target.name === "make") {
                setRequest({...request, make: event.target.value, model: ""});
            } else if (event.target.name === "model") {
                setRequest({...request, model: event.target.value});
            } else {
                setRequest({...request, [event.target.name]: event.target.value});
            }
            if (input && input.classList && input.classList.contains("invalid")) {
                input.classList.remove("invalid");
            }
        }
    };


    function handleFileChange(event) {
        const files = event.target.files;
        const newPhotos = Array.from(files);
        setPhotos(newPhotos);
    }

    function handlePhotoDelete(index) {
        const newPhotos = [...photos];
        newPhotos.splice(index, 1);
        setPhotos(newPhotos);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        let isFormValid = true;
        Object.entries(formValues).forEach(([key, value]) => {
            const input = form.elements[key];
            if (value === "" || !value) {
                input.classList.add("invalid");
                isFormValid = false;
            }
        });
        if (isFormValid) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_MOTOR_EXPORT}/api/v1/car/create`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Accept": "application/json"
                    },
                });
                navigate(`/car/${response.data}`);
            } catch (error) {
                console.error(error);
                alert("Error creating car");
            }
        }
    };

    const {make, model, price, mileage, secretKey} = request;

    return (
        <form className="car-form" onSubmit={handleSubmit}>
            <h1 className="OfferTechHeader__carName"><span className="OfferTechHeader__title">{make} {model}</span></h1>
            <CarSelector onChange={handleChange} activeLabel={true}/>
            <CustomSelectContainer
                label="Engine group"
                name="engineGroup"
                selectedOption={engineGroup}
                options={engineGroupOptions}
                onChange={(selectedOption) => setEngineGroup(selectedOption)}
                activeLabel={true}
            />

            <CustomSelectContainer
                label="Gear Type"
                name="gearType"
                selectedOption={gearType}
                options={gearTypeOptions}
                onChange={(selectedOption) => setGearType(selectedOption)}
                activeLabel={true}
            />

            <CustomSelectContainer
                label="Transmission"
                name="transmission"
                selectedOption={transmission}
                options={transmissionOptions}
                onChange={(selectedOption) => setTransmission(selectedOption)}
                activeLabel={true}
            />

            <CustomSelectContainer
                label="Body Type Group"
                name="bodyTypeGroup"
                selectedOption={bodyTypeGroup}
                options={bodyTypeGroupOptions}
                onChange={(selectedOption) => setBodyTypeGroup(selectedOption)}
                activeLabel={true}
            />
            <CustomSelectContainer
                label="Year"
                name="year"
                selectedOption={year}
                options={years}
                onChange={(selectedOption) => setYear(selectedOption)}
                activeLabel={true}
            />

            <CustomInputContainer
                label="Price"
                value={price}
                onChange={handleChange}
                name="price"
                type="number"
                activeLabel={true}
            />


            <CustomInputContainer
                label="Mileage"
                value={mileage}
                onChange={handleChange}
                name="mileage"
                type="number"
                activeLabel={true}
            />

            <CustomSelectContainer
                label="Displacement"
                name="displacement"
                selectedOption={displacement}
                options={engineCapacity}
                onChange={(selectedOption) => setDisplacement(selectedOption)}
                activeLabel={true}
            />

            <CustomSelectContainer
                label="Country"
                name="country"
                selectedOption={selectedCountry}
                options={countryOptions}
                onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                activeLabel={true}
            />

            <CustomInputContainer
                label="Secret Key"
                value={secretKey}
                onChange={handleChange}
                name="secretKey"
                type="text"
                activeLabel={true}
            />
            <label className="file-upload file-preview file-preview-item">
                <FontAwesomeIcon icon={faCamera} style={{color: "gray", fontSize: "43px"}}/>
                <input type="file" name="files" onChange={handleFileChange} multiple/>
            </label>
            <span style={{fontSize: '12px', color: 'gray', margin: '4px 0 0 0'}}>Upload max 5 photos</span>
            <PhotoList photos={photos} onPhotoDelete={handlePhotoDelete}/>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CarForm;
