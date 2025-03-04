import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '~/contexts/AuthContext'
import { loginRequest, StorageService } from '../request'
import { useState } from 'react'

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuthContext()
  const [userEmail, setUserEmail] = useState('')

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const data = await loginRequest({ email, password })

      if (!data?.token) {
        navigate('/sign-in', { state: { isError: true } })
        return { statusCode: 400 }
      }

      StorageService.clearEmailVerification()
      StorageService.setEmailLogin(email) // Use email parameter instead of userEmail state
      setToken(data.token)
      setUser(data.user)

      navigate('/project-management', { replace: true })
      return { statusCode: 200, data }
    } catch (error) {
      return { statusCode: 400, error }
    }
  }

  return { login, userEmail, setUserEmail } as any
}
