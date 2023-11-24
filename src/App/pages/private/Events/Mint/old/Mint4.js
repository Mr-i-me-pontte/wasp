import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
    Container,
    Button,
    Box,
    Typography,
    CircularProgress,
    TextField,
    Paper,
} from "@material-ui/core";
import {contractABI, contractAddress, tokenUri} from "../constants";


const useEthereumAndBlockchain = () => {
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
        const initializeMetaMask = async () => {
            if (!window.ethereum) {
                setState((prevState) => ({
                    ...prevState,
                    error: "MetaMask not found. Please install MetaMask to continue.",
                }));
                return;
            }

            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const ethereumProvider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const ethereumSigner = ethereumProvider.getSigner();
                const accounts = await ethereumSigner.provider.listAccounts();

                setState((prevState) => ({
                    ...prevState,
                    provider: ethereumProvider,
                    signer: ethereumSigner,
                    account: accounts[0],
                    error: null,
                }));
            } catch (error) {
                setState((prevState) => ({
                    ...prevState,
                    error:
                        "Error connecting to MetaMask. Please make sure it's properly set up.",
                }));
            }
        };

        initializeMetaMask();
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
                const [accounts, balance, network] = await Promise.all([
                    state.signer.provider.listAccounts(),
                    state.signer.getBalance(),
                    state.signer.provider.getNetwork(),
                ]);

                setState((prevState) => ({
                    ...prevState,
                    account: accounts[0],
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
            const accounts = await state.signer.provider.listAccounts();
            const myNFT = new ethers.Contract(contractAddress, contractABI, state.signer);
            const tokenId = await myNFT.mintNFT(accounts[0], tokenUri);

            // Check if tokenId is a BigNumber and convert it to a regular number
            const tokenIdNumber = tokenId;
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

const PageComponent = () => {
    const ethereumAndBlockchain = useEthereumAndBlockchain();
    const [tokenId, setTokenId] = useState(null);
    const [signedMessage, setSignedMessage] = useState(null);

    const mintAndSetTokenId = async () => {
        const id = await ethereumAndBlockchain.mintNFT();
        setTokenId(id);
    };

    const signAndSetMessage = async () => {
        const message = await ethereumAndBlockchain.signMessage();
        setSignedMessage(message);
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h2" align="center" gutterBottom>
                Mint NFT Component
            </Typography>
            {ethereumAndBlockchain.error && (
                <Typography color="error">Error: {ethereumAndBlockchain.error}</Typography>
            )}
            {!ethereumAndBlockchain.account && ethereumAndBlockchain.isMetaMaskAvailable() && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={ethereumAndBlockchain.clearError}
                >
                    Connect with MetaMask
                </Button>
            )}
            <Box display="flex" justifyContent="space-between" marginTop="20px">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={mintAndSetTokenId}
                    disabled={!ethereumAndBlockchain.signer || ethereumAndBlockchain.loading}
                >
                    Mint NFT
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={signAndSetMessage}
                    disabled={!ethereumAndBlockchain.signer || ethereumAndBlockchain.loading}
                >
                    Sign Message
                </Button>
            </Box>
            {ethereumAndBlockchain.loading && <CircularProgress />}
            {tokenId && (
                <Typography variant="body1">Minted NFT with tokenId: {tokenId}</Typography>
            )}
            {signedMessage && (
                <Box marginTop="20px">
                    <Typography variant="body1">Signed Message:</Typography>
                    <TextField
                        multiline
                        fullWidth
                        variant="outlined"
                        value={signedMessage}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            )}
            {ethereumAndBlockchain.account && (
                <Paper style={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h5">Account Information</Typography>
                    <Box>
                        <Typography variant="body1">Connected Account: {ethereumAndBlockchain.account}</Typography>
                        <Typography variant="body1">Account Balance: {ethereumAndBlockchain.balance} ETH</Typography>
                        <Typography variant="body1">Network: {ethereumAndBlockchain.network}</Typography>
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default PageComponent;
