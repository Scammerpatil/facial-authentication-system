"use client";
import { Resident } from "@/types/Resident";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 640,
  height: 480,
  facingMode: "user",
};

export default function VisitorVerifyForm() {
  const webcamRef = useRef(null);
  const [flatYourAreVisiting, setFlatYourAreVisiting] = useState<Resident[]>(
    []
  );
  const [imgSrc, setImgSrc] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    purposeOfVisit: "",
    profileImage: "",
    flatYourAreVisiting: "",
    visitorId: "",
    visitorIdNumber: "",
  });
  useEffect(() => {
    const fetchFlats = async () => {
      try {
        const response = await axios.get("/api/residents");
        setFlatYourAreVisiting(response.data);
      } catch (error) {
        console.error("Error fetching flats:", error);
      }
    };
    fetchFlats();
  }, []);
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const handleSubmit = async () => {
    // Validate form data
    if (
      !formData.name ||
      !formData.contact ||
      !formData.email ||
      !formData.purposeOfVisit ||
      !formData.visitorId ||
      !formData.flatYourAreVisiting ||
      !formData.visitorIdNumber
    ) {
      toast.error("Please fill in all required fields!");
      return;
    }
    if (formData.contact.length !== 10) {
      toast.error("Contact number must be 10 digits!");
      return;
    }
    if (!imgSrc) {
      toast.error("Please capture an image!");
      return;
    }
    try {
      // Upload image to server
      const res = axios.post("/api/residents/visitors/add-visitor", {
        formData,
        imgSrc,
      });
      toast.promise(res, {
        loading: "Processing...",
        success: () => {
          setFormData({
            name: "",
            contact: "",
            email: "",
            purposeOfVisit: "",
            profileImage: "",
            visitorId: "",
            flatYourAreVisiting: "",
            visitorIdNumber: "",
          });
          setImgSrc(null);
          return "Visitor registered successfully!";
        },
        error: (error) => {
          console.log(error);
          return "Error registering visitor!";
        },
      });
    } catch (error) {
      console.log("Error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="bg-base-300 flex items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-3xl text-base-content font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Visitor Enrollment Form
          </h1>
          <div className="space-y-4 lg:pr-32">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-primary w-full"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="text"
              minLength={10}
              maxLength={10}
              pattern="[0-9]*"
              name="contact"
              placeholder="Contact Number"
              className="input input-primary w-full"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-primary w-full"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              name="purposeOfVisit"
              placeholder="Purpose of Visit"
              className="input input-primary w-full"
              list="visitorIdList"
              value={formData.purposeOfVisit}
              onChange={(e) =>
                setFormData({ ...formData, purposeOfVisit: e.target.value })
              }
            />
            <datalist id="visitorIdList">
              <option value="Visitor" />
              <option value="Delivery" />
              <option value="Guest" />
              <option value="Other" />
            </datalist>
            <select
              className="select select-primary w-full"
              value={formData.visitorId}
              onChange={(e) =>
                setFormData({ ...formData, visitorId: e.target.value })
              }
            >
              <option value="" disabled>
                Select Visitor ID
              </option>
              <option value="Aadhar">Aadhar</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="Voter ID">Voter ID</option>
            </select>

            <select
              className="select select-primary w-full"
              value={formData.flatYourAreVisiting}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  flatYourAreVisiting: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select Flat You Are Visiting
              </option>
              {flatYourAreVisiting.map((flat) => (
                <option key={flat._id} value={flat._id}>
                  {flat.name} - {flat.address}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Visitor ID Number"
              className="input input-primary w-full"
              value={formData.visitorIdNumber}
              onChange={(e) =>
                setFormData({ ...formData, visitorIdNumber: e.target.value })
              }
            />

            {!imgSrc ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  className="rounded-md shadow"
                />
                <button
                  type="button"
                  onClick={captureImage}
                  className="btn btn-primary mt-4 w-full"
                >
                  Capture Image
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <img
                  src={imgSrc}
                  alt="Captured"
                  className="rounded shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setImgSrc(null)}
                  className="btn btn-secondary w-full mt-6"
                >
                  Retake
                </button>
              </div>
            )}

            <button
              className="btn btn-success mt-4 w-full"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="/bg.png"
            alt="Missing Person Image"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
