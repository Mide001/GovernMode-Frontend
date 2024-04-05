import React, { useState } from "react";
import { PlusIcon } from "../assets/ConstantIcons";
import { EncryptenContractAddress, EncryptenAbi } from "../constant";
import Notification from "./Notification";
import { useAccount, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "./config";

const NewProposal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [duration, setDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const { address, isConnected } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const errorMessages = {
    invalidTitle: "Title should contain only letters and spaces.",
    invalidContent: "Content should be a text.",
    invalidDuration: "Duration should be a number.",
    isConnected: "Connect Wallet To Create Proposal!",
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCreateProposal = async () => {
    setLoading(true);
    try {
      if (!isConnected) {
        setLoading(false);
        throw new Error(errorMessages.isConnected);
      }
      // Validate title (should be only text)
      if (!/^[a-zA-Z\s]+$/.test(title)) {
        setLoading(false);
        throw new Error(errorMessages.invalidTitle);
      }

      // Validate content (should be text)
      if (typeof content !== "string") {
        setLoading(false);
        throw new Error(errorMessages.invalidContent);
      }

      // Validate duration (should be a positive integer)
      const durationValue = parseInt(duration, 10);
      if (isNaN(durationValue) || durationValue <= 0) {
        setLoading(false);
        throw new Error(errorMessages.invalidDuration);
      }

      const tx = await writeContractAsync({
        abi: EncryptenAbi,
        address: EncryptenContractAddress,
        functionName: "createProposal",
        args: [title, content, duration],
      });

      console.log("Transaction Hash: ", tx);

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: tx,
      });

      console.log("Transaction Hash", transactionReceipt);

      setLoading(false);

      setSuccessMessage(
        `${address.slice(0, 3)}...${address.slice(
          -2
        )} successfully created a proposal!`
      );

      if (!isConnected) {
        console.error("Connect your wallet first.");
        return;
      }
      setTitle("");
      setContent("");
      setDuration("");
      setTimeout(() => {
        setSuccessMessage("");
        closeModal();
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-end mt-8 p-2">
      <button
        className="border border-[#D7FF00] text-[#D7FF00] px-4 py-2 rounded-full flex items-center"
        onClick={openModal}
      >
        <PlusIcon className="h-5 w-5 mr-2" /> New Proposal
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-gray-200 p-8 rounded-lg w-[500px]">
            <h2 className="text-xl text-[#191970] font-light">
              Create Proposal
            </h2>

            {successMessage && (
              <Notification
                message={successMessage}
                type="success"
                onClose={() => setSuccessMessage("")}
              />
            )}

            <div className="mb-4 mt-8">
              {errorMessage === "isConnected" && (
                <span className="text-red-500 block mt-1">
                  {errorMessages.isConnected}
                </span>
              )}
              <label className="block text-sm font-medium text-gray-700">
                Proposal Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-200 text-gray-600"
              />
              {errorMessage === "invalidTitle" && (
                <span className="text-red-500 block mt-1">
                  {errorMessages.invalidTitle}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Proposal Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded bg-gray-200 text-gray-600"
              ></textarea>
              {errorMessage === "invalidContent" && (
                <span className="text-red-500 block mt-1">
                  {errorMessages.invalidContent}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Enter duration in days"
                  className="p-2 w-full border border-gray-300 rounded bg-gray-200 text-gray-600"
                />
                {errorMessage === "invalidDuration" && (
                  <span className="text-red-500 block mt-1">
                    {errorMessages.invalidDuration}
                  </span>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <span className="text-gray-500">days</span>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                proposal start time starts immediately the proposal is created
              </span>
            </div>

            {errorMessage && !errorMessages[errorMessage] && (
              <span className="text-red-500 block mb-2">{errorMessage}</span>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleCreateProposal}
                className="px-4 py-2 bg-[#191970] text-gray-200 rounded hover:bg-blue-500"
              >
                {loading ? "Creating..." : "Create"}
              </button>
              <button
                onClick={closeModal}
                className="ml-2 px-4 py-2 text-[red] border border-gray-400 rounded hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProposal;
