import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "80vh" }}
    >
      <MainContent />
    </div>
  );
};

const MainContent = () => {
  return (
    <>
      <div className="p-4 rounded-lg text-center">
        <h2 className="text-[24px] sm:text-[44px] text-gray-200 font-semibold leading-[1] mt-4">
          Encrypten Is A DAO-Based Ecosystem For
          <br className="hidden sm:inline" /> Tenprotocol!
        </h2>
        <p className="text-[12px] sm:text-[12px] text-gray-400 mt-4">
          Redefining Decentralized Governance for Web3
          <br className="hidden sm:inline" /> Unlock the power of decentralized
          decision-making with Encrypten – your gateway to transparent, secure,
          and community-driven governance in the Web3 era
        </p>

        <div className="mt-6">
          <Link href="/dao" className="bg-gray-200 text-[#203475] px-4 py-2">
            Launch App
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
