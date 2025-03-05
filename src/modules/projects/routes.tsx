import { RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const ProjectManagement = lazy(() => import('./containers/ProjectManagement'))

export const projectRoutes: RouteObject = {
  path: '*',
  index: true,
  element: (
    <Suspense>
      <ProjectManagement />
    </Suspense>
  ),
  handle: {
    title: 'Project Management',
    permissions: [
      // PERMISSIONS.MANAGE_LIST_EMPLOYEE
    ]
  }
}
