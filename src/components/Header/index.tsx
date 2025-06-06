"use client";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { IconFingerprintScan } from "@tabler/icons-react";

const Header = () => {
  return (
    <>
      <div className="navbar px-10 py-2 bg-base-300">
        <div className="navbar-start">
          <Link href="/" className="space-x-3 flex items-center">
            <IconFingerprintScan size={50} className="text-primary" />
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-[2px]">
                <span className="text-primary font-extrabold text-xl">
                  Face
                </span>
                <span className="text-accent font-semibold text-xl">Entry</span>
              </div>
              <hr className="w-full border border-base-content" />
              <span className="text-sm text-base-content/70 italic">
                Your Face is the Key.
              </span>
            </div>
          </Link>
        </div>
        {/* <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base text-base-content">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/features">Features</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div> */}

        <div className="navbar-end space-x-3">
          <Link href="/login" className="btn btn-accent">
            Login
          </Link>
          <ThemeToggler />
        </div>
      </div>
    </>
  );
};

export default Header;
