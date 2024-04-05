"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../assets/Governmode-Dark.png";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-2 md:py-2">
      <div className="container mx-auto flex justify-between items-center border-b border-gray-300 py-2 pl-4">
        <div>
          <Link href="/">
            <Image src={Logo} alt="Encrypten Logo" className="w-20 h-6" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <ul className="flex space-x-6 mt-1">
            <li className="group relative">
              <Link
                href={"/"}
                className={`${
                  pathname === "/" ? "text-[#D7FF00]" : "text-white"
                }`}
                aria-label="Go to Home"
              >
                Overview
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D7FF00] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
            <li className="group relative">
              <Link
                href={"/roadmap"}
                className={`${
                  pathname === "/roadmap" ? "text-[#D7FF00]" : "text-white"
                }`}
              >
                Roadmap
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D7FF00] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
            <li className="group relative">
              <Link
                href={"/documentation"}
                className={`${
                  pathname === "/documentation"
                    ? "text-[#D7FF00]"
                    : "text-white"
                }`}
              >
                Documentation
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#D7FF00] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
          </ul>

          <Link
            href="/dao"
            className="border border-[#D7FF00] px-4 py-1 rounded-md"
          >
            Launch App
          </Link>
        </div>
        <div className="md:hidden pr-3">
          <button onClick={toggleNavbar} className="text-[#203475]">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden py-4 border-b border-gray-300 pl-4">
          <ul className="flex flex-col space-y-3">
            <li>
              <Link href="#" className="text-white">
                Overview
              </Link>
            </li>
            <li>
              <Link href="/roadmap" className="text-white">
                Roadmap
              </Link>
            </li>
            <li>
              <Link href="/documentation" className="text-white">
                Documentation
              </Link>
            </li>
          </ul>
          <div className="mt-3">
            <Link
              href="/dao"
              className="border border-[#D7FF00] px-4 py-1 rounded-md"
            >
              Launch App
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
