import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contract from "../../../../contracts/MyNFT.json";
import {
    Container,
    Button,
    Box,
    Typography,
    CircularProgress,
    TextField,
    Paper,
} from "@material-ui/core";
import {useEthereumAndBlockchain} from "./hooks";


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
