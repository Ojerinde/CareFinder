"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectInput from "@/components/UI/SelectInput/SelectInput";
import Input from "@/app/login/LoginInput";
import classes from "./addHospital.module.css";
import Button from "@/components/UI/Button/Button";
import LoadingSpinner from "@/app/login/LoadingSpinner/LoadingSpinner";
import TextEditor from "@/components/TextEditor/TextEditor";
import {
  generateCountryForSelectField,
  generateLgasForSelectField,
  generateStatesForSelectField,
} from "@/library/generators";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { storage } from "@/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { generateUniqueIdentifier } from "@/library/generateUniqueIdentifier";
import { showToastMessage } from "@/app/login/loginForm";

export interface Hospitalparams {
  address: string;
  country: string;
  email: string;
  hospitalName: string;
  lga: string;
  markDownContent: string;
  phoneNumber: string;
  selectedImage: string | null;
  state: string;
}

const createHospital = async (data: Hospitalparams) => {
  const {
    address,
    country,
    email,
    hospitalName,
    lga,
    markDownContent,
    phoneNumber,
    selectedImage,
    state,
  } = data;

  const response = await fetch("/api/createhospital", {
    method: "POST",
    body: JSON.stringify({
      address,
      country,
      email,
      hospitalName,
      lga,
      markDownContent,
      phoneNumber,
      selectedImage,
      state,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Something went wrong!");
  }
  return responseBody;
};

const AddHospitalForm = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [markDownContent, setMarkDowContent] = useState<string>("");
  const router = useRouter();

  const updateMarkDownContent = (data: string) => {
    setMarkDowContent(() => data);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!formik.isValid) return;
    setUploading(true);
    const file = event.target.files?.[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSelectedImage(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  // Form validations using Yup and Formik
  const validationSchema = Yup.object().shape({
    hospitalName: Yup.string().required("Hospital Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    lga: Yup.string().required("LGA is required"),
    country: Yup.string().required("Country is required"),
  });
  
  // Initial form values
  const formik = useFormik({
    initialValues: {
      hospitalName: "",
      phoneNumber: "",
      email: "",
      address: "",
      state: "",
      lga: "",
      country: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    async onSubmit(values, actions) {
      try {
        const result = await createHospital({
          ...values,
          selectedImage,
          markDownContent,
        });
        console.log(result);
        if (result.status) {
          showToastMessage("success", result.message);
          setTimeout(() => {
            router.push("/home");
          }, 3000);
        }
      } catch (error: any) {
        console.log(error);
        showToastMessage("error", error.message);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  ////////// Options for the select field ///////////
  // All avalable lgas for the selected state
  const [lgasOptions, setLgasOptions] = useState<
    { value: string; label: string }[]
  >([]);
  // All avalable states for the selected country
  const [stateOptions, setStateOptions] = useState<
    { value: string; label: string }[]
  >([]);
  // All available countries options
  const countryOptions = generateCountryForSelectField();
  // All available states options

  return (
    <>
      <ToastContainer />
      <section className={classes.add__hospital}>
        <h1 className={classes.h1}>Hospital Details Form</h1>
        <form className="w-full" onSubmit={formik.handleSubmit}>
          {/* First row */}
          <div className="">
            <Input
              id="hospitalName"
              label="Hospital Name"
              name="hospitalName"
              invalid={
                formik.errors.hospitalName && formik.touched.hospitalName
                  ? true
                  : false
              }
              type="text"
              placeholder="Enter hospital name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hospitalName}
            />
            <div className={classes.invalid__feedback}>
              {formik.errors.hospitalName && formik.touched.hospitalName
                ? formik.errors.hospitalName
                : null}
            </div>
          </div>
          {/* New row */}
          <div className="">
            <Input
              id="address"
              label="Address"
              name="address"
              invalid={
                formik.errors.address && formik.touched.address ? true : false
              }
              type="text"
              placeholder="Enter hospital address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />
            <div className={classes.invalid__feedback}>
              {formik.errors.address && formik.touched.address
                ? formik.errors.address
                : null}
            </div>
          </div>{" "}
          {/* New row */}
          <div className="">
            <Input
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              invalid={
                formik.errors.phoneNumber && formik.touched.phoneNumber
                  ? true
                  : false
              }
              type="text"
              placeholder="e.g., +2348143368703"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />
            <div className={classes.invalid__feedback}>
              {formik.errors.phoneNumber && formik.touched.phoneNumber
                ? formik.errors.phoneNumber
                : null}
            </div>
          </div>
          {/* New row */}
          <div className="my-4 flex justify-between">
            {/* Left */}
            <div className="basis-[45%]">
              <Input
                id="email"
                label="Email"
                name="email"
                invalid={
                  formik.errors.email && formik.touched.email ? true : false
                }
                type="text"
                placeholder="Enter hospital email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <div className={classes.invalid__feedback}>
                {formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null}
              </div>
            </div>
            {/* Right */}
            <div className="basis-[45%]">
              <SelectInput
                id={generateUniqueIdentifier()}
                key={generateUniqueIdentifier()}
                label="Select Country"
                placeholder="Choose a Country"
                onSelect={(selectedOption: any) => {
                  let event = {
                    target: { name: "country", value: selectedOption },
                  };
                  // All available states options for the selected country
                  setStateOptions(() =>
                    generateStatesForSelectField(selectedOption)
                  );
                  formik.handleChange(event);
                }}
                value={formik.values.country}
                options={countryOptions}
              />
              <div className={classes.invalid__feedback}>
                {formik.errors.country && formik.touched.country
                  ? formik.errors.country
                  : null}
              </div>
            </div>
          </div>
          <div className="my-4 flex justify-between">
            {/* Left */}
            <div className="basis-[45%]">
              <SelectInput
                id={generateUniqueIdentifier()}
                key={generateUniqueIdentifier()}
                label="Select State"
                placeholder="Choose a State"
                onSelect={(selectedOption: string) => {
                  setLgasOptions(() =>
                    generateLgasForSelectField(selectedOption)
                  );
                  let event = {
                    target: { name: "state", value: selectedOption },
                  };
                  formik.handleChange(event);
                }}
                value={formik.values.state}
                options={stateOptions}
              />
              <div className={classes.invalid__feedback}>
                {formik.errors.state && formik.touched.state
                  ? formik.errors.state
                  : null}
              </div>
            </div>
            {/* Right */}
            <div className="basis-[45%]">
              <SelectInput
                id={generateUniqueIdentifier()}
                key={generateUniqueIdentifier()}
                label="Select LGA"
                placeholder="Choose local government"
                onSelect={(selectedOption: any) => {
                  let event = {
                    target: { name: "lga", value: selectedOption },
                  };
                  formik.handleChange(event);
                }}
                value={formik.values.lga}
                options={lgasOptions}
              />

              <div className={classes.invalid__feedback}>
                {formik.errors.lga && formik.touched.lga
                  ? formik.errors.lga
                  : null}
              </div>
            </div>
          </div>
          {/* New Row */}
          <div>
            <TextEditor onSubmit={updateMarkDownContent} />
          </div>
          {/* New row */}
          <div className="">
            <Input
              id="image"
              label="Image"
              name="image"
              type="file"
              placeholder="Upload hospital image"
              onChange={handleImageUpload}
            />
            <div className="w-full">
              {uploading && (
                <div
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: "green",
                    marginTop: "-1.5rem",
                    fontSize: "1.6rem",
                  }}
                >
                  Uploading percentage:{" "}
                  <span style={{ fontWeight: "600" }}>{progressPercent}%</span>
                </div>
              )}
            </div>
          </div>
          {/* Button */}
          <div className={classes.btn__box}>
            <Button
              id="btn__submit"
              type="submit"
              disabled={!formik.isValid && !uploading}
              className={classes.button}
            >
              {formik.isSubmitting ? <LoadingSpinner /> : "Submit"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddHospitalForm;
