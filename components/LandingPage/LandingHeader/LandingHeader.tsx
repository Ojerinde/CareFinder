"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../UI/Button/Button";
import classes from "./LandingHeader.module.css";
import LandingNavigation from "./LandingNavigation";

const LandingHeader = () => {
  const router = useRouter();

  const navigateHandler = (to: string) => {
    router.push(to);
  };

  return (
    <>
      <LandingNavigation />
      <section className={classes.section} id="landing_header">
        <div className={classes.left}>
          <h1 className={classes.h1}>
            Find{" "}
            <span className={classes.span}>
              the nearest hospital to you and make an appointment.
            </span>
          </h1>
          <p className={classes.p}>
            Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!
          </p>

          <Button
            className={classes.button}
            type="button"
            onClick={navigateHandler.bind(null, "/login")}
          >
            Get Started
          </Button>
        </div>
        <figure className={classes.right}>
          <Image
            src="/images/landingHeaderImg.png"
            alt="Header Image"
            width={700}
            height={700}
          />
        </figure>
      </section>
    </>
  );
};
export default LandingHeader;
