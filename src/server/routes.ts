/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect users to DEFAULT_LOGIN_REDIRECT_URL
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register"
]

export const apiAuthPrefix = "/api/auth"


/**
 * The default redirect path afrer loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/company/dashboard"