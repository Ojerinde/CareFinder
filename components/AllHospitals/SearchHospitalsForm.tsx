import React, { useContext, useReducer, useState } from "react";
import SelectInput from "../UI/SelectInput/SelectInput";
import InputField from "../UI/InputField/InputField";
import classes from "./SearchHospital.module.css";
import {
  generateCountryForSelectField,
  generateLgasForSelectField,
  generateStatesForSelectField,
} from "@/library/generators";
import { generateUniqueIdentifier } from "@/library/generateUniqueIdentifier";
import { AppContext } from "@/store/AppContext";
import { Hospitalparams } from "@/app/home/addHospital/page";

export interface HospitalData {
  country: string;
  state: string;
  lga: string;
  hospitalName: string;
}

const initialState: HospitalData = {
  country: "",
  state: "",
  lga: "",
  hospitalName: "",
};

// Reducer function to update the from fields
const reducer = (state: HospitalData, action: any) => {
  switch (action.type) {
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_STATE":
      return { ...state, state: action.payload };
    case "SET_LGA":
      return { ...state, lga: action.payload };
    case "SET_HOSPITAL_NAME":
      return { ...state, hospitalName: action.payload };
    default:
      return state;
  }
};

interface Props {
  onSelect: (data: string) => void;
  onFilter: (state: string | null, lga: string | null) => Hospitalparams[];
  onFilterByName: (name: string) => Hospitalparams[];
}
const SearchHospitalForm: React.FC<Props> = ({
  onSelect,
  onFilter,
  onFilterByName,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { updateFilteredHospitals } = useContext(AppContext);

  const [lgasOptions, setLgasOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // All avalable states for the selected country
  const [stateOptions, setStateOptions] = useState<
    { value: string; label: string }[]
  >([]);

  // All available countries options
  const countryOptions = generateCountryForSelectField();

  // Functions to update the countries
  const setCountry = (country: string) => {
    dispatch({ type: "SET_COUNTRY", payload: country });
    // All available states options for the selected country
    setStateOptions(() => generateStatesForSelectField(country));
    onSelect(country);
  };

  // Functions to update the states
  const setState = (state: string) => {
    dispatch({ type: "SET_STATE", payload: state });
    // All available lgas options for the selected state
    setLgasOptions(() => generateLgasForSelectField(state));
    const filteredHospitals = onFilter(state, null);
    updateFilteredHospitals(filteredHospitals);
  };

  // Functions to update the lga
  const setLGA = (lga: string) => {
    dispatch({ type: "SET_LGA", payload: lga });
    const filteredHospitals = onFilter(state.state, lga);
    updateFilteredHospitals(filteredHospitals);
  };

  // Functions to update the hospital name
  const setHospitalName = (name: any) => {
    dispatch({ type: "SET_HOSPITAL_NAME", payload: name.target.value });
    const filteredHospitals = onFilterByName(name.target.value);
    updateFilteredHospitals(filteredHospitals);
  };

  return (
    <section className="w-full">
      <h1 className={classes.h1}>
        Search for an hospital by country, state, lga or name.
      </h1>
      <form className="w-full mx-auto">
        <div className="flex justify-between">
          <div className="basis-[47%] max-lg:w-full">
            <SelectInput
              id={generateUniqueIdentifier()}
              key={generateUniqueIdentifier()}
              label="Select Country"
              placeholder="Choose a Country"
              options={countryOptions}
              onSelect={setCountry}
              value={state.country}
            />
          </div>
          <div className="basis-[47%] max-lg:w-full">
            <SelectInput
              id={generateUniqueIdentifier()}
              key={generateUniqueIdentifier()}
              label="Select State"
              placeholder="Choose a State"
              options={stateOptions}
              onSelect={setState}
              value={state.state}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="basis-[47%] ">
            <SelectInput
              id={generateUniqueIdentifier()}
              key={generateUniqueIdentifier()}
              label="LGA"
              placeholder="Choose lga"
              options={lgasOptions}
              onSelect={setLGA}
              value={state.lga}
            />
          </div>
          <div className="basis-[47%]">
            <InputField
              id="hospitalName"
              label="Hospital Name"
              name="hospitalName"
              type="text"
              placeholder="Or search by name"
              onChange={setHospitalName}
              value={state.hospitalName}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchHospitalForm;
