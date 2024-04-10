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
          GovernMode Is A DAO-Based Ecosystem On
          <br className="hidden sm:inline" />{" "}
          <span className="text-[#D7FF00]">Mode Blockchain!</span>
        </h2>
        <p className="text-[12px] sm:text-[12px] text-gray-400 mt-4">
          Redefining Decentralized Governance for Web3
          <br className="hidden sm:inline" /> Unlock the power of decentralized
          decision-making with GovernMode – your gateway to transparent, secure,
          and community-driven governance in the Web3 era
        </p>

        <div className="mt-6 flex flex-col items-center">
          <div className="mb-16">
            <Link
              href="/dao"
              className="border border-[#D7FF00] px-4 py-2 rounded-md"
            >
              Launch App
            </Link>
          </div>
          <div>
            <a
              href="https://twitter.com/GovernMode13951"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1DA1F2] hover:text-[#1A91DA]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
