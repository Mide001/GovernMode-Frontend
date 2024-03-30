import { useWriteContract, UseWriteContractParameters } from "wagmi";
import { EncryptenContractAddress, EncryptenAbi } from "../constant";

export const voteOnProposal = async (proposalId, isUpvote) => {
  const tx = await useWriteContract({
    address: EncryptenContractAddress,
    abi: EncryptenAbi,
    functionName: "vote",
    args: [proposalId, isUpvote],
  });

  await tx.wait(); // Wait for transaction to be mined
};
