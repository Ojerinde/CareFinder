/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { MdFileDownload, MdShare } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { AppContext } from "@/store/AppContext";
import { showToastMessage } from "../login/loginForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchHospitalForm from "@/components/AllHospitals/SearchHospitalsForm";
import AllHospitals from "@/components/AllHospitals/AllHospitals";
import { requestTimeout } from "@/library/requestTimeout";
import { downloadCSV, shareCSVByEmail } from "@/library/shareFIle";
import {
  filterHospitalByName,
  filterHospitalsByStateAndLga,
} from "@/library/filters";
import { fetchHospitals } from "@/library/hospitals";
import Modal from "@/components/UI/Modal/Modal";
import Button from "@/components/UI/Button/Button";
import Input from "../login/LoginInput";
import LoadingSpinner from "../login/LoadingSpinner/LoadingSpinner";

// Home conponent
const Home = () => {
  // Getting access to the session
  const { data: session } = useSession();

  // State managements
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Share and download hover effect
  const [share, setShare] = useState(false);
  const [download, setDownload] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Getting access to the context created.
  const {
    filteredHospitals,
    allHospitals,
    selectedHospitals,
    updateAllHospitalState,
    updateSelectedHospitalState,
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
  const shareCSVHandler = async (email: string) => {
    try {
      const data = await shareCSVByEmail(
        email,
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

  /////////// Share modal functionalities ///////
  // Yup schema configurations
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  // Formik validation configurations
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    async onSubmit(values, actions) {
      const { email } = values;
      await shareCSVHandler(email);

      // Enabling the submitting of the form again
      actions.setSubmitting(false);
      setShowModal(false);
      values.email = "";
    },
  });
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
              <div className="relative">
                {share && <p className="home__icon__title ">Share</p>}
                <MdShare
                  onMouseEnter={() => setShare(true)}
                  onMouseLeave={() => setShare(false)}
                  onClick={() => {
                    if (selectedHospitals.length > 0) setShowModal(true);
                    else {
                      showToastMessage(
                        "error",
                        "You have not selected any hospital"
                      );
                    }
                  }}
                />
                {showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <div className="w-full flex flex-col">
                      <Input
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Enter receivers email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div className="-mt-8 text-invalid_color text-[1.4rem] tracking-wider">
                        {formik.errors.email && formik.touched.email
                          ? formik.errors.email
                          : null}
                      </div>
                      <div className="w-full flex justify-end text-[1.5rem] font normal">
                        <Button
                          type="button"
                          onClick={() => setShowModal(false)}
                          className="px-8 py-4 rounded border border-transparent text-primary_color bg-secondary_color duration-300 hover:bg-secondary_color hover:text-primary_color hover:border-primary_color"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={formik.handleSubmit}
                          className="ml-2 px-8 py-4 rounded border-2 border-secondary_light_color text-secondary_light_color bg-primary_color duration-300 hover:bg-primary_color/40 "
                        >
                          {formik.isSubmitting ? <LoadingSpinner /> : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </Modal>
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
