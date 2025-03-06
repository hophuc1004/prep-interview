import { TABLE_DATA_PROJECT, TABLE_USER_PROJECT, VALID_CREDENTIALS } from '~/shared/constants/project'

export const getProjectDetail = async ({ projectId, userId }: { projectId: string; userId: any }) => {
  if (!projectId) {
    return null
  }

  if (!userId) {
    return
  }

  const projectDetail = await TABLE_DATA_PROJECT.find((project) => project?.id === projectId)
  const userProject = await TABLE_USER_PROJECT.find(
    (userProject) => userProject?.projectId === projectId && userProject?.userId === userId
  )

  return {
    ...projectDetail,
    userId: userProject?.userId,
    userRole: userProject?.role
  }
}

export const getUserProject = (projectId: string) => {
  if (!projectId) {
    return []
  }

  const listUsers =
    TABLE_USER_PROJECT.filter((item) => item.projectId === projectId)?.map((user) => {
      const userVal = VALID_CREDENTIALS.find((cre) => Number(cre.id) === Number(user.userId))
      const userRoleProject = TABLE_USER_PROJECT.find((userRole) => userRole.userId === user?.userId)
      return {
        email: userVal.email,
        role: userRoleProject.role
      }
    }) || []

  return listUsers
}
