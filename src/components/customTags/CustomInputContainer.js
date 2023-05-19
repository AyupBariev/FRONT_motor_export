import React, {useState} from "react";
const CustomInputContainer = ({ label, value, onChange, type, name, activeLabel }) => {
    return (
        <div className="custom-input-container">
            {value && activeLabel && <label>{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
            />
        </div>
    );
};
export default CustomInputContainer;
