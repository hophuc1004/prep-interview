import { useAuthContext } from '~/contexts/AuthContext'

function useCurrentUser() {
  const { user } = useAuthContext()
  console.log('user:', user)

  const currentPermission = user?.userRoles?.role?.permission

  const currentRole = user?.role

  return {
    permissions: currentPermission ?? [],
    user,
    currentRole
  }
}

export default useCurrentUser
