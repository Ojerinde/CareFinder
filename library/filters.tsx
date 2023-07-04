import { Hospitalparams } from "@/app/home/addHospital/page";

export const filterHospitalByName = (
  allHospitals: Hospitalparams[],
  name: string
) => {
  const filteredArray = allHospitals.filter((item) => {
    const itemName = item.hospitalName.toLowerCase();
    const searchName = name.toLowerCase();
    return itemName.includes(searchName);
  });
  return filteredArray;
};

export const filterHospitalsByStateAndLga = (
  allHospitals: Hospitalparams[],
  filteredHospitals: Hospitalparams[],
  state: string | null,
  lga: string | null
) => {
  // Filter by state only
  if (lga === null || lga.trim() === "") {
    return allHospitals.filter((hospital) => hospital.state === state);
  }

  // Filter by state and LGA
  return filteredHospitals.filter(
    (hospital) => hospital.state === state && hospital.lga === lga
  );
};
