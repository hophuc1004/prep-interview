import { useLayoutEffect } from 'react'
import useCurrentUser from './useCurrentUser'
import { useMatches, useNavigate } from 'react-router-dom'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'

const usePermission = (permissions?: number[]) => {
  const { permissions: currentPermission } = useCurrentUser()

  const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)

  const matches = useMatches()

  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!token) {
      navigate('/sign-in', { replace: true })
      return
    }

    return () => {}
  }, [currentPermission, permissions, matches])
}

export default usePermission
