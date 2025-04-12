import dbConfig from "@/middlewares/db.config";
import Log from "@/models/Logs";
import { NextResponse } from "next/server";
dbConfig();
export async function GET() {
  const logs = await Log.find().populate("resident").populate("visitor");
  return NextResponse.json(logs, { status: 200 });
}
