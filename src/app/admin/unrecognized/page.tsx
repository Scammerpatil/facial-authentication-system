"use client";

import { Visitor } from "@/types/Visitor";
import axios from "axios";
import { useEffect, useState } from "react";

const UnrecognizedPage = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await axios.get("/api/residents/visitors");
        setVisitors(response.data);
      } catch (error) {
        console.error("Error fetching visitors:", error);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold mb-6">
        Unrecognized Visitors
      </h1>

      <div className="overflow-x-auto bg-base-300 rounded-3xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Visiting Resident</th>
              <th>Purpose of Visit</th>
              <th>Visitor ID</th>
              <th>Visitor ID Number</th>
              <th>Captured At</th>
              <th>Approved</th>
            </tr>
          </thead>
          <tbody>
            {visitors.length > 0 ? (
              visitors.map((visitor, index) => (
                <tr key={visitor.visitorId}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={visitor.profileImage || "/placeholder.jpg"}
                            alt={visitor.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{visitor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{visitor.contact}</td>
                  <td>{visitor.email}</td>
                  <td>
                    {visitor.flatYourAreVisiting?.name} -{" "}
                    {visitor.flatYourAreVisiting?.address}
                  </td>
                  <td>{visitor.purposeOfVisit}</td>
                  <td>{visitor.visitorId}</td>
                  <td>{visitor.visitorIdNumber}</td>
                  <td>
                    {new Date(visitor.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td>{visitor.approved ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No unrecognized visitors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UnrecognizedPage;
