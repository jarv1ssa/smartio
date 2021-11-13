import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/color-mode";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
