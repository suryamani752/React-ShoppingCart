import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ShoppingCartProvider from "./context/index.jsx";
import "remixicon/fonts/remixicon.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </BrowserRouter>
);
