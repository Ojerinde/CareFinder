import React, { useState } from "react";
import HospitalItem from "./HospitalItem";
import Pagination from "../Pagination/Pagination";
import { Hospitalparams } from "@/app/home/addHospital/page";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface AllHospitalsProps {
  isLoading: boolean;
  allHospitals: Array<any>;
  hospitalsPerPage: number;
}

const AllHospitals: React.FC<AllHospitalsProps> = ({
  isLoading,
  allHospitals,
  hospitalsPerPage,
}) => {
  const [start, setStart] = useState(0);
  const end = start + hospitalsPerPage;

  // This function receives the updated page number from the pagination component and sets it to start which is used to slice the list of posts
  const changePageHandler = (newPage: number) => {
    setStart(() => newPage * hospitalsPerPage - hospitalsPerPage);
  };

  if (isLoading) return <LoadingSpinner data="hospitals" />;

  return (
    <div className="w-full mx-auto">
      {allHospitals?.length > 0 ? (
        <ul className="hospital__list">
          {allHospitals
            .slice(start, end)
            .map((hospital: Hospitalparams, index) => (
              <HospitalItem
                key={index}
                address={hospital.address}
                hospitalName={hospital.hospitalName}
                imgUrl={hospital.selectedImage || ""}
              />
            ))}
        </ul>
      ) : (
        <p className="hospital__not--found">
          No hospitals to display! Check other countries or state or lgas
        </p>
      )}
      <div className="w-[100%] mx-auto">
        {allHospitals?.length > 0 && (
          <Pagination
            itemsPerPage={hospitalsPerPage}
            totalItems={allHospitals.length}
            onChange={changePageHandler}
          />
        )}
      </div>
    </div>
  );
};

export default AllHospitals;
