import { RouteObject } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import ProjectDetail from './containers/ProjectDetail'

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

export const projectDetailRoutes: RouteObject = {
  path: ':projectId',
  index: true,

  element: <ProjectDetail />,
  handle: {
    parent: '/project-management',
    title: 'Project Detail',
    permissions: [
      // PERMISSIONS.MANAGE_LIST_EMPLOYEE
    ]
  }
}
