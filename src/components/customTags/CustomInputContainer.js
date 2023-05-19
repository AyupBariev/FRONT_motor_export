import React, { useState } from "react";

const CustomInputContainer = ({ label, value, onChange, type, name, activeLabel }) => {
    const [inputValue, setInputValue] = useState(value || ''); // Устанавливаем начальное значение

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(event); // Передаем событие изменения дальше
        }
    };

    return (
        <div className="custom-input-container">
            {value && activeLabel && <label>{label}</label>}
            <input
                type={type}
                name={name}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={label}
            />
        </div>
    );
};

export default CustomInputContainer;
