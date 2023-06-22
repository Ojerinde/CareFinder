"use client";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Input from "./LoginInput";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import Button from "@/components/UI/Button/Button";
import { useRouter } from "next/navigation";
import { AppContext } from "@/store/AppContext";
import classes from "./LoginForm.module.css";

// Tostify handler
export const showToastMessage = (mode: string, message: string) => {
  if (mode === "success") {
    toast(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: `${classes.toast__success}`,
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: `${classes.toast__error}`,
    });
  }
};

const Form = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordIcon] = useState<boolean>(true);

  const router = useRouter();
  const { updateLoggedInState } = useContext(AppContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    validateOnMount: false,
    async onSubmit(values, actions) {
      const { password, email } = values;
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (!result?.error) {
          updateLoggedInState({ email: email, isLoggedIn: true });
          showToastMessage("success", "Login successfully. Redirecting...");
          router.push("/home");
        } else {
          throw new Error(result.error);
        }
      } catch (error: any) {
        showToastMessage("error", error.message);
      } finally {
        // Enable submitting of form again
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <form className={classes.login__form} onSubmit={formik.handleSubmit}>
        <Input
          id="email"
          name="email"
          label="Email"
          type="text"
          invalid={formik.errors.email && formik.touched.email ? true : false}
          placeholder="example@name.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className={classes.invalid__feedback}>
          {formik.errors.email && formik.touched.email
            ? formik.errors.email
            : null}
        </div>
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

        <div className={classes.btn__box}>
          <Button
            id="btn__submit"
            type="submit"
            disabled={!formik.isValid}
            className={classes.button}
          >
            {formik.isSubmitting ? <LoadingSpinner /> : "Login"}
          </Button>
        </div>
      </form>
    </>
  );
};
export default Form;
