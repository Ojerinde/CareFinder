"use client";
import { Hospitalparams } from "@/app/home/addHospital/page";
import React, { useCallback, useState } from "react";

// TYpe for UserData
interface UserData {
  isLoggedIn: boolean;
  email: string | null | undefined;
}

// Type for AppInterface
interface AppInterface {
  children: React.ReactNode;
}

// Type for all the columns for CSV file
export interface CSV {
  name: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  state: string;
  lga: string;
}

// Type for the context
interface AppContextData {
  isLoggedIn: UserData;
  allHospitals: Hospitalparams[];
  filteredHospitals: Hospitalparams[];
  selectedHospitals: CSV[];
  updateLoggedInState: (data: UserData) => void;
  updateAllHospitalState: (hospitals: Hospitalparams[]) => void;
  updateFilteredHospitals: (hospitals: Hospitalparams[]) => void;
  updateSelectedHospitalState: (hospital: CSV[] | []) => void;
}

// Creating a context. THe essence of the object pass to it is for VSCode auto completion.
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

// Creating the context  provider. This component will be wrapped around my root app.
const AppContextProvider: React.FC<AppInterface> = ({ children }) => {
  // Context state managements
  const [isLoggedIn, setIsLoggedIn] = useState<UserData>({
    isLoggedIn: false,
    email: "",
  });
  const [allHospitals, setAllHospitals] = useState<Hospitalparams[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospitalparams[]>(
    []
  );
  const [selectedHospitals, setSelectedHospitals] = useState<any[]>([]);

  // FUnctions to update states. Usecallback is used to memoize the functions.
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
    (data: any) => {
      setSelectedHospitals((prev) => {
        return [...selectedHospitals, data];
      });
    },
    [selectedHospitals]
  );

  // This are the datas and functions that can be accessed from the children components.
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
