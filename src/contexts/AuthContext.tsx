/* eslint-disable react-refresh/only-export-components */
import { Alert } from 'components/Alert'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ROLE_USER } from '~/dataExample'
import { findOneRoleUserById, findOneUserByEmail, getAllProjects, getAllProjectsByUserId } from '~/dbIndexedDB'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { UserInfo } from '~/shared/types/user-info'

interface IAuthState {
  isAuthentication: boolean
  user: any
  token: string
  isLoading: boolean
  setUser?: (user: any) => void
  setToken?: (token: string) => void
  resetAuthState?: () => void
}

const initialState: IAuthState = {
  isAuthentication: false,
  user: null,
  token: '',
  isLoading: true
}

const AuthContext = createContext(initialState)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation()
  const [authState, setAuthState] = useState(initialState)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)
    const userEmail = localStorage.getItem(STORAGE_KEY.USER_EMAIL)

    const getData = async (userEmail) => {
      const findUser: any = await findOneUserByEmail(userEmail)
      const userRole: any = await findOneRoleUserById(findUser?.id)
      const userProject = await getAllProjectsByUserId(findUser?.id)
      const allProject = await getAllProjects()

      return {
        id: findUser?.id,
        email: findUser?.email,
        role: userRole?.role,
        userProject: userRole?.role === ROLE_USER['ADMIN'] ? allProject : userProject
      }
    }

    // Handle async logic inside useEffect
    const fetchData = async () => {
      if (token) {
        setAuthState((prev) => ({ ...prev, token }))
      }

      if (token && userEmail) {
        try {
          const data = await getData(userEmail) // Await the result here
          setAuthState((prev) => ({ ...prev, user: data }))
        } catch (error) {
          console.error('Error fetching user data:', error)
          // Optionally handle error state
          setAuthState((prev) => ({ ...prev, user: null }))
        }
      }
    }

    fetchData() // Call the async function immediately

    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY.ACCESS_TOKEN) {
        if (!event.newValue) {
          setAuthState(initialState)
          return
        }
        setAuthState((prev) => ({ ...prev, token: event.newValue }))
      }
    })
  }, [])

  useEffect(() => {
    const handle = () => {
      setIsError(true)
    }
    window.addEventListener('API_ERROR', handle)

    return () => {
      window.removeEventListener('API_ERROR', handle)
    }
  }, [])

  const setUser = (user: UserInfo) => {
    setAuthState((prev) => ({ ...prev, user }))
  }

  const setToken = (token: string) => {
    setAuthState((prev) => ({ ...prev, token }))
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token)
  }

  const resetAuthState = () => {
    setAuthState(initialState)
  }

  const isAuthentication = !!authState.token && !!authState.user

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setToken,
        setUser,
        isAuthentication: isAuthentication,
        resetAuthState
      }}
    >
      {children}
      <Alert
        type='failed'
        isVisible={isError}
        onClose={() => setIsError(false)}
        message={t(`somethingWentWrong`)}
      ></Alert>
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => React.useContext(AuthContext) // import global state

export default AuthProvider
