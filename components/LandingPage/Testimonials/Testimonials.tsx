import React from "react";
import classes from "./Testimonials.module.css";
import Testimonial from "./Testimonial";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import sarah from "@/public/images/sarah.png";
import john from "@/public/images/john.png";
import emily from "@/public/images/emily.png";
import { StaticImageData } from "next/image";

export interface Testimony {
  img: StaticImageData;
  description: string;
  name: string;
}
const testimonials: Testimony[] = [
  {
    description:
      "Finding the right hospital has never been easier! With this website, I was able to locate a nearby hospital quickly and efficiently. Highly recommended",
    img: sarah,
    name: "Sarah M.",
  },
  {
    description:
      "I can’t express how grateful I am for carefinder website. When I needed urgent medical care while travelling.",
    img: john,
    name: "John D.",
  },
  {
    description:
      "I recently moved to a new city and had no idea where to go for medical need, my friend shared me some hospital details using the carefinder website.",
    img: emily,
    name: "Emily T.",
  },
];

const Testimonials = () => {
  // Translating animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.section
      className={classes.testimonials}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className={classes.h1}>What Our Users Say</h1>
      <ul className={classes.ul}>
        {testimonials.map((tes, index) => (
          <Testimonial
            key={index}
            img={tes.img}
            description={tes.description}
            name={tes.name}
          />
        ))}
      </ul>
    </motion.section>
  );
};
export default Testimonials;
