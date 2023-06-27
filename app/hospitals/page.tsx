"use client";
import LandingNavigation from "@/components/LandingPage/LandingHeader/LandingNavigation";
import InputField from "@/components/UI/InputField/InputField";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { Hospitalparams } from "../home/addHospital/page";
import classes from "./page.module.css";
import Button from "@/components/UI/Button/Button";
import { showToastMessage } from "../login/loginForm";
import { ToastContainer } from "react-toastify";

// A function to fetch all hospitals from the backend.
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

// Search all key in each item
const filterArray = (searchTerm: string, hospitals: Hospitalparams[]) => {
  return hospitals?.filter((item: any) => {
    for (let key in item) {
      if (
        `${item[key]}`
          .toLowerCase()
          .toString()
          .includes(searchTerm.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });
};

const Hospitals: React.FC = () => {
  const [searchedTerm, setSearchedTerm] = useState<string>("");
  const [hospitals, setHospitals] = useState<Hospitalparams[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospitalparams[]>(
    []
  );

  // Functions to update the content of the input field.
  const setHospitalName = (name: any) => {
    setSearchedTerm(name.target.value);
  };

  // Form submit handler
  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    if (searchedTerm === "") {
      showToastMessage("success", "Enter hospital detail");
      return;
    }
    setFilteredHospitals((prev) => filterArray(searchedTerm, hospitals));
  };

  useEffect(() => {
    (async () => {
      const result = await fetchHospitals("nigeria");
      setHospitals((prev) => result.hospitals);
    })();
  }, []);

  return (
    <section>
      <ToastContainer />
      <LandingNavigation />
      <div className="bg-secondary_light_color py-8 px-12">
        <form
          onSubmit={searchHandler}
          className="py-4 w-[60%] mx-auto max-md:w-[80%]"
        >
          <InputField
            id="hospitalName"
            name="hospitalName"
            type="text"
            placeholder="Search by name, country, state, lga"
            onChange={setHospitalName}
            value={searchedTerm}
          />
          <Button type="submit" className={`${classes.button}`}>
            Search
          </Button>
        </form>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredHospitals.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center h-[15rem]"
              >
                <figure className={classes.figure}>
                  <Image
                    src={item.selectedImage}
                    alt={item.hospitalName}
                    width={1000}
                    height={1000}
                    className={classes.image}
                  />
                </figure>
                <h3 className="text-[1.4rem] font-medium">
                  {item.hospitalName}
                </h3>
                <p className="text-gray-500 text-[1.1rem]">{item.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hospitals;
