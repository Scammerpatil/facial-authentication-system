import dbConfig from "@/middlewares/db.config";
import Resident from "@/models/Resident";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const residents = await Resident.find({});
  return NextResponse.json(residents, { status: 200 });
}
