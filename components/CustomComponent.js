import React, { useState, useEffect } from "react";
import { EncryptenContractAddress, EncryptenAbi } from "../constant";
import { UpvoteIcon, DownvoteIcon } from "../assets/ConstantIcons";
import {
  useAccount,
  useSwitchChain,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "../config/config";
import Notification from "./Notification";
import NewProposal from "./NewProposal";
import LoadingSpinner from "./LoadingSpinner";
import { SearchIcon } from "../assets/ConstantIcons";
import LoadingAnimation from "./LoadingAnimation";
import Link from "next/link";

const CustomComponent = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  const [loadingStates, setLoadingStates] = useState({});
  const [notification, setNotification] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("all");

  const { address, isConnected } = useAccount();

  const { writeContractAsync } = useWriteContract();

  const data = useReadContract({
    abi: EncryptenAbi,
    address: EncryptenContractAddress,
    functionName: "getAllProposals",
  });

  const { switchChain } = useSwitchChain();
  const account = useAccount();

  const switchToChain = async () => {
    await switchChain({ chainId: Number(919) });
  };

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
              startTime: startTime.getTime(),
              endTime: endTime.toLocaleString(),
              status: status,
              creator: `${proposal.creator.slice(
                0,
                4
              )}...${proposal.creator.slice(-3)}`,
              creatorAddress: proposal.creator,
            };
          });

          // Sort the proposals based on the startTime in descending order
          formattedProposals.sort((a, b) => b.startTime - a.startTime);

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

      // Update the vote count immediately after a successful vote
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal.id === proposalId
            ? {
                ...proposal,
                upVote: isVote ? proposal.upVote + 1 : proposal.upVote,
                downVote: !isVote ? proposal.downVote + 1 : proposal.downVote,
              }
            : proposal
        )
      );

      setNotification({
        message: `${address.slice(0, 3)}...${address.slice(
          -2
        )} vote submitted successfully!`,
        type: "success",
      });
    } catch (error) {
      console.log("Error Message: ", error.message);
      if (error.message.includes("Already voted!")) {
        setNotification({
          message: `${address.slice(0, 3)}...${address.slice(-2)} have already voted on this proposal.`,
          type: "error",
        });
      } else if (error.message.includes("Voting is closed!")) {
        setNotification({
          message: "Proposal Voting is closed!",
          type: "error",
        });
      } else if (
        error.message.includes("Insufficient balance to perform this action")
      ) {
        setNotification({
          message: "Minimum balance of 0.002 ETH required!",
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

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredProposals = proposals
    .filter((proposal) => {
      if (filter === "active") {
        return proposal.status === "active";
      } else if (filter === "closed") {
        return proposal.status === "inactive";
      } else {
        return true;
      }
    })
    .filter((proposal) => {
      const title = proposal.title.toLowerCase();
      return title.includes(searchValue.toLowerCase());
    });

  if (!isConnected) {
    return (
      <div
        className="container mx-auto text-center p-4 text-gray-200"
        style={{ minHeight: "65vh" }}
      >
        You are not connected. Please connect your wallet to access proposals.
      </div>
    );
  }

  if (account.chainId !== Number(919)) {
    return (
      <div
        className="container mx-auto flex flex-col justify-center items-center"
        style={{ minHeight: "65vh" }}
      >
        <span className="text-gray-200 mb-4">
          Connect to Mode Testnet to access GovernMode proposals
        </span>
        <button
          onClick={switchToChain}
          className="border border-[#D7FF00] text-[#D7FF00] px-4 py-2 rounded-full flex items-center"
        >
          Connect ModeTestnet
        </button>
      </div>
    );
  }

  if (loading && !initialFetchDone) {
    return (
      <>
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "80vh" }}
        >
          <LoadingSpinner />
        </div>
      </>
    );
  }

  return (
    <>
      <NewProposal />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div></div>
      <div className="max-w-3xl mx-auto mb-4 mb-4 flex justify-between items-center">
        <div className="md:flex flex-1 md:ml-4 md:mr-4 ml-2 mr-2 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search DAOs, Proposal Title..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-gray-700 border-none rounded-full pl-8 py-2 w-full"
            style={{ fontSize: "14px" }}
          />
        </div>

        <div className="relative">
          <select
            className="bg-transparent border border-gray-400 text-gray-200 rounded-md py-2 px-2"
            onChange={(e) => handleFilterChange(e.target.value)}
            value={filter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
      {filteredProposals.map((proposal) => (
        <div
          key={proposal.id}
          className={`bg-white rounded-lg shadow-lg ${
            proposal.status === "active" ? "border-green-500" : "border-red-500"
          } max-w-3xl mx-auto p-4 mb-4`}
        >
          <div className="border-b p-4">
            <Link
              href={`/proposal/${proposal.id}`}
              className="text-xl text-[#191970] font-semibold"
            >
              {proposal.title}
            </Link>
            <p className="text-gray-600 text-sm">
              <Link
                href={`https://sepolia.explorer.mode.network/address/${proposal.creatorAddress}`}
              >
                {proposal.creator}
              </Link>
            </p>
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
                onClick={() => {
                  if (proposal.status === "active") {
                    castVote(proposal.id, true);
                  }
                }}
                disabled={
                  !isConnected ||
                  loadingStates[proposal.id] ||
                  proposal.status !== "active"
                }
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
                onClick={() => {
                  if (proposal.status === "active") {
                    castVote(proposal.id, false);
                  }
                }}
                disabled={
                  !isConnected ||
                  loadingStates[proposal.id] ||
                  proposal.status !== "active"
                }
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
      {filteredProposals.length === 0 && (
        <div
          className="mx-auto p-4 mb-4 text-center text-gray-200"
          style={{ minHeight: "65vh" }}
        >
          No proposals found matching the search criteria.
        </div>
      )}
    </>
  );
};

export default CustomComponent;
