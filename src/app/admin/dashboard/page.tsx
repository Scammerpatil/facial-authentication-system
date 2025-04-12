"use client";
import {
  IconUserCheck,
  IconUserX,
  IconUsers,
  IconClock,
  IconCamera,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center uppercase">
        Face-Entry Admin Dashboard
      </h1>

      {/* Stats Overview */}
      <div className="stats shadow w-full bg-base-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="stat">
          <div className="stat-figure text-info">
            <IconUsers size={40} />
          </div>
          <div className="stat-title">Total Entries</div>
          <div className="stat-value text-info">2,431</div>
          <div className="stat-desc">+12% this week</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <IconUserCheck size={40} />
          </div>
          <div className="stat-title">Registered Entries</div>
          <div className="stat-value text-success">1,920</div>
          <div className="stat-desc">Verified Residents</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <IconUserX size={40} />
          </div>
          <div className="stat-title">Unregistered Entries</div>
          <div className="stat-value text-warning">511</div>
          <div className="stat-desc">New Visitors</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <IconClock size={40} />
          </div>
          <div className="stat-title">Latest Entry</div>
          <div className="stat-value text-accent">2 mins ago</div>
          <div className="stat-desc">Auto-logged entry</div>
        </div>
      </div>

      {/* Live Feed + Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Live Camera Preview Placeholder */}
        <div className="bg-base-300 p-4 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Live Camera Preview</h2>
            <IconCamera size={28} className="text-accent" />
          </div>
          <div className="aspect-video bg-black rounded-xl flex items-center justify-center text-white">
            Live feed here (stream/cam component)
          </div>
        </div>

        {/* Recent Logs Preview */}
        <div className="bg-base-300 p-4 rounded-2xl shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Recent Entry Logs</h2>
            <Link
              href="/admin/logs"
              className="btn btn-sm btn-outline btn-accent"
            >
              View All Logs
            </Link>
          </div>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Registered</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {/* Example logs */}
              <tr>
                <td>1</td>
                <td>Riya Sharma</td>
                <td className="text-green-500 font-semibold">Yes</td>
                <td>Today, 9:15 AM</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Unknown Visitor</td>
                <td className="text-red-500 font-semibold">No</td>
                <td>Today, 9:10 AM</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Arjun Mehta</td>
                <td className="text-green-500 font-semibold">Yes</td>
                <td>Today, 8:54 AM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
