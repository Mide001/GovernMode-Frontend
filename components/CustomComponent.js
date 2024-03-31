import React, { useState, useEffect } from "react";
import { EncryptenContractAddress, EncryptenAbi } from "../constant";
import { UpvoteIcon, DownvoteIcon } from "../assets/ConstantIcons";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "./config";
import Notification from "./Notification";
import LoadingSpinner from "./LoadingSpinner";

const CustomComponent = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const [loadingStates, setLoadingStates] = useState({});
  const [notification, setNotification] = useState(null);

  const { address, isConnected } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const data = useReadContract({
    abi: EncryptenAbi,
    address: EncryptenContractAddress,
    functionName: "getAllProposals",
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProposals = async () => {
      try {
        if (data?.data) {
          const formattedProposals = data.data.map((proposal) => {
            const startTime = new Date(Number(proposal.startTime) * 1000);
            const endTime = new Date(Number(proposal.endTime) * 1000);

            const now = new Date();
            let status = "active";

            if (now > endTime) {
              status = "inactive";
            }
            return {
              id: proposal.id,
              title: proposal.title,
              content: proposal.content,
              upVote: Number(proposal.forVotes),
              downVote: Number(proposal.againstVotes),
              startTime: startTime.toLocaleString(),
              endTime: endTime.toLocaleString(),
              status: status,
              creator: `${proposal.creator.slice(
                0,
                4
              )}...${proposal.creator.slice(-3)}`,
            };
          });

          if (isMounted) {
            setProposals(formattedProposals);
            setLoading(false);
            setInitialFetchDone(true);
          }
        }
      } catch (error) {
        console.log("Error Fetching Proposals: ", error);
        setLoading(false);
      }
    };

    if (data && !initialFetchDone) {
      // Fetch data only if initialFetchDone is false
      fetchProposals();
    }

    return () => {
      isMounted = false;
    };
  }, [data, initialFetchDone]);

  const castVote = async (proposalId, isVote) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [proposalId]: true,
    }));

    try {
      const tx = await writeContractAsync({
        abi: EncryptenAbi,
        address: EncryptenContractAddress,
        functionName: "vote",
        args: [proposalId, isVote],
      });

      console.log("Transaction Hash: ", tx);

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: tx,
      });

      console.log("Transaction Hash", transactionReceipt);

      setNotification({
        message: "Vote submitted successfully!",
        type: "success",
      });
    } catch (error) {
      console.log("Error Message: ", error.message);
      if (error.message.includes("Already Voted")) {
        setNotification({
          message: "You have already voted on this proposal.",
          type: "error",
        });
      } else if (error.message.includes("Voting is closed!")) {
        setNotification({
          message: "Proposal Voting is closed!",
          type: "error",
        });
      } else {
        setNotification({
          message: "Error submitting vote. Please try again.",
          type: "error",
        });
      }
    } finally {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [proposalId]: false,
      }));
    }
  };

  if (!isConnected) {
    return (
      <div>You are not connected. Please connect your wallet to proceed.</div>
    );
  }

  if (loading && !initialFetchDone) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className={`bg-white rounded-lg shadow-lg ${
            proposal.status === "active" ? "border-green-500" : "border-red-500"
          } max-w-3xl mx-auto p-4 mb-4`}
        >
          <div className="border-b p-4">
            <h2 className="text-xl text-[#191970] font-semibold">
              {proposal.title}
            </h2>
            <p className="text-gray-600 text-sm">{proposal.creator}</p>
          </div>
          <div className="p-4">
            <p className="text-gray-600">{proposal.content}</p>
          </div>

          <div className="flex justify-end">
            <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-lg text-sm">
              End Date: {proposal.endTime}
            </span>
          </div>

          <div className="flex items-center justify-between p-4">
            <span
              className={`inline-block px-2 py-1 text-sm rounded ${
                proposal.status === "active"
                  ? "text-green-500 bg-green-100"
                  : "text-red-500 bg-red-100"
              }`}
            >
              {proposal.status}
            </span>
            <div className="flex items-center">
              <button
                className="text-gray-700 text-sm py-2 px-4 mr-2 flex items-center"
                onClick={() => castVote(proposal.id, true)}
                disabled={loadingStates[proposal.id]}
              >
                <UpvoteIcon className="mr-1" />
                {loadingStates[proposal.id] ? (
                  <LoadingAnimation />
                ) : (
                  proposal.upVote
                )}
              </button>
              <button
                className="text-gray-700 text-sm py-2 px-4 flex items-center"
                onClick={() => castVote(proposal.id, false)}
                disabled={loadingStates[proposal.id]}
              >
                <DownvoteIcon className="mr-1" />
                {loadingStates[proposal.id] ? (
                  <LoadingAnimation />
                ) : (
                  proposal.downVote
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const LoadingAnimation = () => (
  <span className="loader">
    <span className="loader__dot">•</span>
    <span className="loader__dot">•</span>
    <span className="loader__dot">•</span>
  </span>
);

export default CustomComponent;
