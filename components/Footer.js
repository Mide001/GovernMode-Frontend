import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="py-4 px-8">
          {" "}
          <hr className="border-t-2 border-gray-400 my-4" />{" "}
        </div>
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center px-6">
          <div className="flex flex-col lg:flex-row items-center mb-4 lg:mb-0">
            <span className="mb-2 lg:mb-0 lg:mr-2 text-gray-200">
              Privacy Policy
            </span>
            <span className="hidden lg:inline lg:mx-2 text-gray-600">|</span>
            <span className="mb-2 lg:mb-0 lg:mr-2 text-gray-200">
              Terms & Conditions
            </span>
            <span className="hidden lg:inline lg:mx-2 text-gray-200">|</span>
            <span className="mb-2 lg:mb-0 text-gray-200">Cookie Policy</span>
          </div>

          <div className="text-gray-200">&copy; Encrypten {new Date().getFullYear()}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
