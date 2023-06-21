import React from "react";
import { Testimony } from "./Testimonials";
import Image from "next/image";
import classes from "./Testimonial.module.css";

const Testimonial: React.FC<Testimony> = ({ description, img, name }) => {
  return (
    <li className={classes.li}>
      <p className={classes.p}>{description}</p>
      <div className={classes.div}>
        <figure className={classes.figure}>
          <Image src={img} alt={name} width={250} height={250} />
        </figure>
        <p className={classes.name}>{name}</p>
      </div>
    </li>
  );
};
export default Testimonial;
