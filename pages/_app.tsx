import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { useEffect } from "react";
import { config } from "../config/config";
import {
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { switchChain, getAccount } from "@wagmi/core";
import { modeTestnet } from "viem/chains";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const switchToChain = async () => {
      await switchChain(config, { chainId: modeTestnet.id });
    };

    const account = getAccount(config);
    const chainId = account.chainId;
    if (chainId !== modeTestnet.id) {
      switchToChain();
    }
  }, []); 

  const client = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme(),
          }}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
