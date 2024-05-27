import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { modeTestnet } from 'viem/chains';

// { projectId, walletConnectParameters, appName, appDescription, appUrl, appIcon, }:

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended Wallet',
      wallets: [rainbowWallet, walletConnectWallet, metaMaskWallet],
    },
  ],
  {
    projectId: "9a4b5a26abe0f8427056e21b695a2cf6",
    appName: "GovernMode",
    appDescription: "GovernMode - A Governance Application Deployed On Mode Blockchain",
    appUrl: "www.governmode.xyz",
    appIcon: "./favicon.ico"
  }
);

export const config = createConfig({
  connectors,
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

