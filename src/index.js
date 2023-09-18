import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import App from "./App/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { studioTheme } from "./ui-components";

import { Amplify, AuthModeStrategyType } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure({
    ...awsconfig,
    DataStore: {
        authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
    },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={studioTheme}>
              <App />
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
