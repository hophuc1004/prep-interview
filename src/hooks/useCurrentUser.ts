import { useAuthContext } from '~/contexts/AuthContext'

function useCurrentUser() {
  const { user } = useAuthContext()

  const currentPermission = user?.userRoles?.role?.permission

  const currentRole = user?.role

  return {
    permissions: currentPermission ?? [],
    user,
    currentRole
  }
}

export default useCurrentUser
