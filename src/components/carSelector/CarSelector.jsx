import React, {useState} from 'react';
import {carData} from '../../data/carData';
import Select from 'react-select';

const CarSelector = ({onChange, activeLabel}) => {
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);

    const handleMakeChange = (selectedOption) => {
        setSelectedMake(selectedOption);
        setSelectedModel(null);
        onChange({target: {name: 'make', value: selectedOption ? selectedOption.value : ''}});
    };

    const handleModelChange = (selectedOption) => {
        setSelectedModel(selectedOption);
        onChange({target: {name: 'model', value: selectedOption ? selectedOption.value : ''}});
    };

    const makeOptions = carData.map((car) => ({
        value: car.make,
        label: car.make
    }));

    let modelOptions = [];
    if (selectedMake) {
        const car = carData.find((car) => car.make === selectedMake.value);
        if (car) {
            modelOptions = car.models.map((model) => ({
                value: model,
                label: model
            }));
        }
    }

    return (
        <>
            <div className="custom-select-container">

                <label htmlFor="make">{selectedMake && activeLabel ? "Make" : null}</label>
                <Select
                    id="make"
                    name="make"
                    options={makeOptions}
                    onChange={handleMakeChange}
                    value={selectedMake}
                    placeholder="Make"
                    classNamePrefix="cstm-select"
                    isSearchable
                    isClearable
                />
            </div>
            <div className="custom-select-container">
                <label htmlFor="model">{selectedModel && activeLabel ? "Model" : null}</label>
                <Select
                    id="model"
                    name="model"
                    options={modelOptions}
                    onChange={handleModelChange}
                    value={selectedModel}
                    placeholder="Model"
                    classNamePrefix="cstm-select"
                    isSearchable
                    isClearable
                    isDisabled={!selectedMake}
                />
            </div>
        </>
    );
};

export default CarSelector;
