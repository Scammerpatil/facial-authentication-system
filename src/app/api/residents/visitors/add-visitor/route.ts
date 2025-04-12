import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import dbConfig from "@/middlewares/db.config";
import Visitor from "@/models/Visitor";
import Log from "@/models/Logs";

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
    });
    await visitorData.save();
    // Generate Log
    const logData = new Log({
      visitor: visitorData._id,
      isRegistered: false,
      entryTime: new Date(),
    });
    await logData.save();
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
