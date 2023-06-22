import { UserData } from "@/app/signup/signupForm";
import { connectToDatabase } from "@/library/db";
import { hashPassword } from "@/library/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Getting the request body
  const { email, password, gender, firstName, lastName } =
    (await req.json()) as UserData;

  // Some backend validations...
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return NextResponse.json({
      message:
        "Invalid input - password should also be at least 7 characters long",
      status: false,
    });
  }

  //   Hasing password
  const hashedPassword = await hashPassword(password);

  const client = await connectToDatabase();

  const db = client.db("auth");

  //   If the user exist.
  const existingUser = await db
    .collection("users")
    .findOne({ email: email.toLowerCase() });

  if (existingUser) {
    client.close();
    return NextResponse.json({
      message: "User already exists!",
      status: false,
    });
  }

  // Add document to the collection
  await db.collection("users").insertOne({
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
    gender: gender,
  });

  return NextResponse.json({
    message: "Account created Succesfully!",
    status: true,
  });
}
