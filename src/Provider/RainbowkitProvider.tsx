"use client";

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  arcTestnet,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
  import { ToastContainer, toast } from 'react-toastify';

const queryClient = new QueryClient();

  const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [arcTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


export function RainbowKitWrapper({ children }: { children: React.ReactNode }) {
  return (
      <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ToastContainer />

        {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}