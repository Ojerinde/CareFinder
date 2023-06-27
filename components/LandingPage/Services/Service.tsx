import React from "react";
import classes from "./Service.module.css";
import { showToastMessage } from "@/app/login/loginForm";
import { useRouter } from "next/navigation";

interface Props {
  icon: JSX.Element;
  name: string;
  description: string;
}
const Service: React.FC<Props> = ({ icon, name, description }) => {
  const router = useRouter();
  const navigateHandler = () => {
    switch (name) {
      case "Search Doctors":
        showToastMessage("success", "Features coming soon!!");
        break;
      case "Search Hospitals":
        router.push("/hospitals");
        break;
      case "Export Hospitals":
        showToastMessage("success", "Kindly login to continue");
        break;
      case "Share Hospitals":
        showToastMessage("success", "Kindly login to continue");
        break;
      default:
        console.log("Unknown type");
    }
  };
  return (
    <div className={classes.li} id="service__item" onClick={navigateHandler}>
      <div className={classes.div}>{icon}</div>
      <h3 className={classes.h3}>{name}</h3>
      <p className={classes.p}>{description}</p>
    </div>
  );
};

export default Service;
