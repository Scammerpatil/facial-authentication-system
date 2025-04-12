import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import Resident from "@/models/Resident";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const { resident } = await req.json();
  if (
    !resident.name ||
    !resident.email ||
    !resident.contact ||
    !resident.address
  ) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }
  try {
    const { stdout } = await execAsync(
      `py -3.12 python/enroll_resident.py "${resident.name}"`
    );
    console.log(stdout.trim());
    console.log("Building resident encoding...");
    await execAsync("py -3.12 python/encoding.py");
    console.log("Resident encoding built successfully");
    const newResident = new Resident({
      ...resident,
    });
    await newResident.save();
    return NextResponse.json(
      { message: "Resident registered successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Something went wrong:", error);
    return NextResponse.json(
      { message: "Something went wrong!!!" },
      { status: 500 }
    );
  }
}
