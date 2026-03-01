"use client"
import React, { ReactNode } from 'react'
import { MetaMaskProvider } from '@metamask/sdk-react'

const MetaMask = ({ children }: { children: ReactNode }) => {

  const host =
  typeof window !== "undefined" ? window.location.host : "defaultHost";

const sdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false,
  dappMetadata: {
    name: "Next-Metamask-Boilerplate",
    url: host, // using the host constant defined above
  },
};
  return (
    <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
        {children}
      </MetaMaskProvider>


  )
}

export default MetaMask