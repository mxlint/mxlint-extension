import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <h1>MxLint pane</h1>
        <p>Hello from an extension!</p>
    </StrictMode>
);
