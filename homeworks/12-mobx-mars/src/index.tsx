import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { AppErrorBoundary } from "./AppErrorBoundary";
import { StoreProvider } from "./app/store";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AppErrorBoundary>
        <StoreProvider>
          <App />
        </StoreProvider>
      </AppErrorBoundary>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
