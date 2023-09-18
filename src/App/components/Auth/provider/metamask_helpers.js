/**
 * Checks if the current browser has the MetaMask extension installed.
 * @returns {boolean} true if MetaMask is installed, false otherwise.
 */
export const hasMetaMask = () => {
    return typeof window.ethereum !== 'undefined';
};

/**
 * Returns the current MetaMask account if the user is connected to MetaMask.
 * @returns {string|null} the current MetaMask account, or null if not connected.
 */
export const getCurrentAccount = async () => {
    if (!hasMetaMask()) {
        return null;
    }

    const accounts = await window.ethereum.request({method: 'eth_accounts'});

    if (accounts.length === 0) {
        return null;
    }

    return accounts[0];
};

/**
 * Connects the user to MetaMask if not already connected.
 * @returns {string|null} the current MetaMask account, or null if not connected.
 */
export const connectMetaMask = async () => {
    if (!hasMetaMask()) {
        console.error('MetaMask not detected.');
        return null;
    }

    try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});

        if (accounts.length === 0) {
            console.error('MetaMask is not connected to any accounts.');
            return null;
        }

        return accounts[0];
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        return null;
    }
};

/**
 * Retrieves the user's MetaMask transaction history.
 * @param {string} address - the user's MetaMask wallet address.
 * @returns {object[]} an array of objects containing transaction details.
 */
export const getTransactionHistory = async (address) => {
    if (!hasMetaMask()) {
        return null;
    }

    try {
        const history = await window.ethereum.request({method: 'eth_getTransactionHistory', params: [address]});
        return history;
    } catch (error) {
        console.error('Error retrieving transaction history:', error);
        return null;
    }
};

/**
 * Adds event listeners for MetaMask account, chain, and network changes.
 * @param {function} handleAccountsChanged - the callback function to execute when the current MetaMask account changes.
 * @param {function} handleChainChanged - the callback function to execute when the current MetaMask chain changes.
 * @param {function} handleNetworkChanged - the callback function to execute when the current MetaMask network changes.
 * @returns {function} a function to remove the event listeners.
 */
export const addMetamaskListeners = (handleAccountsChanged, handleChainChanged, handleNetworkChanged) => {
    if (typeof window.ethereum !== 'undefined') {
        if (typeof handleAccountsChanged === 'function') {
            window.ethereum.on('accountsChanged', handleAccountsChanged);
        }
        if (typeof handleChainChanged === 'function') {
            window.ethereum.on('chainChanged', handleChainChanged);
        }
        if (typeof handleNetworkChanged === 'function') {
            window.ethereum.on('networkChanged', handleNetworkChanged);
        }

        return () => {
            if (typeof handleAccountsChanged === 'function') {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
            if (typeof handleChainChanged === 'function') {
                window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
            if (typeof handleNetworkChanged === 'function') {
                window.ethereum.removeListener('networkChanged', handleNetworkChanged);
            }
        };
    }
};

/**
 * Returns the shortened version of a given Ethereum address.
 * @param {string} address - the Ethereum address to be shortened.
 * @returns {string} the shortened version of the Ethereum address.
 */
export const getShortenedAddress = (address) => {
    if (!address) {
        return '';
    }
    const prefixLength = 6;
    const suffixLength = 4;
    const prefix = address.slice(0, prefixLength);
    const suffix = address.slice(-suffixLength);
    return `${prefix}...${suffix}`;
};

export const signMessage = async (message) => {
    if (!hasMetaMask()) {
        return null;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (accounts.length === 0) {
            console.error('MetaMask is not connected to any accounts.');
            return null;
        }

        const address = accounts[0];

        const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [message, address],
        });

        return signature;
    } catch (error) {
        console.error('Error signing message with MetaMask:', error);
        return null;
    }
};
