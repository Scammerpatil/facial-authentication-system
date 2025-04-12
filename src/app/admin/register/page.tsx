"use client";
import { IconMail } from "@tabler/icons-react";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const RegisterResident = () => {
  const [resident, setResident] = useState({
    name: "",
    email: "",
    contact: "",
    profileImage: "",
    address: "",
  });

  const handleRegisterResident = async () => {
    if (
      !resident.name ||
      !resident.email ||
      !resident.contact ||
      !resident.profileImage ||
      !resident.address
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = axios.post("/api/residents/register", { resident });
      toast.promise(res, {
        loading: "Registering resident...",
        success: () => {
          return "Resident registered successfully";
        },
        error: (error) => {
          console.log(error);
          return "Error registering resident";
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Error registering resident");
    }
  };
  const handleProfileImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    folderName: string,
    imageName: string,
    path: string
  ) => {
    if (!resident.name) {
      toast.error("Name is required for images");
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file,
        name: imageName,
        folderName: folderName,
      });
      console.log(imageResponse);
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setResident({
            ...resident,
            [path]: data.data.path,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl uppercase text-center font-semibold mb-6">
        Register Resident
      </h1>
      <div className="mx-auto w-full max-w-md border border-base-300 bg-base-300 shadow-lg p-6 rounded-lg space-y-3">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend ">
            What is the Resident Name?
          </legend>
          <input
            type="text"
            className="input input-primary w-full"
            placeholder="Please Enter The Name Here..."
            value={resident.name}
            onChange={(e) => {
              setResident({ ...resident, name: e.target.value });
            }}
          />
        </fieldset>
        <fieldset className="fieldset w-full validator">
          <legend className="fieldset-legend ">
            What is the Resident Email?
          </legend>
          <input
            type="email"
            className="input input-primary w-full"
            placeholder="Please Enter The Email Here..."
            value={resident.email}
            onChange={(e) => {
              setResident({ ...resident, email: e.target.value });
            }}
          />
          <div className="validator-hint hidden">Enter valid email address</div>
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend ">
            What is the Resident Mobile Number?
          </legend>
          <input
            type="tel"
            minLength={10}
            maxLength={10}
            pattern="[0-9]{10}"
            className="input input-primary w-full"
            placeholder="Please Enter The Mobile Number Here..."
            value={resident.contact}
            onChange={(e) => {
              setResident({ ...resident, contact: e.target.value });
            }}
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Resident Profile Image</legend>
          <input
            type="file"
            className="file-input file-input-primary w-full"
            accept="image/* .jpg"
            disabled={!resident.name}
            onChange={(e) => {
              handleProfileImageChange(
                e,
                "profileImage",
                resident.name,
                "profileImage"
              );
            }}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend ">
            What is the Resident Address?
          </legend>
          <textarea
            className="textarea textarea-primary w-full h-24"
            placeholder="Please Enter The Address Here..."
            value={resident.address}
            onChange={(e) => {
              setResident({ ...resident, address: e.target.value });
            }}
            rows={4}
          ></textarea>
        </fieldset>

        <div className="flex justify-center items-center space-x-2">
          <button
            className="btn btn-primary w-full flex items-center justify-center space-x-2"
            onClick={handleRegisterResident}
            disabled={
              !resident.name ||
              !resident.email ||
              !resident.contact ||
              !resident.address
            }
          >
            <IconMail size={20} />
            <span>Register Resident</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterResident;
