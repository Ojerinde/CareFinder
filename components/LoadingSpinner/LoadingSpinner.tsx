import React from "react";
import { ImSpinner10 } from "react-icons/im";

import classes from "./LoadingSpinner.module.css";

interface Props {
  data: string;
}
const LoadingSpinner: React.FC<Props> = ({ data }) => {
  return (
    <div className={classes.spinner__box}>
      <ImSpinner10 />
      <p>Fetching all {data}</p>
    </div>
  );
};
export default LoadingSpinner;
