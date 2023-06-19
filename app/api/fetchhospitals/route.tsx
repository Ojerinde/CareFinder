import { connectToDatabase } from "@/library/db";
import { Hospitalparams } from "@/app/home/addHospital/page";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Getting the request body
  const { country } = (await req.json()) as Hospitalparams;
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    return NextResponse.json({
      message: "Could not fetch hospitals. Try again!",
      status: false,
    });
  }

  //   Connect to database
  const db = client.db(`hospitals`);

  // Add document
  const collection = await db.collection(`${country}`);
  const hospitals = await collection.find({}).toArray();
  return NextResponse.json({
    hospitals: hospitals,
    status: true,
  });
}
