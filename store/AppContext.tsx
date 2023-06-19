"use client";
import { Hospitalparams } from "@/app/home/addHospital/page";
import React, { useCallback, useState } from "react";

interface UserData {
  isLoggedIn: boolean;
  email: string | null | undefined;
}
interface AppInterface {
  children: React.ReactNode;
}

export interface CSV {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  lga: string;
}

interface AppContextData {
  isLoggedIn: UserData;
  allHospitals: Hospitalparams[];
  filteredHospitals: Hospitalparams[];
  selectedHospitals: CSV[];
  updateLoggedInState: (data: UserData) => void;
  updateAllHospitalState: (hospitals: Hospitalparams[]) => void;
  updateFilteredHospitals: (hospitals: Hospitalparams[]) => void;
  updateSelectedHospitalState: (hospital: CSV) => void;
}

export const AppContext = React.createContext<AppContextData>({
  isLoggedIn: { isLoggedIn: false, email: "" },
  allHospitals: [],
  filteredHospitals: [],
  selectedHospitals: [],
  updateLoggedInState: (data: UserData) => {},
  updateAllHospitalState: (hospitals: Hospitalparams[]) => {},
  updateFilteredHospitals: (hospitals: Hospitalparams[]) => {},
  updateSelectedHospitalState: (hospital) => {},
});

const AppContextProvider: React.FC<AppInterface> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<UserData>({
    isLoggedIn: false,
    email: "",
  });
  const [allHospitals, setAllHospitals] = useState<Hospitalparams[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospitalparams[]>(
    []
  );
  const [selectedHospitals, setSelectedHospitals] = useState<any[]>([]);

  const updateLoggedInState = useCallback((data: UserData) => {
    setIsLoggedIn(data);
  }, []);

  const updateAllHospitalState = useCallback((data: Hospitalparams[]) => {
    setAllHospitals(data);
  }, []);
  const updateFilteredHospitals = useCallback((data: Hospitalparams[]) => {
    setFilteredHospitals(data);
  }, []);

  const updateSelectedHospitalState = useCallback(
    (data: CSV) => {
      setSelectedHospitals((prev) => {
        return [...selectedHospitals, data];
      });
    },
    [selectedHospitals]
  );

  const data: AppContextData = {
    isLoggedIn,
    allHospitals,
    filteredHospitals,
    selectedHospitals,
    updateLoggedInState,
    updateAllHospitalState,
    updateFilteredHospitals,
    updateSelectedHospitalState,
  };

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
