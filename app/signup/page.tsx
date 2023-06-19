"use client";
import React from "react";
import Link from "next/link";
import SignUpForm from "./signupForm";
import classes from "./signup.module.css";

const SignUp = () => {
  return (
    <>
      <section className={classes.signup} id="signup">
        <h1 className={classes.h1}>Start improving your health today!</h1>
        <SignUpForm />
        <p className={classes.p}>
          Already have an account?
          <Link href="/login" className={classes.a}>
            Login
          </Link>
        </p>
      </section>
    </>
  );
};
export default SignUp;
