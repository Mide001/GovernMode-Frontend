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
          <div className="mb-14">
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
                className="w-6 h-6 stroke-current stroke-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.46 4.87c-.8.35-1.66.58-2.56.69.92-.55 1.62-1.42 1.95-2.46-.86.51-1.82.88-2.84 1.08-.82-.88-2-1.42-3.3-1.42-2.5 0-4.54 2.04-4.54 4.54 0 .36.04.7.11 1.04-3.77-.19-7.12-2-9.37-4.76-.39.68-.61 1.47-.61 2.32 0 1.58.81 2.97 2.04 3.78-.75 0-1.45-.23-2.07-.58v.06c0 2.21 1.57 4.05 3.65 4.46-.38.1-.78.15-1.2.15-.29 0-.58-.03-.85-.08.58 1.81 2.26 3.14 4.25 3.18-1.56 1.22-3.52 1.95-5.65 1.95-.37 0-.74-.02-1.11-.07 2.02 1.29 4.42 2.05 7.01 2.05 8.41 0 13.02-6.98 13.02-13.02 0-.2 0-.4-.01-.6.89-.64 1.66-1.44 2.27-2.34z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
