/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import { MdFileDownload, MdShare } from "react-icons/md";
import { AppContext } from "@/store/AppContext";
import { ToastContainer } from "react-toastify";
import { showToastMessage } from "../login/loginForm";
import LoadingSpinner from "../login/LoadingSpinner/LoadingSpinner";
import SearchHospitalForm from "@/components/AllHospitals/SearchHospitalsForm";
import { downloadCSV, shareCSVByEmail } from "@/library/shareFIle";
import AllHospitals from "@/components/AllHospitals/AllHospitals";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const fetchHospitals = async (country: string) => {
  const response = await fetch("/api/fetchhospitals", {
    method: "POST",
    body: JSON.stringify({
      country,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

const Home = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sharing, setSharing] = useState<boolean>(false);
  const {
    isLoggedIn,
    filteredHospitals,
    selectedHospitals,
    updateAllHospitalState,
    updateFilteredHospitals,
  } = useContext(AppContext);

  const fetchCountryHospitals = async (data: string) => {
    try {
      setIsLoading(true);
      const result = await fetchHospitals(data.toLowerCase());
      updateAllHospitalState(result.hospitals);
      updateFilteredHospitals(result.hospitals);
    } catch (error: any) {
      showToastMessage("error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterHospitals = (state: string | null, lga: string | null) => {
    // Filter by state only
    if (lga === null || lga.trim() === "") {
      return filteredHospitals.filter((hospital) => hospital.state === state);
    }

    // Filter by state and LGA
    return filteredHospitals.filter(
      (hospital) => hospital.state === state && hospital.lga === lga
    );
  };

  const filterHospitalByName = (name: string) => {
    const filteredArray = filteredHospitals.filter((item) => {
      const itemName = item.hospitalName.toLowerCase();
      const searchName = name.toLowerCase();
      return itemName.includes(searchName);
    });
    return filteredArray;
  };

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
      console.log(error);
      showToastMessage("error", error.message);
    } finally {
      setSharing(() => false);
    }
  };
  const downloadCSVHandler = () => {
    try {
      const data = downloadCSV("List of hospitals", selectedHospitals);
      showToastMessage("success", data);
    } catch (error: any) {
      showToastMessage("error", error.message);
    }
  };

  // Aunthentication check
  const router = useRouter();
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    if (!isLoggedIn.isLoggedIn) {
      console.log("Navigating to /");
      router.push("/");
    } else {
      setPageIsLoading(() => false);
    }
  }, []);

  if (pageIsLoading) return <LoadingSpinner />;

  return (
    <>
      <ToastContainer />
      <section className="home">
        <SearchHospitalForm
          onSelect={fetchCountryHospitals}
          onFilter={filterHospitals}
          onFilterByName={filterHospitalByName}
        />
        <div className="home__icon--box">
          <h2>Result...</h2>
          <div className="flex justify-between">
            <div onClick={shareCSVHandler}>
              {sharing ? <LoadingSpinner /> : <MdShare />}
            </div>
            <div onClick={downloadCSVHandler}>
              <MdFileDownload />
            </div>
          </div>
        </div>
        <div className="w-full">
          <AllHospitals
            isLoading={isLoading}
            allHospitals={filteredHospitals}
            hospitalsPerPage={15}
          />
        </div>
      </section>
    </>
  );
};
export default Home;
