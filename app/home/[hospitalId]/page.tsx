"use client";
import React, { useContext, useState } from "react";
import { AppContext } from "@/store/AppContext";
import Image from "next/image";
import { FaShareAlt, FaDownload } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingSpinner from "@/app/login/LoadingSpinner/LoadingSpinner";
import { showToastMessage } from "@/app/login/loginForm";
import { downloadCSV, shareCSVByEmail } from "@/library/shareFIle";
import { usePathname, useRouter } from "next/navigation";
import classes from "./hospitalDetail.module.css";
import { ToastContainer } from "react-toastify";
import { useSession } from "next-auth/react";
import Button from "@/components/UI/Button/Button";

const HospitalComponent = ({ params }: { params: { hospitalId: string } }) => {
  // Getting the logged in user.
  const { data: session } = useSession();
  const [sharing, setSharing] = useState<boolean>(false);

  // Getting the dynamic id
  const hospitalId = params.hospitalId;
  const { allHospitals } = useContext(AppContext);

  const hospital: any = allHospitals.find(
    (hos) => hos.hospitalName.replace(/\s/g, "") === hospitalId
  );
  const router = useRouter();

  if (!hospital) {
    router.push("/home");
  }

  const {
    hospitalName,
    selectedImage,
    address,
    phoneNumber,
    markDownContent,
    email,
    state,
    lga,
    country,
  } = hospital;

  const csvCon = [
    {
      name: hospitalName,
      email: email,
      phone: phoneNumber,
      address: address,
      country: country,
      state: state,
      lga: lga,
    },
  ];

  // The function that handles sharing the csv to the email
  const shareCSVHandler = async () => {
    setSharing(() => true);
    try {
      const data = await shareCSVByEmail(
        session?.user?.email,
        "An hospital",
        "Find attached the hospital you selected",
        csvCon
      );
      if (data.error) {
        throw new Error(data.error);
      } else {
        showToastMessage("success", data.message);
      }
    } catch (error: any) {
      console.log(error);
      showToastMessage("error", error.message);
    } finally {
      setSharing(() => false);
    }
  };

  // The function that handles dowloading the csv.
  const downloadCSVHandler = () => {
    try {
      const data = downloadCSV("An hospitals", csvCon);
      showToastMessage("success", data);
    } catch (error: any) {
      showToastMessage("error", error.message);
    }
  };

  //  Navigate back logic
  const pathname = usePathname();
  const lastIndexOfSlash = pathname?.lastIndexOf("/");
  const goBackHandler = () => {
    router.push(`${pathname?.slice(0, lastIndexOfSlash)}`);
  };

  return (
    <section className="hospital__section">
      <ToastContainer />
      <Button
        type="button"
        onClick={goBackHandler}
        className="mb-4 px-6 py-2 border border-primary_color text-[1.4rem] text-primary_light_color cursor-pointer hover:translate-y-1 hover:bg-primary_light_color hover:text-secondary_color duration-[.3s] ease-out"
      >
        Go Back
      </Button>
      <figure>
        <Image
          src={selectedImage}
          alt={hospitalName}
          width={1000}
          height={1000}
        />
      </figure>
      <h2 className="hospital__name">{hospitalName.toUpperCase()}</h2>
      <div className="hospital__address">
        <label>Address:</label>
        <span>{address}</span>
      </div>
      <div className="hospital__row">
        <p className="w-[45%] max-lg:w-full max-lg:mb-8">
          <label>Email:</label>
          <span>{email}</span>
        </p>
        <p className="w-[45%] max-lg:w-full ">
          <label>Phone Number:</label>
          <span>{phoneNumber}</span>
        </p>
      </div>
      <div className="hospital__row">
        <p className="w-[45%] max-lg:w-full max-lg:mb-8">
          <label>LGA:</label>
          <span>{lga}</span>
        </p>
        <p className="w-[45%] max-lg:w-full">
          <label>State:</label>
          <span>{state}</span>
        </p>
      </div>
      <div className="hospital__address">
        <label>Country:</label>
        <span>{country}</span>
      </div>
      <article className="hospital__article">
        <label>Description</label>
        <span>
          <ReactMarkdown
            className={classes.markdown}
            remarkPlugins={[remarkGfm]}
          >
            {markDownContent}
          </ReactMarkdown>
        </span>
      </article>
      <div></div>
      <div className="hospital__icons">
        <div onClick={shareCSVHandler}>
          {sharing ? <LoadingSpinner /> : <FaShareAlt />}
        </div>
        <div onClick={downloadCSVHandler}>
          <FaDownload />
        </div>
      </div>
    </section>
  );
};

export default HospitalComponent;
