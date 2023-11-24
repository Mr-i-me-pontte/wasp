import React, { useState, useEffect } from "react";
import contract from "../../../../../contracts/MyNFT.json";
import { ethers } from "ethers";

const tokenUri = "ipfs://QmX7fyvKynT2cbaq81AbkvFad9gYcef3ecNRpACPQU1H9Z";
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contractABI = contract.abi;

const useEthereum = () => {
    if (!window.ethereum) {
        throw new Error("MetaMask not found. Please install MetaMask to continue.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { provider, signer };
};

const fetchAccountInfo = async (signer) => {
    const accounts = await signer.provider.listAccounts();
    const balance = await signer.getBalance();
    const network = await signer.provider.getNetwork();
    const accountData = {
        address: accounts[0],
        balance: ethers.utils.formatEther(balance),
        network: network.name,
    };
    return accountData;
};

const PageComponent = () => {
    const [tokenId, setTokenId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [signedMessage, setSignedMessage] = useState(null);
    const [accountInfo, setAccountInfo] = useState(null);
    const { provider, signer } = useEthereum();

    const handleBlockchainOperation = async (operation) => {
        setLoading(true);
        try {
            const result = await operation();
            return result;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleMintNFT = () => handleBlockchainOperation(async () => {
        const accounts = await signer.provider.listAccounts();
        const myNFT = new ethers.Contract(contractAddress, contractABI, signer);
        const tokenId = await myNFT.mintNFT(accounts[0], tokenUri);
        setTokenId(tokenId.toNumber());
    });

    const handleSignMessage = () => handleBlockchainOperation(async () => {
        const message = "Hello, signing a message using MetaMask!";
        const signature = await signer.signMessage(message);
        setSignedMessage(signature);
    });

    useEffect(() => {
        const fetchInfo = async () => {
            const accountData = await fetchAccountInfo(signer);
            setAccountInfo(accountData);
        };
        fetchInfo();
    }, [signer]);

    return (
        <div>
            <h2>Mint NFT Component</h2>
            <button onClick={handleMintNFT} disabled={loading}>
                Mint NFT
            </button>
            <button onClick={handleSignMessage} disabled={loading}>
                Sign Message
            </button>
            {loading && <p>Loading...</p>}
            {tokenId && <p>Minted NFT with tokenId: {tokenId}</p>}
            {signedMessage && (
                <div>
                    <p>Signed Message:</p>
                    <pre>{signedMessage}</pre>
                </div>
            )}
            <div>
                <h3>Account Information</h3>
                {accountInfo ? (
                    <div>
                        <p>Connected Account: {accountInfo.address}</p>
                        <p>Account Balance: {accountInfo.balance} ETH</p>
                        <p>Network: {accountInfo.network}</p>
                    </div>
                ) : (
                    <p>No account connected.</p>
                )}
            </div>
        </div>
    );
};

export default PageComponent;
