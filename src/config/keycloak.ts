// keycloak.ts
import Keycloak, {
  KeycloakInitOptions,
  KeycloakConfig,
} from "keycloak-js";

// --- Keycloak instance configuration ---
const keycloakConfig: KeycloakConfig = {
  url: import.meta.env.VITE_KC_URL,
  realm: import.meta.env.VITE_KC_REALM,
  clientId: import.meta.env.VITE_KC_CLIENT_ID,
};

export const keycloak: Keycloak = new (Keycloak as any)(keycloakConfig);

// --- Initialization & background refresh ---

/**
 * Initialize Keycloak before mounting React-Admin.
 * Forces login (onLoad: "login-required") and sets up a simple refresh loop.
 */
export async function initKeycloak(): Promise<void> {
  const initOptions: KeycloakInitOptions = {
    onLoad: "login-required", // User must be logged in before app loads
    pkceMethod: "S256",
    checkLoginIframe: false,  // avoid extra iframe traffic / noise
  };

  const authenticated = await keycloak.init(initOptions);

  if (!authenticated) {
    // If for some reason init succeeded but user is not authenticated,
    // send them explicitly to the login page.
    await keycloak.login();
    return;
  }

  // Background refresh loop:
  const MIN_VALIDITY_SECONDS = 45;

  setInterval(async () => {
    try {
      // If token expires in less than MIN_VALIDITY_SECONDS, refresh it
      await keycloak.updateToken(MIN_VALIDITY_SECONDS);
      // No need to notify anyone: dataProvider always calls getCurrentToken()
    } catch (e) {
      // If refresh fails (e.g. session gone), force re-login
      try {
        await keycloak.login();
      } catch {
        // ignore – worst case the next request / checkAuth will also fail
      }
    }
  }, 30000); // every 30s
}

// --- Token + helpers used by authProvider / dataProvider ---

/**
 * Get the current access token.
 * Call this right before each HTTP call in the dataProvider.
 */
export function getCurrentToken(): string {
  if (!keycloak.token) {
    throw new Error("No access token available");
  }
  return keycloak.token;
}

/**
 * Ensure we have a fresh token (used by authProvider.checkAuth / checkError).
 * Will trigger Keycloak login if not authenticated.
 */
export async function getFreshToken(
  minValiditySeconds = 30
): Promise<string> {
  if (!keycloak.authenticated) {
    await keycloak.login();
  }

  await keycloak.updateToken(minValiditySeconds);

  if (!keycloak.token) {
    throw new Error("No access token after refresh");
  }

  return keycloak.token;
}

/**
 * Logout from Keycloak and redirect back to the app root.
 */
export function kcLogout(): Promise<void> {
  const redirectUri = window.location.origin;
  return keycloak.logout({ redirectUri });
}

export function getCurrentUserKey(): string {
  const parsed = keycloak.tokenParsed;

  if (!parsed) {
    throw new Error("No parsed token available");
  }

  const sub = parsed.sub;

  if (!sub || typeof sub !== "string") {
    throw new Error("No user sub found in token");
  }

  return sub;
}