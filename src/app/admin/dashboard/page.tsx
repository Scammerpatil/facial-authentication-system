"use client";
import { Logs } from "@/types/Logs";
import {
  IconUserCheck,
  IconUserX,
  IconUsers,
  IconClock,
  IconCamera,
} from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalEntries: 0,
    registeredEntries: 0,
    unregisteredEntries: 0,
    latestEntry: "",
    liveFeed: "",
    recentLogs: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setDashboard(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);
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
          <div className="stat-value text-info">{dashboard.totalEntries}</div>
          <div className="stat-desc">+12% this week</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-success">
            <IconUserCheck size={40} />
          </div>
          <div className="stat-title">Registered Entries</div>
          <div className="stat-value text-success">
            {dashboard.registeredEntries}
          </div>
          <div className="stat-desc">Verified Residents</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <IconUserX size={40} />
          </div>
          <div className="stat-title">Unregistered Entries</div>
          <div className="stat-value text-warning">
            {dashboard.unregisteredEntries}
          </div>
          <div className="stat-desc">New Visitors</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <IconClock size={40} />
          </div>
          <div className="stat-title">Latest Entry</div>
          <div className="stat-value text-accent">{dashboard.latestEntry}</div>
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
          <div className="aspect-video rounded-xl flex items-center justify-center">
            <video
              src="/video.mp4"
              autoPlay={true}
              loop
              controls={false}
              muted
            />
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
              {dashboard.recentLogs.length > 0 ? (
                dashboard.recentLogs.map((log: Logs, index) => {
                  const isResident = log.isRegistered;
                  const user = isResident ? log.resident : log.visitor;
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user?.name}</td>
                      <td
                        className={`${
                          log.isRegistered ? "text-green-500" : "text-red-500"
                        } font-semibold text-center`}
                      >
                        {log.isRegistered ? "Yes" : "No"}
                      </td>
                      <td>
                        {new Date(log.entryTime).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">
                    No recent logs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
