"use client";

import { Logs } from "@/types/Logs";
import axios from "axios";
import { useEffect, useState } from "react";

const LogsPage = () => {
  const [logs, setLogs] = useState<Logs[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/api/residents/logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold mb-6">
        Your Society Logs
      </h1>

      <div className="overflow-x-auto bg-base-300 rounded-3xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address / Purpose</th>
              <th>Type</th>
              <th>Entry Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => {
                const user = log.isRegistered ? log.resident : log.visitor;
                const isResident = log.isRegistered;

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user?.profileImage || "/placeholder.jpg"}
                              alt={user?.name || "Unknown"}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user?.contact || "N/A"}</td>
                    <td>{user?.email || "N/A"}</td>
                    <td>
                      {isResident
                        ? log.resident?.address || "N/A"
                        : log.visitor?.purposeOfVisit || "N/A"}
                    </td>
                    <td>
                      {isResident ? (
                        <span className="badge badge-success">Resident</span>
                      ) : (
                        <span className="badge badge-warning">Visitor</span>
                      )}
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
                <td colSpan={7} className="text-center py-4">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LogsPage;
