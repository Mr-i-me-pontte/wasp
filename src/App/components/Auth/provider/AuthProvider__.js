import React from "react";
import {Auth} from "aws-amplify";
import AwsConfig from "../../../../aws-exports.js";

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
