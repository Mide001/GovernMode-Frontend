import { createConfig, http } from '@wagmi/core';
import { modeTestnet } from 'viem/chains';

export const config  = createConfig({
    chains: [modeTestnet],
    transports: {
        [modeTestnet.id]: http('https://sepolia.mode.network/')
    },
})