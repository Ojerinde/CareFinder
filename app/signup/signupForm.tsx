import React, { useState } from "react";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import * as Yup from "yup";
import Input from "../login/LoginInput";
import Button from "@/components/UI/Button/Button";
import LoadingSpinner from "../login/LoadingSpinner/LoadingSpinner";
import SelectInput from "@/components/UI/SelectInput/SelectInput";
import classes from "./signupForm.module.css";
import { useRouter } from "next/navigation";
import { showToastMessage } from "../login/loginForm";
import { generateUniqueIdentifier } from "@/library/generateUniqueIdentifier";

export interface UserData {
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  email: string;
}

// This function will be triggered when the submit function is clicked.
async function createUser(userData: UserData) {
  // Destructuring UserData
  const { firstName, lastName, gender, password, email } = userData;

  // Seding a request to my backend
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, firstName, lastName, gender, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
}

const SignUpForm = () => {
  const router = useRouter();

  // State managements
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordIcon] = useState<boolean>(true);
  const [gender, setGender] = useState<string>("Male");

  // All allowed genders
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  // A function to update gender
  const updateGender = (data: string) => {
    setGender(() => data);
  };

  // Yup schema configurations
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), ""], "Confirm Password does not match"),
  });

  // Formik validation configurations
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    async onSubmit(values, actions) {
      const { firstName, lastName, password, email } = values;
      try {
        // Calling the createUser function
        const result = await createUser({
          firstName,
          lastName,
          gender,
          password,
          email,
        });
        // Handling the error
        if (result.status) {
          showToastMessage("success", result.message);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error: any) {
        showToastMessage("error", error.message);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form className={classes.signup__form} onSubmit={formik.handleSubmit}>
        <Input
          id="firstName"
          label="First Name"
          name="firstName"
          invalid={
            formik.errors.firstName && formik.touched.firstName ? true : false
          }
          type="text"
          placeholder="Enter your first name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        <div className={classes.invalid__feedback}>
          {formik.errors.firstName && formik.touched.firstName
            ? formik.errors.firstName
            : null}
        </div>
        <Input
          id="lastName"
          label="Last Name"
          name="lastName"
          invalid={
            formik.errors.lastName && formik.touched.lastName ? true : false
          }
          type="text"
          placeholder="Enter your last name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        <div className={classes.invalid__feedback}>
          {formik.errors.lastName && formik.touched.lastName
            ? formik.errors.lastName
            : null}
        </div>
        <Input
          id="email"
          label="Email"
          type="email"
          name="email"
          invalid={formik.errors.email && formik.touched.email ? true : false}
          placeholder="example@email.com"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <div className={classes.invalid__feedback}>
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : null}
        </div>
        <SelectInput
          key={generateUniqueIdentifier()}
          id={generateUniqueIdentifier()}
          label="Gender"
          placeholder="Choose your gender"
          options={genders}
          onSelect={updateGender}
          value={gender}
        />
        <Input
          id="password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          invalid={
            formik.errors.password && formik.touched.password ? true : false
          }
          placeholder="e.g, Password@1234"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          passwordIcon={passwordIcon}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <div className={classes.invalid__feedback}>
          {formik.errors.password && formik.touched.password
            ? formik.errors.password
            : null}
        </div>
        <Input
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          invalid={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? true
              : false
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          placeholder="e.g, Password@1234"
          passwordIcon={passwordIcon}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
        <div className={classes.invalid__feedback}>
          {formik.errors.confirmPassword && formik.touched.confirmPassword
            ? formik.errors.confirmPassword
            : null}
        </div>
        <section className={classes.btn__box}>
          <Button
            id="btn__submit"
            type="submit"
            disabled={!formik.isValid}
            className={classes.button}
          >
            {formik.isSubmitting ? <LoadingSpinner /> : "Sign Up"}
          </Button>
        </section>
      </form>
    </>
  );
};
export default SignUpForm;
