import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // port: 587,
  secure: true,
  auth: {
    user: `${process.env.google_email}`,
    pass: `${process.env.google_password}`,
  },
});

export async function POST(req: Request) {
  const { to, subject, body, csvContent } = await req.json();
  try {
    const message = {
      from: `${process.env.google_email}`,
      to,
      subject,
      text: body,
      attachments: [
        {
          filename: "hospitals.csv",
          content: csvContent,
        },
      ],
    };

    await transporter.sendMail(message);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
