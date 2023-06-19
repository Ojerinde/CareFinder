import React from 'react'
import { ImSpinner10 } from "react-icons/im";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.spinner__box}>
      <ImSpinner10 className={classes.spinner} />
    </div>
  );
};
export default LoadingSpinner;
