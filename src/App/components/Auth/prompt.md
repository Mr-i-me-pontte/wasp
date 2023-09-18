# metamask_helpers.js

```javascript

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


```

# AuthProvider.js
```javascript
import React from "react";
import {Auth} from "aws-amplify";
import AwsConfig from "../../../aws-exports.js";

Auth.configure(AwsConfig);

const getCurrentUserSessionInfo = async () => {
    const session = await Auth.currentSession();

    const {attributes} = await Auth.currentUserInfo();

    const {payload} = session.getIdToken();

    const tokenId = session.getIdToken().getJwtToken();

    // ApiConfig.setAuthorization(tokenId);

    if (session)
        return {...attributes, cognitoGroups: payload["cognito:groups"]};

    throw new Error("Session is not found");
};


export const AuthProvider = ({AuthContext, children}) => {
    let [user, setUser] = React.useState({
        username: "",
        password: "",
        isAuthenticated: false
    });

    const [error, setError] = React.useState(null);

    const signup = async (userInfo, callback) => {
        const {email: username, password, organizationId, memberId} = userInfo;
        try {
            const {user} = await Auth.signUp({
                username,
                password,
                attributes: {
                    "custom:organizationId": organizationId,
                    "custom:memberId": memberId
                }
            });

            setUser({...user, isAuthenticated: false});

            callback();
        } catch (error) {
            console.log("error signing up:", error);
        }
    };

    let signin = async (newUser, callback) => {
        const {email: username, password} = newUser;

        try {
            const user = await Auth.signIn(username, password);

            if (!user) new Error();

            const userSession = await getCurrentUserSessionInfo();

            setUser({...userSession, isAuthenticated: true});

            callback(userSession);
        } catch (error) {
            setError({type: "signin", code: error.code});
            console.log("error signing in", {error});
        }
    };

    let signout = async (callback) => {
        try {
            await Auth.signOut();
            setUser({isAuthenticated: false});
            callback();
        } catch (error) {
            setError({type: "signout", code: error.code});
            console.log("error signing out", {error});
        }
    };

    let confirmSignup = async (userInfo, callback) => {
        const {username, code} = userInfo;
        const confirm = await Auth.confirmSignUp(username, code);
        callback();
        return confirm;
    };

    let resendCode = (userInfo, callback) => {
        const {username} = userInfo;
        const resend = Auth.resendSignUp(username);
        callback();
        return resend;
    };

    const getCurrentSession = async () => {
        const userSession = await getCurrentUserSessionInfo();
        setUser({...userSession, isAuthenticated: true});
    };

    let value = {
        user,
        error,
        signin,
        signout,
        signup,
        confirmSignup,
        resendCode,
        getCurrentSession
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

```
