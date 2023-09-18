import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const hasMetaMask = () => {
    return typeof window.ethereum !== 'undefined';
};

const getCurrentAccount = async () => {
    if (!hasMetaMask()) {
        return null;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return await signer.getAddress();
};

const connectMetaMask = async () => {
    if (!hasMetaMask()) {
        console.error('MetaMask not detected.');
        return null;
    }

    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        return await signer.getAddress();
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        return null;
    }
};

const withMetaMask = (WrappedComponent) => {
    return (props) => {
        const [currentAccount, setCurrentAccount] = useState(null);
        const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

        useEffect(() => {
            if (hasMetaMask()) {
                getCurrentAccount().then((account) => {
                    if (account) {
                        setCurrentAccount(account);
                        setIsMetaMaskConnected(true);
                    }
                });

                window.ethereum.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        setCurrentAccount(accounts[0]);
                        setIsMetaMaskConnected(true);
                    } else {
                        setCurrentAccount(null);
                        setIsMetaMaskConnected(false);
                    }
                });
            }
        }, []);

        const connectToMetaMask = async () => {
            const account = await connectMetaMask();
            if (account) {
                setCurrentAccount(account);
                setIsMetaMaskConnected(true);
            }
        };

        return (
            <WrappedComponent
                {...props}
                currentAccount={currentAccount}
                isMetaMaskConnected={isMetaMaskConnected}
                connectToMetaMask={connectToMetaMask}
            />
        );
    };
};

export default withMetaMask;
