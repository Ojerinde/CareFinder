import React from "react";
import { useRouter } from "next/navigation";
import classes from "./NotFound.module.css";
import "./NotFound.css";

const NotFound = () => {
  const router = useRouter();
  return (
    <section className={classes.section}>
      <div className={classes.div}>
        <h1 className={classes.h1}>Page could not be found!</h1>
        <button onClick={() => router.push("/")} className={classes.button}>
          Go back home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
