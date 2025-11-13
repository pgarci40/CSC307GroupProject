import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";  // ✅ make sure this matches your intended main App file
import { AuthProvider } from "./context/authContext";  // ✅ wraps app in authentication context

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />   {/* ✅ This controls what your app starts with */}
    </AuthProvider>
  </React.StrictMode>
);