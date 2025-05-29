import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AudioDictorProvider } from "./shared/utils/my/AudioDictor";

import "./index.css";
import MainContextProvider from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainContextProvider>
      <AudioDictorProvider>
        <Router>
          <App />
        </Router>
      </AudioDictorProvider>
    </MainContextProvider>
  </React.StrictMode>
);
