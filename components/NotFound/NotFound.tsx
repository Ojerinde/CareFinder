"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import classes from "./NotFound.module.css";
import "./NotFound.css";

const NotFound = () => {
  const router = useRouter();
  const goHomeHandler = () => {
    router.push("/");
  };
  return (
    <section className={classes.section}>
      <div className={classes.div}>
        <h1 className={classes.h1}>Page could not be found!</h1>
        <button onClick={goHomeHandler} className={classes.button}>
          Go home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
