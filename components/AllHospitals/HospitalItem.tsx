"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import classes from "./HospitalItem.module.css";
import React, { useContext } from "react";
import { AppContext } from "@/store/AppContext";

interface HospitalItemProps {
  imgUrl: string | "";
  hospitalName: string;
  address: string;
}

const HospitalItem: React.FC<HospitalItemProps> = ({
  hospitalName,
  imgUrl,
  address,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // CLearing the space in the hospital name
  const clearedHospitalName = hospitalName.replace(/\s/g, "");

  // This function programmatically navigates to a page to see all details about an hospital
  const fullPostHandler = () => {
    router.push(`${pathname}/${clearedHospitalName}`);
  };

  const { allHospitals, updateSelectedHospitalState } = useContext(AppContext);

  const addHospital = () => {
    const selectedHospitals = allHospitals.find(
      (hos) => hos.hospitalName === hospitalName
    );
    
    if (selectedHospitals) {
      updateSelectedHospitalState({
        name: hospitalName,
        address,
        phone: selectedHospitals.phoneNumber,
        email: selectedHospitals.email,
        country: selectedHospitals.country,
        state: selectedHospitals.state,
        lga: selectedHospitals.lga,
      });
    }
  };

  return (
    <li className={classes.li}>
      <div className={classes.img}>
        <Image src={imgUrl} alt="hospital" width={1000} height={1000} />
      </div>
      <div className={classes.text}>
        <h2 className={classes.h2} onClick={fullPostHandler}>
          {hospitalName}
        </h2>
        <p className={classes.p}>{address}</p>
      </div>
      <div className={classes.icon__box}>
        <input type="checkbox" onClick={addHospital} />
        <div onClick={fullPostHandler} className={classes.icon}>
          <BsFillArrowUpCircleFill />
        </div>
      </div>
    </li>
  );
};

export default HospitalItem;
