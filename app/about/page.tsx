import React from "react";
import LandingNavigation from "@/components/LandingPage/LandingHeader/LandingNavigation";
const About = () => {
  return (
    <>
      <LandingNavigation />
      <div className="bg-secondary_light_color w-full pt-[6rem] h-[calc(100vh-74.3px)]">
        <section className="mb-8 w-[60%] mx-auto max-lg:w-[80%]">
          <div className="my-4">
            <h2 className="text-5xl font-bold mb-4 text-primary_dark_color">
              About Our Company
            </h2>
            <p className="text-tertiary_light_color tracking-widest text-2xl">
              CareFinder is a user-friendly web application designed to make
              hospital searches effortless and efficient. With CareFinder, users
              can quickly locate and explore hospitals in their vicinity,
              ensuring convenient access to quality healthcare services.
            </p>

            <p className="text-tertiary_light_color tracking-widest text-2xl mt-4">
              By simply entering their location or enabling GPS, users can
              browse through a comprehensive database of hospitals, filtering
              results based on specialties, ratings, and distance. The app
              provides detailed information about each hospital, including
              address, contact details, available services, and patient reviews.
            </p>
          </div>

          <div className="my-8">
            <h2 className="text-5xl font-bold mb-4 text-primary_dark_color">
              Our Vision
            </h2>
            <p className="text-tertiary_light_color tracking-widest text-2xl">
              CareFinder aims to empower users with the ability to make informed
              decisions about their healthcare needs, enhancing their overall
              healthcare experience.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};
export default About;
