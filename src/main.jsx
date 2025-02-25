import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Base from "./Base.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Base />
  </StrictMode>,
);
