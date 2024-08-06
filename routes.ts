/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /setting page.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * Prefix for the API Authentication routes.
 * The Routes starting with this prefix will be only for authenticating mechanisms.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default path where the user will be redirected after a successful login.
 * @type {string}
 */
export const AUTHENTICATED_USER_REDIRECT = "/home";

/**
 * Default path for performing user login.
 * @type {string}
 */
export const DEFAULT_LOGIN = "/auth/login";
