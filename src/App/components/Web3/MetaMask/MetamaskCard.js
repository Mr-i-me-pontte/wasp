import React from 'react';
import { Card } from 'react-bootstrap';

const MetamaskCard = ({ accounts, isMetamaskConnected, networkId, chainId, activeWallet }) => {
    const { address, balance, transactionCount } = activeWallet;

    return (
        <Card>
            <Card.Header>Metamask Info</Card.Header>
            <Card.Body>
                <Card.Title>{isMetamaskConnected ? 'Connected' : 'Disconnected'}</Card.Title>
                <Card.Text>Wallet Address: {address}</Card.Text>
                <Card.Text>Wallet Balance: {balance}</Card.Text>
                <Card.Text>Transaction Count: {transactionCount}</Card.Text>
                <Card.Text>Network ID: {networkId}</Card.Text>
                <Card.Text>Chain ID: {chainId}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default MetamaskCard;
