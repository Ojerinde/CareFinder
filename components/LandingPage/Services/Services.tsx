import React from "react";
import { FaUserNurse, FaRegHospital, FaFileExport } from "react-icons/fa";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Service from "./Service";
import { SlShareAlt } from "react-icons/sl";
import { ToastContainer } from "react-toastify";

import classes from "./Services.module.css";
const services = [
  {
    name: "Search Doctors",
    description: "Effortlessly Find the Best Doctors Near You",
    icon: <FaUserNurse />,
  },
  {
    description: "Effortlessly Find the Best Hospitals Near You",
    name: "Search Hospitals",
    icon: <FaRegHospital />,
  },
  {
    description: "Save list of hospitals.",
    name: "Export Hospitals",
    icon: <FaFileExport />,
  },
  {
    description: "Share the list of hospitals with others. ",
    name: "Share Hospitals",
    icon: <SlShareAlt />,
  },
];
const Services = () => {
  // Translating animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <>
      <ToastContainer />
      <motion.section
        className={classes.services}
        id="services"
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8 }}
      >
        <div className={classes.div}>
          <h1 className={classes.h1}>See Our Services</h1>
        </div>
        <ul className={classes.ul}>
          {services.map((service, index) => (
            <Service
              key={index}
              description={service.description}
              name={service.name}
              icon={service.icon}
            />
          ))}
        </ul>
      </motion.section>
    </>
  );
};
export default Services;
