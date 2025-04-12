"use client";
import { IconCircleChevronRight } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const router = useRouter();
  const handleEntry = async () => {
    const res = axios.get("/api/residents/get-entry");
    toast.promise(res, {
      loading: "Verifying your entry...",
      success: (data) => {
        if (data.data.message === "Resident found") {
          return "Hello, " + data.data.name + "!";
        } else if (data.data.message === "Visitor") {
          router.push("/visitor");
          return "Redirecting to entry page...";
        } else if (data.data.message === "No face detected") {
          return "No face detected!";
        } else {
          return "Resident not found!";
        }
      },
      error: (err) => {
        console.log(err);
        return "Something went wrong!";
      },
    });
  };
  return (
    <section className="bg-base-300 h-[calc(100vh-4.7rem)] flex items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl text-base-content font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl">
            FaceEntry | Your Face is the Key.
          </h1>
          <p className="max-w-2xl mb-6 font-light text-base-content/70 lg:mb-8 md:text-lg lg:text-xl">
            FaceEntry is an AI-driven society security solution that uses facial
            data to manage resident entries and log visitor activity. Easy to
            use. Hard to breach.
          </p>
          <a
            href="/login"
            className="btn btn-primary text-base font-medium text-center rounded-lg mr-4"
          >
            Get Started
            <IconCircleChevronRight />
          </a>
          <button
            className="btn btn-outline btn-accent text-base font-medium text-center rounded-lg mr-4"
            onClick={handleEntry}
          >
            Enter In The Society <IconCircleChevronRight />
          </button>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/bg.png" alt="Missing Person Image" />
        </div>
      </div>
    </section>
  );
}
