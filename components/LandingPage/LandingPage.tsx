import LeftAligned from "./LeftAligned/LeftAligned";
import RightAligned from "./RightAligned/RightAligned";
import Services from "./Services/Services";
import React from "react";
import LandingHeader from "./LandingHeader/LandingHeader";

import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={classes.landingpage} id="landing__page">
      <LandingHeader />
      <LeftAligned />
      <RightAligned />
      <Services />
    </div>
  );
};
export default LandingPage;