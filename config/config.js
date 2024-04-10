import { createConfig, http } from "@wagmi/core";
import { modeTestnet } from "viem/chains";

export const config = createConfig({
  appName: "GovernMode",
  projectId: "9a4b5a26abe0f8427056e21b695a2cf6",
  chains: [
    modeTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [modeTestnet]
      : []),
  ],
  ssr: true,
  chains: [modeTestnet],
  transports: {
    [modeTestnet.id]: http("https://sepolia.mode.network/"),
  },
});
