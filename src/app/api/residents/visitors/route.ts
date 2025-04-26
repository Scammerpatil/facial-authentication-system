import dbConfig from "@/middlewares/db.config";
import Visitor from "@/models/Visitor";
import { NextResponse } from "next/server";

dbConfig();

export async function GET() {
  const visitors = await Visitor.find().populate("flatYourAreVisiting");
  return NextResponse.json(visitors, { status: 200 });
}
