import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import classes from "./LeftAligned.module.css";
import Button from "../../UI/Button/Button";

const LeftAligned = () => {
  const scrollHandler = () => {
    const section = document.querySelector("#services") as HTMLElement;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // Translating animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.section
      id="left__aligned"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className={classes.h1}>
        Make a lasting impact on the future of your health
      </h1>
      <li className={classes.leftaligned}>
        <div className={classes.left}>
          <h2 className={classes.h2}>Welcome to CareFinder</h2>
          <p className={classes.p}>
            Here, we shape the healthcare for millions worldwide.
          </p>
          <p className={classes.p}>
            Carefinder is a platform where users can search for hosiptals in
            their areas, export hospital details for your records and enhance
            your healthcare experience by connecting with others and sharing
            valuable resources.
          </p>
          <Button
            type="button"
            className={classes.button}
            onClick={scrollHandler}
          >
            Our services
          </Button>
        </div>
        <figure className={classes.right}>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image
              src="/images/2.png"
              width={150}
              height={400}
              alt="carefinder"
              style={{ marginBottom: "3rem" }}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Image
              src="/images/1.png"
              width={150}
              height={400}
              alt="carefinder"
              style={{ marginTop: "3rem" }}
            />
          </motion.div>
        </figure>
      </li>
    </motion.section>
  );
};
export default LeftAligned;
