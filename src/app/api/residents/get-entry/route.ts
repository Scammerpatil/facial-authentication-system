import dbConfig from "@/middlewares/db.config";
import Log from "@/models/Logs";
import Resident from "@/models/Resident";
import { exec } from "child_process";
import { NextResponse } from "next/server";
import { promisify } from "util";
const execAsync = promisify(exec);

dbConfig();

export async function GET() {
  try {
    const { stdout } = await execAsync("py -3.12 python/get_entry.py");
    console.log(stdout.trim());
    if (stdout.trim() === "No face detected") {
      return NextResponse.json(
        { message: "No face detected" },
        { status: 400 }
      );
    } else if (stdout.trim() === "Visitor") {
      return NextResponse.json({ message: "Visitor" }, { status: 200 });
    }
    const resident = await Resident.findOne({
      name: stdout.trim().split("_").join(" "),
    });
    if (!resident) {
      return NextResponse.json(
        { message: "Resident not found" },
        { status: 404 }
      );
    }
    const log = new Log({
      resident: resident._id,
      isRegistered: true,
      entryTime: new Date(),
    });
    await log.save();
    return NextResponse.json(
      { message: "Resident found", name: resident.name },
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
