import LeftAligned from "./LeftAligned/LeftAligned";
import RightAligned from "./RightAligned/RightAligned";
import Services from "./Services/Services";
import React from "react";
import LandingHeader from "./LandingHeader/LandingHeader";
import Footer from "../Footer/Footer";
import Testimonials from "./Testimonials/Testimonials";
import classes from "./LandingPage.module.css";
import { ToastContainer } from "react-toastify";

const LandingPage = () => {
  return (
    <div className={classes.landingpage} id="landing__page">
      <ToastContainer />
      <LandingHeader />
      <LeftAligned />
      <RightAligned />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
};
export default LandingPage;
