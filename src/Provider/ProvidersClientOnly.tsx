'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { arcTestnet as wagmiArcTestnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient();

const arcTestnet = {
  ...wagmiArcTestnet,
  rpcUrls: {
    default: { http: ['https://arc-testnet.g.alchemy.com/v2/74gt1L_XsQyauh_orPvGtWC6fqJXfxVE'] },
    public: { http: ['https://rpc.quicknode.testnet.arc.network'] },
  },
};

const wagmiConfig = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [arcTestnet],
  ssr: false,
});

export function ProvidersClientOnly({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ToastContainer />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
