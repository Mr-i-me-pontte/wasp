import { useEffect, useState } from "react";
import { ethers } from "ethers";
import contract from "../../../../contracts/MyNFT.json";

const tokenUri = "ipfs://QmX7fyvKynT2cbaq81AbkvFad9gYcef3ecNRpACPQU1H9Z";
const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const contractABI = contract.abi;

const hasMetaMask = () => typeof window.ethereum !== 'undefined';

const getCurrentAccount = async (signer) => {
    if (!signer) {
        return null;
    }
    return await signer.getAddress();
};

const connectMetaMask = async () => {
    if (!hasMetaMask()) {
        throw new Error('MetaMask not detected.');
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        return signer;
    } catch (error) {
        throw new Error('Error connecting to MetaMask. Please make sure it\'s properly set up.');
    }
};

const initializeMetaMask = async () => {
    if (!window.ethereum) {
        throw new Error('MetaMask not found. Please install MetaMask to continue.');
    }

    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = ethereumProvider.getSigner();
        const account = await getCurrentAccount(signer);

        return {
            provider: ethereumProvider,
            signer,
            account,
        };
    } catch (error) {
        throw new Error('Error connecting to MetaMask. Please make sure it\'s properly set up.');
    }
};

export const useEthereumAndBlockchain = () => {
    const [state, setState] = useState({
        provider: null,
        signer: null,
        account: null,
        balance: null,
        network: null,
        loading: false,
        error: null,
    });

    useEffect(() => {
        const initializeAndFetchAccountInfo = async () => {
            try {
                const { provider, signer, account } = await initializeMetaMask();
                setState((prevState) => ({
                    ...prevState,
                    provider,
                    signer,
                    account,
                    error: null,
                }));
            } catch (error) {
                setState((prevState) => ({
                    ...prevState,
                    error: error.message,
                }));
            }
        };

        initializeAndFetchAccountInfo();
    }, []);

    useEffect(() => {
        const fetchAccountInfo = async () => {
            if (!state.signer) {
                setState((prevState) => ({
                    ...prevState,
                    error: "Please connect with MetaMask to fetch account information.",
                }));
                return;
            }

            try {
                const [balance, network] = await Promise.all([
                    state.signer.getBalance(),
                    state.signer.provider.getNetwork(),
                ]);

                setState((prevState) => ({
                    ...prevState,
                    balance: ethers.utils.formatEther(balance),
                    network: network.name,
                }));
            } catch (error) {
                setState((prevState) => ({
                    ...prevState,
                    error: "Error fetching account information. Please try again.",
                }));
            }
        };

        fetchAccountInfo();
    }, [state.signer]);

    const clearError = () => {
        setState((prevState) => ({ ...prevState, error: null }));
    };

    const mintNFT = async () => {
        if (!state.signer) {
            setState((prevState) => ({
                ...prevState,
                error: "Please connect with MetaMask to mint NFT.",
            }));
            return;
        }

        setState((prevState) => ({ ...prevState, loading: true, error: null }));

        try {
            const account = await getCurrentAccount(state.signer);
            const myNFT = new ethers.Contract(contractAddress, contractABI, state.signer);
            const tokenId = await myNFT.mintNFT(account, tokenUri);

            // Check if tokenId is a BigNumber and convert it to a regular number
            const tokenIdNumber = tokenId.toNumber();
            console.log({ tokenIdNumber });

            return tokenIdNumber;
        } catch (error) {
            console.error(error);
            setState((prevState) => ({ ...prevState, error: error.message }));
        } finally {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
    };

    const signMessage = async () => {
        if (!state.signer) {
            setState((prevState) => ({
                ...prevState,
                error: "Please connect with MetaMask to sign the message.",
            }));
            return;
        }

        setState((prevState) => ({ ...prevState, loading: true, error: null }));

        try {
            const message = "Hello, signing a message using MetaMask!";
            const signature = await state.signer.signMessage(message);
            return signature;
        } catch (error) {
            console.error(error);
            setState((prevState) => ({ ...prevState, error: error.message }));
        } finally {
            setState((prevState) => ({ ...prevState, loading: false }));
        }
    };

    const isMetaMaskAvailable = () => Boolean(window.ethereum);

    return {
        ...state,
        clearError,
        mintNFT,
        signMessage,
        isMetaMaskAvailable,
    };
};

