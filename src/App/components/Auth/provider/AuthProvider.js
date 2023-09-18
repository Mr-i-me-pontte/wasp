import React, {useState} from "react";
import {Auth} from "aws-amplify";
import AwsConfig from "../../../../aws-exports.js";
import {connectMetaMask, hasMetaMask, signMessage} from "./metamask_helpers";

Auth.configure(AwsConfig);

const getCurrentUserSessionInfo = async () => {
    const session = await Auth.currentSession();
    const {attributes} = await Auth.currentUserInfo();
    const {payload} = session.getIdToken();

    if (!session) {
        throw new Error("Session is not found");
    }

    return {...attributes, cognitoGroups: payload["cognito:groups"]};
};

const handleSignup = async (userInfo, setUser) => {
    const {email: username, password, organizationId, memberId} = userInfo;
    const {user} = await Auth.signUp({
        username,
        password,
        attributes: {
            "custom:organizationId": organizationId,
            "custom:memberId": memberId,
        },
    });
    setUser({...user, isAuthenticated: false});
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
    setUser({...userSession, isAuthenticated: true});
    callback();
};

export const AuthProvider = ({AuthContext, children}) => {
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
        const {email: username, password} = newUser;

        if (hasMetaMask()) {
            try {
                await handleMetaMaskSignin(username);
            } catch (error) {
                setError({type: "signin", code: error.code});
                console.log("error signing in with MetaMask", {error});
                return;
            }
        }

        try {
            await handleDefaultSignin(username, password, setUser, callback);
        } catch (error) {
            setError({type: "signin", code: error.code});
            console.log("error signing in", {error});
        }
    };

    const signout = async (callback) => {
        try {
            await Auth.signOut();
            setUser({isAuthenticated: false});
            callback();
        } catch (error) {
            setError({type: "signout", code: error.code});
            console.log("error signing out", {error});
        }
    };

    const confirmSignup = async (userInfo, callback) => {
        const {username, code} = userInfo;
        const confirm = await Auth.confirmSignUp(username, code);
        callback();
        return confirm;
    };

    const resendCode = async (userInfo, callback) => {
        const {username} = userInfo;
        try {
            const resend = await Auth.resendSignUp(username);
            callback();
            return resend;
        } catch (error) {
            console.log("error resending code", {error});
        }
    };

    const getCurrentSession = async () => {
        try {
            const userSession = await getCurrentUserSessionInfo();
            setUser({...userSession, isAuthenticated: true});
        } catch (error) {
            console.log("error getting current session", {error});
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
