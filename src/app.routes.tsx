import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import EmployeeLayout from './layouts/EmployeeLayout'
import { Authentication, authRoutes } from './modules/auth'
import NotFoundPage from './pages/NotFoundPage'
import PermissionDeniedPage from './pages/PermissionDeniedPage'
import { projectRoutes } from './modules/projects/routes'

const AppRoutes = createBrowserRouter([
  {
    path: '',
    element: (
      <Authentication>
        <EmployeeLayout />
      </Authentication>
    ),
    children: [{ path: 'project-management', children: [projectRoutes] }]
  },
  {
    path: '*',
    element: <DefaultLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />
      },
      {
        path: '401',
        element: <PermissionDeniedPage />
      }
    ]
  },
  authRoutes
])

export default AppRoutes
