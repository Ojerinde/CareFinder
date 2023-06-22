import React from "react";
import classes from "./Service.module.css";

interface Props {
  icon: JSX.Element;
  name: string;
  description: string;
}
const Service: React.FC<Props> = ({ icon, name, description }) => {
  return (
    <div className={classes.li} id="service__item">
      <div className={classes.div}>{icon}</div>
      <h3 className={classes.h3}>{name}</h3>
      <p className={classes.p}>{description}</p>
    </div>
  );
};

export default Service;
