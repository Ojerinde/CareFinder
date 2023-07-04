"use client";
import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { MdFileDownload, MdShare } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { AppContext } from "@/store/AppContext";
import { showToastMessage } from "../login/loginForm";
import LoadingSpinner from "../login/LoadingSpinner/LoadingSpinner";
import SearchHospitalForm from "@/components/AllHospitals/SearchHospitalsForm";
import AllHospitals from "@/components/AllHospitals/AllHospitals";
import { requestTimeout } from "@/library/requestTimeout";
import { downloadCSV, shareCSVByEmail } from "@/library/shareFIle";
import {
  filterHospitalByName,
  filterHospitalsByStateAndLga,
} from "@/library/filters";
import { fetchHospitals } from "@/library/hospitals";

// Home conponent
const Home = () => {
  // Getting access to the session
  const { data: session } = useSession();

  // State managements
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sharing, setSharing] = useState<boolean>(false);

  // Share and download hover effect
  const [share, setShare] = useState(false);
  const [download, setDownload] = useState(false);

  // Getting access to the context created.
  const {
    filteredHospitals,
    allHospitals,
    selectedHospitals,
    updateAllHospitalState,
    updateFilteredHospitals,
  } = useContext(AppContext);

  // Functions to fetch all hospitals in a particular country.
  const fetchCountryHospitals = async (data: string) => {
    try {
      setIsLoading(true);
      const result = await Promise.race([
        fetchHospitals(data.toLowerCase()),
        requestTimeout(120),
      ]);

      updateAllHospitalState(result?.hospitals);
      updateFilteredHospitals(result?.hospitals);
    } catch (error: any) {
      showToastMessage("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Filtering hospitals by state and lga
  const filterHospitalByStateAndLgaHandler = (
    state: string | null,
    lga: string | null
  ) => {
    return filterHospitalsByStateAndLga(
      allHospitals,
      filteredHospitals,
      state,
      lga
    );
  };

  // Filtering hospitals by name
  const filterHospitalByNameHandler = (name: string) => {
    return filterHospitalByName(allHospitals, name);
  };

  // Function to share the selected hospital as CV to the loggedin user
  const shareCSVHandler = async () => {
    setSharing(() => true);
    try {
      const data = await shareCSVByEmail(
        session?.user?.email,
        "List of hospitals",
        "Find attached the list of all the hospitals you selected",
        selectedHospitals
      );
      if (data.error) {
        throw new Error(data.error);
      } else {
        showToastMessage("success", data.message);
      }
    } catch (error: any) {
      showToastMessage("error", error.message);
    } finally {
      setSharing(() => false);
    }
  };

  // Function to download the selected hospital as CV to the loggedin user
  const downloadCSVHandler = () => {
    try {
      const data = downloadCSV("List of hospitals", selectedHospitals);
      showToastMessage("success", data);
    } catch (error: any) {
      showToastMessage("error", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="home">
        <SearchHospitalForm
          onSelect={fetchCountryHospitals}
          onFilter={filterHospitalByStateAndLgaHandler}
          onFilterByName={filterHospitalByNameHandler}
        />
        {filteredHospitals?.length > 0 && (
          <div className="home__icon--box">
            <h2>Result...</h2>
            <div className="flex justify-between">
              <div onClick={shareCSVHandler} className="relative">
                {share && <p className="home__icon__title ">Share</p>}
                {sharing ? (
                  <LoadingSpinner />
                ) : (
                  <MdShare
                    onMouseEnter={() => setShare(true)}
                    onMouseLeave={() => setShare(false)}
                  />
                )}
              </div>
              <div onClick={downloadCSVHandler} className="relative">
                {download && <p className="home__icon__title ">Download</p>}
                <MdFileDownload
                  onMouseEnter={() => setDownload(true)}
                  onMouseLeave={() => setDownload(false)}
                />
              </div>
            </div>
          </div>
        )}
        <div className="w-full">
          <AllHospitals
            isLoading={isLoading}
            allHospitals={filteredHospitals}
            hospitalsPerPage={10}
          />
        </div>
      </section>
    </>
  );
};
export default Home;
