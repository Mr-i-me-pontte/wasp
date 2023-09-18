import React from 'react';
import {Route, Routes} from "react-router-dom";
import routes from "./routes";
import "@aws-amplify/ui-react/styles.css";

import {AuthProvider as OauthProvider} from "./components/Auth/provider/AuthProvider";
import {AuthContext} from "./components/Auth";
import './style.scss';
import {withAuthenticator} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import Layout from "./components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";


const AuthProvider = ({children}) => (<OauthProvider AuthContext={AuthContext}>{children}</OauthProvider>);

const App = () => (<AuthProvider>

        <Routes>
            <Route element={<Layout/>}>
                {routes.map(({path, element, isPrivate = false, authGroup}) => (<Route
                    key={path}
                    path={path}
                    element={element}
                />))}
                {/*<Route path="/" element={<Navigate to="/"/>}/>*/}
                {/*<Route path="*" element={<Navigate to="/not-found"/>}/>*/}
            </Route>
        </Routes>
    </AuthProvider>

);

export default withAuthenticator(App);
// export default App;
