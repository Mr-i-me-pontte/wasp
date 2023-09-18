import React, { useEffect, useState } from 'react';
import {
    addMetamaskListeners,
    connectMetaMask,
    getCurrentAccount,
    hasMetaMask,
} from './helpers';

const withMetaMask = (WrappedComponent) => (props) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

    useEffect(() => {
        const handleAccountsChanged = async (newAccounts) => {
            if (newAccounts.length > 0) {
                setCurrentAccount(newAccounts[0]);
                setIsMetaMaskConnected(true);
            } else {
                setCurrentAccount(null);
                setIsMetaMaskConnected(false);
            }
        };

        if (hasMetaMask()) {
            const removeListeners = addMetamaskListeners(handleAccountsChanged, null, null);

            getCurrentAccount().then((account) => {
                if (account) {
                    setCurrentAccount(account);
                    setIsMetaMaskConnected(true);
                } else {
                    setCurrentAccount(null);
                    setIsMetaMaskConnected(false);
                }
            });

            return () => {
                removeListeners();
            };
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

export default withMetaMask;
