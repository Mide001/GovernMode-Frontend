import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { EncryptenContractAddress, EncryptenAbi } from "../../constant";
import { useReadContract, useAccount } from "wagmi";
import LoadingSpinner from "../../components/LoadingSpinner";
import Link from "next/link";
import {
  ProfileIcon,
  StopwatchIcon,
  VoteIcon,
} from "../../assets/ConstantIcons";
import DaoNavbar from "../../components/DaoNavbar";
import FetchComment from "../../components/FetchComment";
import AddComment from "../../components/AddComment";

const ProposalDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isConnected } = useAccount();

  const { data, isLoading, error } = useReadContract({
    abi: EncryptenAbi,
    address: EncryptenContractAddress,
    functionName: "getProposalDetails",
    args: id,
  });

  const [remainingTime, setRemainingTime] = useState("");
  const [proposalStatus, setProposalStatus] = useState("");
  useEffect(() => {
    let interval; // Declare interval here

    if (data) {
      const calculateRemainingTime = () => {
        const endTime = new Date(Number(data[5]) * 1000);
        const now = new Date();
        const timeDifference = endTime - now;
        if (timeDifference > 0) {
          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          setRemainingTime(
            <p>
              <span style={{ fontSize: "1.5em" }}>{days}</span>
              <span style={{ fontSize: "0.8em" }}>days</span>{" "}
              <span style={{ fontSize: "1.5em" }}>{hours}</span>
              <span style={{ fontSize: "0.8em" }}>hours</span>{" "}
              <span style={{ fontSize: "1.5em" }}>{minutes}</span>
              <span style={{ fontSize: "0.8em" }}>minutes</span>{" "}
              <span style={{ fontSize: "1.5em" }}>{seconds}</span>
              <span style={{ fontSize: "0.8em" }}>seconds</span>
            </p>
          );
        } else {
          setRemainingTime("Proposal ended");
          setProposalStatus("inactive");
          clearInterval(interval); // Access interval here
        }
      };

      calculateRemainingTime();

      interval = setInterval(calculateRemainingTime, 1000); // Assign interval here
    }
  }, [data]);

  if (!isConnected) {
    return (
      <>
        <DaoNavbar />
        <div
          className="flex items-center justify-center"
          style={{ minHeight: "80vh" }}
        >
          <p className="text-gray-200">
            Please connect your wallet to view the proposal details.
          </p>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "80vh" }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error loading proposal</div>;
  }

  if (!data) {
    return <div>No proposal found</div>;
  }

  const proposal = {
    id: data[6], // id
    title: data[0], // title
    content: data[1], // content
    upVote: Number(data[2]), // forVotes
    downVote: Number(data[3]), // againstVotes
    startTime: new Date(Number(data[4]) * 1000).toLocaleString(), // startTime
    endTime: new Date(Number(data[5]) * 1000).toLocaleString(), // endTime
    status: proposalStatus, // status
    creator: `${data[7].slice(0, 4)}...${data[7].slice(-3)}`, // shortened creator address
    creatorAddress: data[7], // creator address
  };

  return (
    <>
      <DaoNavbar />
      <div className="max-w-3xl mx-auto p-4">
        <div className="p-4 mb-4">
          <div className="border-b p-4">
            <h1 className="text-2xl font-bold uppercase">
              #{id} - {proposal.title}
            </h1>

            <p className="text-white flex items-center mt-6">
              <ProfileIcon className="w-1 h-1" />
              <Link
                href={`https://sepolia.explorer.mode.network/address/${proposal.creatorAddress}`}
                className="flex items-center font-bold ml-2"
              >
                {proposal.creator}
              </Link>
            </p>
          </div>
          <div className="p-4">
            <p className="text-gray-300 text-lg">{proposal.content}</p>
          </div>

          <div className="border-b p-4 grid grid-cols-2 gap-4">
            <div>
              <p className="flex items-center mt-6">
                <StopwatchIcon className="w-6 h-6" />
                <span className="text-gray-300 text-sm ml-2">
                  DEADLINE TO SUBMIT
                </span>
              </p>
              <p className="text-gray-300 font-semibold mt-2">
                {remainingTime}
              </p>
            </div>
            <div className="border-l mt-3">
              <p className="flex items-center mt-3 ml-4">
                <VoteIcon className="w-6 h-6" />
                <span className="text-gray-300 text-sm ml-2">VOTES</span>
              </p>
              <p className="text-gray-300 text-sm ml-4 mt-2">
                <span className="font-semibold">Upvote:</span> {proposal.upVote}
              </p>
              <p className="text-gray-300 text-sm ml-4">
                <span className="font-semibold">Downvote:</span>{" "}
                {proposal.downVote}
              </p>
            </div>
            <span className="mt-4"></span>
          </div>
          <div className="mt-4">
            <div className="mt-4">
              <p className="text-2xl font-bold">Comment</p>
              <FetchComment />
            </div>
            <div>
              <AddComment />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProposalDetails;
