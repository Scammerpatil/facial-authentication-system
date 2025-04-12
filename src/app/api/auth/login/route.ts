import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import jwt from "jsonwebtoken";
import User from "@/models/Resident";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
dbConfig();

const generateToken = (data: object) => {
  return jwt.sign(data, process.env.JWT_SECRET!, { expiresIn: "1d" });
};

const setTokenCookie = (response: NextResponse, token: string) => {
  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
  });
};

export async function POST(req: NextRequest) {
  const { formData } = await req.json();

  if (!formData.email || !formData.password) {
    return NextResponse.json(
      { message: "Please fill all the fields", success: false },
      { status: 400 }
    );
  }

  if (
    formData.email === process.env.ADMIN_EMAIL &&
    formData.password === process.env.ADMIN_PASSWORD
  ) {
    const data = {
      id: process.env.ADMIN_ID,
      role: "admin",
      profileImage: process.env.ADMIN_PROFILE_IMAGE,
      email: formData.email,
      name: "Admin",
      isVerified: true,
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      message: "Login Success",
      route: `/admin/dashboard`,
    });
    setTokenCookie(response, token);
    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid Credentials" },
      { status: 400 }
    );
  }
}
