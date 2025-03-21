"use client";
import { useAuth } from "@/context/AuthProvider";
import { IconCircleChevronRight } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    localStorage.getItem("user") &&
      setUser(JSON.parse(localStorage.getItem("user")!));
  }, []);
  const router = useRouter();
  const handleLogOut = async () => {
    try {
      const res = axios.get("/api/auth/logout");
      toast.promise(res, {
        loading: "Logging out",
        success: (data) => {
          localStorage.removeItem("user");
          router.push("/login");
          return data.data.message;
        },
        error: (err: any) => {
          console.log(err);
          return err.response?.data?.message || "Error logging out";
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };
  return (
    <section className="bg-base-300 h-[calc(100vh-4.7rem)] flex items-center">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl text-base-content font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Welcome | {user?.name!}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-base-content/70 lg:mb-8 md:text-lg lg:text-xl">
            FaceShield is an advanced facial authentication system that ensures
            secure and seamless access using AI-powered face recognition. With
            real-time face detection and identity matching, FaceShield enhances
            security while offering a frictionless user experience.
          </p>
          <button
            className="btn btn-primary text-base font-medium text-center rounded-lg mr-4"
            onClick={() => {
              handleLogOut();
            }}
          >
            Log Out
            <IconCircleChevronRight />
          </button>
          <a
            href="/about"
            className="btn btn-outline text-base font-medium text-center rounded-lg mr-4"
          >
            Learn More
          </a>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/bg.png" alt="Car Image" />
        </div>
      </div>
    </section>
  );
}
