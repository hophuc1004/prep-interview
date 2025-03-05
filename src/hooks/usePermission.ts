import { useLayoutEffect } from 'react'
import useCurrentUser from './useCurrentUser'
import { cloneDeep, get, isEmpty } from 'lodash'
import { includePermission } from '~/shared/utils/util'
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

    // const matchesClone = cloneDeep(matches)
    // const lastMatch = matchesClone.pop()

    // const needPermission = get(lastMatch.handle, 'permissions', permissions || [])
    // if (!isEmpty(currentPermission) && needPermission?.length > 0) {
    //   const isHavePermission = includePermission(currentPermission, needPermission)

    //   if (!isHavePermission) {
    //     navigate('/project-management', { replace: true })
    //     return
    //   }
    // }

    return () => {}
  }, [currentPermission, permissions, matches])
}

export default usePermission
