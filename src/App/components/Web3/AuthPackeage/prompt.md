# metamask_helpers

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

# provider.js
```javascript
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import AwsConfig from "../../../aws-exports.js";
import { connectMetaMask, hasMetaMask, signMessage } from "./metamask_helpers";

Auth.configure(AwsConfig);

const getCurrentUserSessionInfo = async () => {
  const session = await Auth.currentSession();
  const { attributes } = await Auth.currentUserInfo();
  const { payload } = session.getIdToken();

  if (!session) {
    throw new Error("Session is not found");
  }

  return { ...attributes, cognitoGroups: payload["cognito:groups"] };
};

const handleSignup = async (userInfo, setUser) => {
  const { email: username, password, organizationId, memberId } = userInfo;
  const { user } = await Auth.signUp({
    username,
    password,
    attributes: {
      "custom:organizationId": organizationId,
      "custom:memberId": memberId,
    },
  });
  setUser({ ...user, isAuthenticated: false });
};

const handleMetaMaskSignin = async (username) => {
  const account = await connectMetaMask();
  if (!account) {
    throw new Error("MetaMask connection failed.");
  }

  const message = `Please sign this message to authenticate with Cognito: ${username}`;
  const signedMessage = await signMessage(message);

  if (!signedMessage) {
    throw new Error("Failed to sign message.");
  }
};

const handleDefaultSignin = async (username, password, setUser, callback) => {
  const user = await Auth.signIn(username, password);
  if (!user) throw new Error();

  const userSession = await getCurrentUserSessionInfo();
  setUser({ ...userSession, isAuthenticated: true });
  callback();
};

export const AuthProvider = ({ AuthContext, children }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    isAuthenticated: false,
  });

  const [error, setError] = useState(null);

  const signup = async (userInfo, callback) => {
    try {
      await handleSignup(userInfo, setUser);
      callback();
    } catch (error) {
      console.log("error signing up:", error);
    }
  };

  const signin = async (newUser, callback) => {
    const { email: username, password } = newUser;

    if (hasMetaMask()) {
      try {
        await handleMetaMaskSignin(username);
      } catch (error) {
        setError({ type: "signin", code: error.code });
        console.log("error signing in with MetaMask", { error });
        return;
      }
    }

    try {
      await handleDefaultSignin(username, password, setUser, callback);
    } catch (error) {
      setError({ type: "signin", code: error.code });
      console.log("error signing in", { error });
    }
  };

  const signout = async (callback) => {
    try {
      await Auth.signOut();
      setUser({ isAuthenticated: false });
      callback();
    } catch (error) {
      setError({ type: "signout", code: error.code });
      console.log("error signing out", { error });
    }
  };

  const confirmSignup = async (userInfo, callback) => {
    const { username, code } = userInfo;
    const confirm = await Auth.confirmSignUp(username, code);
    callback();
    return confirm;
  };

  const resendCode = async (userInfo, callback) => {
    const { username } = userInfo;
    try {
      const resend = await Auth.resendSignUp(username);
      callback();
      return resend;
    } catch (error) {
      console.log("error resending code", { error });
    }
  };

  const getCurrentSession = async () => {
    try {
      const userSession = await getCurrentUserSessionInfo();
      setUser({ ...userSession, isAuthenticated: true });
    } catch (error) {
      console.log("error getting current session", { error });
    }
  };

  const value = {
    user,
    error,
    signin,
    signout,
    signup,
    confirmSignup,
    resendCode,
    getCurrentSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

```
