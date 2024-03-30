import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mode, modeTestnet } from "wagmi/chains";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";

const config = getDefaultConfig({
  appName: "GovernMode",
  projectId: "9a4b5a26abe0f8427056e21b695a2cf6",
  chains: [
    mode,
    modeTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [modeTestnet]
      : []),
  ],
  ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
