import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css"; // Import Tailwind CSS
import { Provider } from "react-redux";
import { store } from "./app/store";
import TransactionList from "./components/TransactionList";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        {/* <TransactionList /> */}
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
