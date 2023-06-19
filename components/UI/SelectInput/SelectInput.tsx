/* eslint-disable no-unused-vars */
import React from "react";

import Select from "react-select";

interface Props {
  label: string;
  id?: string;
  placeholder: string;
  value: string;
  options: any[];
  onSelect: (data: any) => void;
}

const SelectInput: React.FC<Props> = ({
  label,
  options,
  placeholder,
  value,
  id,
  onSelect,
}) => {
  const updateSelection = (selectedOption: any) => {
    onSelect(selectedOption.value);
  };
  return (
    <div className="select">
      <label htmlFor="gender" className="select__label">
        {label}:
      </label>
      <div className="select__box">
        <Select
          id={id?.toString()}
          value={value}
          placeholder={value || placeholder}
          options={options}
          onChange={updateSelection}
          styles={{
            control: (baseStyles: any, state: any) => ({
              ...baseStyles,
              fontSize: "1.4rem",
              borderColor: state.isFocused ? "#44607c" : "#6085aa",
              padding: "0 1rem",
              borderWidth: "0.05rem",
              "&:hover": {
                cursor: "pointer",
                borderColor: state.isFocused ? " #6085aa" : "#44607c",
              },
            }),
            option: (provided: any, state: any) => ({
              ...provided,
              fontSize: "1.6rem",
              color: state.isSelected ? "#6085aa" : "#44607c",
              backgroundColor: state.isSelected ? "#3a516a" : "white",
              "&:hover": {
                cursor: "pointer",
                backgroundColor: state.isSelected ? "#007bff" : "#6085aa",
                color: state.isSelected ? "#fff" : "#fff",
              },
            }),
          }}
        />
      </div>
    </div>
  );
};
export default SelectInput;
