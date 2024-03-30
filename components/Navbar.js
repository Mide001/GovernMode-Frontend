"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../assets/Encryten-logo.png";
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
            <Image src={Logo} alt="Encrypten Logo" className="w-16 h-5" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <ul className="flex space-x-6 mt-1">
            <li className="group relative">
              <Link
                href={"/"}
                className={`${
                  pathname === "/" ? "text-[#191970]" : "text-white"
                }`}
                aria-label="Go to Home"
              >
                Overview
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#191970] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
            <li className="group relative">
              <Link
                href={"/roadmap"}
                className={`${
                  pathname === "/roadmap" ? "text-[#191970]" : "text-white"
                }`}
              >
                Roadmap
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#191970] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
            <li className="group relative">
              <Link
                href={"/documentation"}
                className={`${
                  pathname === "/documentation"
                    ? "text-[#191970]"
                    : "text-white"
                }`}
              >
                Documentation
              </Link>
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#191970] transform scale-x-0 group-hover:scale-x-100 origin-bottom transition-transform"></div>
            </li>
          </ul>

          <a
            href="/dao"
            className="bg-gray-200 text-[#203475] px-4 py-1 rounded-md"
          >
            Launch App
          </a>
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
              <a href="#" className="text-white">
                Overview
              </a>
            </li>
            <li>
              <a href="/roadmap" className="text-white">
                Roadmap
              </a>
            </li>
            <li>
              <a href="/documentation" className="text-white">
                Documentation
              </a>
            </li>
          </ul>
          <div className="mt-3">
            <a
              href="/dao"
              className="bg-gray-200 text-[#203475] px-4 py-1 rounded-md"
            >
              Launch App
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
