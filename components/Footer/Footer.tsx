import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React from "react";
const Footer: React.FC = () => {
  // Translating animation
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <motion.footer
      className="bg-secondary_light_color py-16 px-32 flex justify-between max-lg:px-8"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8 }}
    >
      <div className="basis-[35%]">
        <h1 className="text-5xl text-primary_color font-bold mb-6">
          CareFinder
        </h1>
        <div className="text-2xl text-tertiary_light_color font-normal">
          <p>No 7, Adewumi street</p>
          <p className="my-4">Gbagada, Lagos.</p>
          <p>+2348143468703</p>
        </div>
      </div>
      <div className="text-2xl text-tertiary_light_color font-normal flex flex-col">
        <h1 className="text-4xl text-primary_color font-bold mb-6">About us</h1>
        <Link
          href="/news"
          className="my-2 duration-[.3s] hover:text-primary_color"
        >
          News
        </Link>
        <Link
          href="/contact"
          className="my-2 duration-[.3s] hover:text-primary_color"
        >
          Contact
        </Link>
      </div>
      <div className="text-2xl text-tertiary_light_color font-normal flex flex-col">
        <h1 className="text-4xl text-primary_color font-bold mb-6">
          Quick links
        </h1>
        <Link
          href="/account"
          className="my-2 duration-[.3s] hover:text-primary_color"
        >
          My account
        </Link>
        <Link
          href="/library"
          className="my-2 duration-[.3s] hover:text-primary_color"
        >
          Library
        </Link>
        <Link
          href="/appointment"
          className="my-2 duration-[.3s] hover:text-primary_color"
        >
          Book an appointment
        </Link>
      </div>
    </motion.footer>
  );
};
export default Footer;
