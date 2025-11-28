import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerWebVitals } from "./lib/web-vitals";

createRoot(document.getElementById("root")!).render(<App />);

// Register Web Vitals monitoring
registerWebVitals();
