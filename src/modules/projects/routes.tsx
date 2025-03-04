import { RouteObject } from 'react-router-dom'
import ProjectManagement from './containers/ProjectManagement'

export const projectRoutes: RouteObject = {
  path: '*',
  index: true,
  element: <ProjectManagement />,
  handle: {
    title: 'Project Management',
    permissions: [
      // PERMISSIONS.MANAGE_LIST_EMPLOYEE
    ]
  }
}
