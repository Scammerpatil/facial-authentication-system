import Log from "@/models/Logs";
import Resident from "@/models/Resident";
import Visitor from "@/models/Visitor";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const registeredEntries = await Resident.countDocuments();
    const unregisteredEntries = await Visitor.countDocuments();
    const totalEntries = registeredEntries + unregisteredEntries;
    const lastEntry = await Visitor.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );

    let latestEntry;

    if (!lastEntry) {
      latestEntry = "No entries yet";
    } else {
      const diffMs = Date.now() - new Date(lastEntry.createdAt).getTime();
      const diffMinutes = Math.floor(diffMs / 60000);

      if (diffMinutes < 1) {
        latestEntry = "Just now";
      } else if (diffMinutes < 60) {
        latestEntry = `${diffMinutes} min ago`;
      } else if (diffMinutes < 1440) {
        const hours = Math.floor(diffMinutes / 60);
        latestEntry = `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else {
        const days = Math.floor(diffMinutes / 1440);
        latestEntry = `${days} day${days > 1 ? "s" : ""} ago`;
      }
    }
    const recentLogs = await Log.find(
      {},
      {},
      { sort: { createdAt: -1 }, limit: 5 }
    )
      .populate("visitor")
      .populate("resident");
    return NextResponse.json(
      {
        totalEntries,
        registeredEntries,
        unregisteredEntries,
        latestEntry,
        recentLogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
