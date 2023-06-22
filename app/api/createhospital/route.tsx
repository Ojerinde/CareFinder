import { Hospitalparams } from "@/app/home/addHospital/page";
import { connectToDatabase } from "@/library/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Getting the request body
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
  } = (await req.json()) as Hospitalparams;

  // Some backend validations...
  if (
    !email ||
    !address ||
    !country ||
    !hospitalName ||
    !lga ||
    !phoneNumber ||
    !markDownContent ||
    !selectedImage ||
    !state
  ) {
    return NextResponse.json({
      message: "Invalid Input",
      status: false,
    });
  }

  const client = await connectToDatabase();

  const db = client.db(`hospitals`);

  // Add document
  await db.collection(`${country}`.toLowerCase()).insertOne({
    address,
    country,
    email,
    hospitalName,
    lga,
    markDownContent,
    phoneNumber,
    selectedImage,
    state,
  });

  return NextResponse.json({
    message: "Hospital created Succesfully!",
    status: true,
  });
}
