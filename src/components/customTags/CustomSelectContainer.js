import React, {useState} from "react";
import Select from "react-select";

const CustomSelectContainer = ({label, selectedOption, options, onChange, name, activeLabel, padding}) => {
    return (
        <div className="custom-select-container">
            <label>{selectedOption && activeLabel ? label : null}</label>
            <Select
                value={selectedOption}
                name={name}
                options={options}
                onChange={onChange}
                placeholder={label}
                classNamePrefix="cstm-select"
                isSearchable
                isClearable
                styles={{
                    menu: (base) => ({
                        ...base,
                        whiteSpace: "normal",
                        textOverflow: "unset",
                        overflow: "visible"
                    }),
                    option: (provided) => ({
                        ...provided,
                        whiteSpace: "normal",
                        textOverflow: "unset",
                        overflow: "visible"
                    }),
                    value: (base) => ({
                        ...base,
                        overflow: "visible"
                    }),
                    singleValue: (base) => ({
                        ...base,
                        overflow: "visible"
                    }),
                    clearIndicator: (base) => ({
                        ...base,
                        padding: padding?padding:"8px"
                    }),
                    dropdownIndicator: (base) => ({
                        ...base,
                        padding: padding?padding:"8px"
                    }),
                }}
            />
        </div>
    );
};

export default CustomSelectContainer;
