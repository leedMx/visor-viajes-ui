// authProvider.ts
import type { AuthProvider, UserIdentity } from "react-admin";
import { keycloak, getFreshToken, kcLogout } from "./keycloak";

export const authProvider: AuthProvider = {
  /**
   * We usually don't rely on this because initKeycloak()
   * already enforces login (onLoad: "login-required").
   * Still, implement it so RA's <Login> page works if used.
   */
  async login() {
    await keycloak.login();
    return Promise.resolve();
  },

  async logout() {
    await kcLogout();
    return Promise.resolve();
  },

  /**
   * Called by RA on navigation / when it needs to ensure user is still auth'd.
   * If token refresh fails, we reject -> RA will redirect to login page.
   */
  async checkAuth() {
    try {
      await getFreshToken();
      return Promise.resolve();
    } catch {
      return Promise.reject();
    }
  },

  /**
   * Called when a dataProvider call throws.
   * On 401/403 we try to refresh the token; if that fails, we reject so RA logs out.
   */
  async checkError(error) {
    const status =
      (error as any)?.status ??
      (error as any)?.response?.status ??
      (error as any)?.body?.status;

    if (status === 401 || status === 403) {
      try {
        await getFreshToken();
        return Promise.resolve();
      } catch {
        return Promise.reject();
      }
    }

    return Promise.resolve();
  },

  /**
   * Permissions (roles/scopes). For now, we don't use them in RA.
   * You can later parse keycloak.tokenParsed.realm_access.roles etc.
   */
  async getPermissions() {
    return keycloak.tokenParsed?.resource_access?.["tracasa-ra"]?.roles ?? [];
  },

  /**
   * Identity shown in the user menu, etc.
   * Taken from the ID token (OpenID Connect).
   */
  async getIdentity(): Promise<UserIdentity> {
    const idToken: any = keycloak.idTokenParsed || {};

    const id = idToken.sub || "me";
    const fullName = idToken.name || idToken.preferred_username || "User";
    const avatar = idToken.picture;

    return { id, fullName, avatar };
  },

  async canAccess({ action, resource }): Promise<boolean> {
    const roles:string[] = keycloak.tokenParsed?.resource_access?.["tracasa-ra"]?.roles ?? [];
    if (action == "list" || action == "show") action = "READ"
    if (action == "edit") action = "UPDATE";
    const roleName = `${resource}_${action}`.toUpperCase();
    return roles.includes(roleName);
  },
};
