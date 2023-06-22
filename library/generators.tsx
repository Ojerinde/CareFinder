import { allStates } from "./states";

const generateCountryForSelectField = () => {
  return [
    { label: "Nigeria", value: "Nigeria" },
    { label: "Kenya", value: "Kenya" },
  ];
};

const generateStatesForSelectField = (coutryName: string) => {
  if (coutryName.toLowerCase() !== "nigeria") return [];

  const modifiedStates = allStates.map((state: any) => ({
    value: state.state,
    label: state.state,
  }));
  return modifiedStates;
};

const generateLgasForSelectField = (stateName: string) => {
  const foundState = allStates.find((state) => state.state === stateName);
  if (!foundState) {
    return []; // Return an empty array if state is not found
  }

  const modifiedLgas = foundState.lgas.map((lga) => ({
    value: lga,
    label: lga,
  }));
  return modifiedLgas;
};

export {
  generateLgasForSelectField,
  generateStatesForSelectField,
  generateCountryForSelectField,
};
