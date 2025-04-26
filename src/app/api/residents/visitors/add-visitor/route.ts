import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConfig from "@/middlewares/db.config";
import Visitor from "@/models/Visitor";
import Log from "@/models/Logs";
import ejs from "ejs";
import fs from "fs";
import Resident from "@/models/Resident";

dbConfig();
export async function POST(req: NextRequest) {
  const { formData, imgSrc } = await req.json();
  if (!formData || !imgSrc) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
  try {
    // Upload image to server
    const base64Image = imgSrc.split(";base64,").pop();
    const buffer = Buffer.from(base64Image, "base64");
    const imageName = `${formData.name.replace(/\s+/g, "_")}_visitor.jpg`;
    const imagePath = `public/visitor_images/${imageName}`;
    if (!fs.existsSync("public/visitor_images")) {
      fs.mkdirSync("public/visitor_images", { recursive: true });
    }
    fs.writeFileSync(imagePath, buffer);
    const visitorData = new Visitor({
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      purposeOfVisit: formData.purposeOfVisit,
      profileImage: `/visitor_images/${imageName}`,
      visitorId: formData.visitorId,
      visitorIdNumber: formData.visitorIdNumber,
      flatYourAreVisiting: formData.flatYourAreVisiting,
      approved: false,
    });
    await visitorData.save();
    const logData = new Log({
      visitor: visitorData._id,
      isRegistered: false,
      entryTime: new Date(),
    });
    await logData.save();
    // Send Mail to The Admin
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });
    const template = fs.readFileSync("./src/helper/mailTemplate.ejs", "utf-8");
    const mailOptions = {
      from: "NovaCops | No Reply <",
      to: process.env.ADMIN_ORIGINAL_EMAIL,
      subject: "New Visitor Registered",
      html: ejs.render(template, { visitorData, imgSrc }),
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    // Send Mail to The Resident
    const resident = await Resident.findById({
      _id: formData.flatYourAreVisiting,
    });
    const baseUrl = req.nextUrl.origin;
    const approveUrl = `${baseUrl}/api/residents/visitors/verify?id=${visitorData._id}&status=true`;
    const disapproveUrl = `${baseUrl}/api/residents/visitors/verify?id=${visitorData._id}&status=false`;
    const residentTemplate = fs.readFileSync(
      "./src/helper/residentTemplate.ejs",
      "utf-8"
    );
    const residentMailOptions = {
      from: "NovaCops | No Reply <",
      to: resident.email,
      subject: "New Visitor Registered",
      html: ejs.render(residentTemplate, {
        visitorData,
        imgSrc,
        approveUrl,
        disapproveUrl,
      }),
    };
    transporter.sendMail(residentMailOptions, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    return NextResponse.json(
      { message: "Visitor registered successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
