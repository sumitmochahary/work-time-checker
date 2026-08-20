import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Checkout from "./Checkout";
import "../styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Checkout />
  </StrictMode>,
);
