import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthProvider as OauthProvider } from "./provider/AuthProvider";
import { AuthContext, useAuth } from "./provider/useAuth";

const AuthProvider = ({ children }) => (
  <OauthProvider AuthContext={AuthContext}>{children}</OauthProvider>
);

const RequireAuth = ({ authGroup = null, children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user.isAuthenticated)
    return <Navigate to="/login" state={{ from: location }} />;

  if (!!authGroup) {
    if (auth?.user?.cognitoGroups?.includes(authGroup)) {
      return children;
    } else {
      return <Navigate to="/" state={{ from: location }} />;
    }
  }

  return children;
};

export { AuthContext, useAuth } from "./provider/useAuth";
export {
  AuthProvider,
  RequireAuth
};
