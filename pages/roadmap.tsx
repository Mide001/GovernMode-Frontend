import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NextPage } from "next";

const Roadmap: NextPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4 sm:px-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-400">
          GovernMode Roadmap
        </h1>
        <ul className="list-none p-0">
          {/* Phase 1 */}
          <li className="mb-8 transition-transform transform hover:scale-105">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg text-[#191970] font-semibold mb-2">
                INITIAL DEVELOPMENT & TESTNET DEPLOYMENT - Q1 2024 (APRIL -
                JUNE)
              </h2>
              <ul className="list-disc ml-4">
                <li className="text-gray-600 mb-2">
                  Designing the smart contract architecture for encrypted voting
                </li>
                <li className="text-gray-600 mb-2">Deploying on Mode Testnet</li>
                <li className="text-gray-600 mb-2">
                  Designing and developing a user-friendly interface for
                  GovernMode
                </li>
                <li className="text-gray-600 mb-2">
                  Feedback on the initial smart contract design and
                  functionality.
                </li>
                <li className="text-gray-600">
                  Feedback on the User experience (UX) design
                </li>
              </ul>
            </div>
          </li>

          {/* Phase 2 */}
          <li className="mb-8 ml-4 transition-transform transform hover:scale-105">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg text-[#191970] font-semibold mb-2">
                SECURITY AUDITS & COMMUNITY ENGAGEMENTS - Q2 2024 (JULY -
                SEPTEMBER)
              </h2>
              <ul className="list-disc ml-4">
                <li className="text-gray-600 mb-2">
                  Conducting thorough security audits of the smart contracts
                </li>
                <li className="text-gray-600 mb-2">
                  Performing comprehensive testing to identify and fix any
                  vulnerabilities
                </li>
                <li className="text-gray-600 mb-2">
                  Review and feedback on audit reports and proposed security
                  enhancements
                </li>
                <li className="text-gray-600">
                  Building and fostering a vibrant community around GovernMode{" "}
                </li>
              </ul>
            </div>
          </li>

          <li className="mb-8 ml-8 transition-transform transform hover:scale-105">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg text-[#191970] font-semibold mb-2">
                CONTINUAL IMPROVEMENT AND UPGRADES (Ongoing) - Q3 2024 (OCTOBER
                - DECEMBER)
              </h2>
              <ul className="list-disc ml-4">
                <li className="text-gray-600 mb-2">
                  Implementing upgrades or enhancements based on community input
                  and technological advancements
                </li>
                <li className="text-gray-600 mb-2">
                  Ensuring ongoing security and reliability of the GovernMode
                  platform
                </li>
                <li className="text-gray-600">
                  Ensuring Continuous feedback and suggestions for improving
                  GovernMode
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Roadmap;
