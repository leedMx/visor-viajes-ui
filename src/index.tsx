import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { getCurrentUserKey, initKeycloak } from "./config/keycloak";
import { localStorageStore } from "react-admin";

async function bootstrap() {
  try {
    await initKeycloak();

    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element #root not found");
    }

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App store={localStorageStore("1", `-${getCurrentUserKey()}`)} />
      </React.StrictMode>,
    );
  } catch (err) {
    console.error("Failed to initialize Keycloak", err);
    // here you could render a fallback error UI if you want
  }
}

bootstrap();
