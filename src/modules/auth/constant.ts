import { AuthMessageKey } from './hooks/useAuthMessages'

export const END_POINT = {
  currentUser: 'v1/me',
  validateEmail: 'v1/validate-email',
  forgotPassword: 'v1/forgot-password',
  login: 'v1/login'
}

export const msalConfig = {
  auth: {
    clientId: 'efb9bb42-aa93-4121-9aa1-22275e781c1c',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: '/'
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  }
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ['User.Read']
}

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me' //e.g. https://graph.microsoft.com/v1.0/me
}

export interface SignInFormState {
  email?: string
  password?: string
  error?: boolean
  helperText?: string
  showPasswordField?: boolean
  showChangeEmailModal?: boolean
  isFirstLogin?: boolean
  errorType?: AuthMessageKey | null
  isLoading?: boolean
}

export const COUNTDOWN_DURATION = 59
