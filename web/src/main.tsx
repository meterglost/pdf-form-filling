const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Root element not found. Please check your HTML file.");

import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(rootElement);

import "./main.css";

import App from "@components/App";

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
