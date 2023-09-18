// src/components/MintNFTComponent.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import contract from '../../../../../contracts/MyNFT.json'

const MintNFTComponent = () => {
    const [tokenId, setTokenId] = useState(null);

    const handleMintNFT = async () => {
        try {
            // Step 1: Create an Alchemy Provider using ethers
            const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.alchemyapi.io/v2/your-alchemy-key');

            // Step 2: Grab your contract ABI
            const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
            const contractABI = contract.abi
            const signer = provider.getSigner();
            const myNFT = new ethers.Contract(contractAddress, contractABI, signer);

            // Step 3: Configure the metadata of your NFT using IPFS
            const tokenUri = 'ipfs://QmX7fyvKynT2cbaq81AbkvFad9gYcef3ecNRpACPQU1H9Z'; // Replace with the token URI for your NFT

            // Step 4: Call mintNFT function of the contract
            const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // Replace with the address where you want to mint the NFT
            const tokenId = await myNFT.mintNFT(recipient, tokenUri);
            setTokenId(tokenId.toNumber());
            console.log('Minted NFT with tokenId:', tokenId.toNumber());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Mint NFT Component</h2>
            <button onClick={handleMintNFT}>Mint NFT</button>
            {tokenId && <p>Minted NFT with tokenId: {tokenId}</p>}
        </div>
    );
};

export default MintNFTComponent;
