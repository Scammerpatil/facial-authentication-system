"use client";
import { Resident } from "@/types/Resident";
import axios from "axios";
import { useEffect, useState } from "react";

const RegisterResident = () => {
  const [resident, setResident] = useState<Resident[]>([]);
  useEffect(() => {
    const fetchResidents = async () => {
      const response = await axios.get("/api/residents");
      setResident(response.data);
    };
    fetchResidents();
  }, []);
  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold mb-6">
        Your Society Resident Registration
      </h1>
      <div className="overflow-x-auto bg-base-300 rounded-3xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {resident.length > 0 ? (
              resident.map((res, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={res.profileImage} alt={res.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{res.name}</div>
                        <div className="text-sm opacity-50">{res.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{res.contact}</td>
                  <td>{res.address}</td>
                  <th className="space-x-2">
                    <button className="btn btn-accent">Edit</button>
                    <button className="btn btn-error">Delete</button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No residents found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegisterResident;
