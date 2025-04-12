import Resident from "@/models/Resident";
import { NextResponse } from "next/server";

export async function GET() {
  const residents = await Resident.find({});
  return NextResponse.json(residents, { status: 200 });
}
