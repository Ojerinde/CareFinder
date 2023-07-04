import { Hospitalparams } from "@/app/home/addHospital/page";

// A function to send fetch all hospitals request to nextjs backend.
export const fetchHospitals = async (country: string) => {
  const response = await fetch("/api/fetchhospitals", {
    method: "POST",
    body: JSON.stringify({
      country,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

// This function send a create hospital request to nextjs backend
export const createHospital = async (data: Hospitalparams) => {
  const {
    address,
    country,
    email,
    hospitalName,
    lga,
    markDownContent,
    phoneNumber,
    selectedImage,
    state,
  } = data;

  const response = await fetch("/api/createhospital", {
    method: "POST",
    body: JSON.stringify({
      address,
      country,
      email,
      hospitalName,
      lga,
      markDownContent,
      phoneNumber,
      selectedImage,
      state,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message || "Something went wrong!");
  }
  return responseBody;
};
