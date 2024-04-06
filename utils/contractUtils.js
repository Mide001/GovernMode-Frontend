import { useWriteContract } from "wagmi";
import { EncryptenContractAddress, EncryptenAbi } from "../constant";

export const voteOnProposal = async (proposalId, isUpvote) => {

  const { data: hash, isPending, writeContract } = useWriteContract() 

  const tx = await useWriteContract({
    address: EncryptenContractAddress,
    abi: EncryptenAbi,
    functionName: "vote",
    args: [proposalId, isUpvote],
  });

  await tx.wait(); // Wait for transaction to be mined
};
