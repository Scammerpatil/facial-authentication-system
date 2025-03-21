import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConfig from "@/middlewares/db.config";
import jwt from "jsonwebtoken";
import User from "@/models/User";
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

  // User login logic
  const user = await User.findOne({ email: formData.email });
  if (!user) {
    return NextResponse.json(
      { message: "User not found", success: false },
      { status: 400 }
    );
  }

  const { stdout, stderr } = await execAsync(
    `py -3.12 python/login.py ${formData.email}`
  );
  if (stderr) {
    console.error(stderr);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }

  const isPasswordValid = await bcryptjs.compare(
    formData.password,
    user.password
  );

  if (isPasswordValid) {
    const data = {
      id: user._id,
      role: "user",
      email: user.email,
      name: user.name,
      profilImage: user.profileImage,
      isVerified: user.isVerified,
    };
    const token = generateToken(data);
    const response = NextResponse.json({
      message: "Login Success",
      success: true,
      route: `/dashboard`,
      user,
    });
    setTokenCookie(response, token);
    return response;
  } else {
    return NextResponse.json(
      { message: "Invalid Credentials", success: false },
      { status: 400 }
    );
  }
}
