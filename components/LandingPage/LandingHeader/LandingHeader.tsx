"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../../UI/Button/Button";
import { motion } from "framer-motion";
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
        <motion.figure className={classes.right} whileHover={{ scale: 1.1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.04 }}
          >
            <Image
              src="/images/landingHeaderImg.png"
              alt="Header Image"
              width={800}
              height={1000}
            />
          </motion.div>
        </motion.figure>
      </section>
    </>
  );
};
export default LandingHeader;
