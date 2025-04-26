import Visitor from "@/models/Visitor";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const visitorId = searchParams.get("id");
  const status = searchParams.get("status");
  try {
    if (!visitorId || !status) {
      return NextResponse.json(
        { message: "Visitor ID and status are required" },
        { status: 400 }
      );
    }
    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return NextResponse.json(
        { message: "Visitor not found" },
        { status: 404 }
      );
    }
    visitor.approved = status === "true" ? true : false;
    await visitor.save();
    return NextResponse.json(
      { message: "Visitor status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching visitor:", error);
    return NextResponse.json(
      { message: "Error fetching visitor" },
      { status: 500 }
    );
  }
}
