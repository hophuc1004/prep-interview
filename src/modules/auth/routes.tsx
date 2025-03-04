import { RouteObject } from 'react-router-dom'
import SignInPage from './containers/SignInPage'
import AuthLayout from '~/layouts/AuthLayout'
import Authentication from '~/modules/auth/Authentication'

export const authRoutes: RouteObject = {
  path: '',
  element: (
    <Authentication>
      <AuthLayout />
    </Authentication>
  ),
  children: [{ path: 'sign-in', element: <SignInPage /> }]
}
