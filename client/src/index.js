import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const GOOGLE_CLIENT_ID = "108280594432-omqmp01tkniis47snett8h6ncajf3fsq.apps.googleusercontent.com";
const SERVER_URL = "http://localhost:8000/api";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = SERVER_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </GoogleOAuthProvider>
);
