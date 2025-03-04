import { useEffect, useState } from 'react'
import { emailValidation } from '~/shared/utils/util'
import { StorageService, validateEmailRequest } from '../request'
import { useLoginMutation } from './useLoginRequest'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { COUNTDOWN_DURATION, SignInFormState } from '../constant'

export const useSignInForm = () => {
  const [formState, setFormState] = useState<SignInFormState>(() => {
    const savedEmail = StorageService.getEmailVerification()

    return {
      email: savedEmail || '',
      password: '',
      error: false,
      helperText: '',
      showPasswordField: false,
      showChangeEmailModal: false,
      isFirstLogin: false,
      errorType: null,
      isLoading: true
    }
  })

  const { login } = useLoginMutation()

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedEmail = StorageService.getEmailVerification()
      const isFirstLogin = localStorage.getItem(STORAGE_KEY.IS_FIRST_LOGIN) === 'true'
      const verificationEmail = localStorage.getItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION) === 'true'

      if (savedEmail && isFirstLogin && verificationEmail) {
        setFormState((prev) => ({
          ...prev,
          email: savedEmail,
          isFirstLogin: true,
          isResendEmail: false
        }))
      } else if (savedEmail && !isFirstLogin && verificationEmail) {
        setFormState((prev) => ({
          ...prev,
          isFirstLogin: false,
          isResendEmail: false
        }))
      }
      setFormState((prev) => ({
        ...prev,
        isLoading: false
      }))
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const validateEmptyEmail = (): boolean => {
    if (!formState.email.trim()) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'required',
        showPasswordField: false
      }))
      return false
    }
    return true
  }

  const validateEmailFormat = (): boolean => {
    if (!emailValidation(formState.email)) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'invalidEmail'
      }))
      return false
    }
    return true
  }

  const validatePassword = (): boolean => {
    if (!formState.password.trim()) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'required'
      }))
      return false
    }

    if (formState.password.length < 8 || formState.password.length > 40) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'passwordLengthInvalid'
      }))
      return false
    }

    return true
  }

  const handleNonExistentEmail = async (error: any): Promise<void> => {
    if (error?.message === 'Email does not exit. Please re-check again!') {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'emailNotFound'
      }))
    } else if (error?.message === 'Not have password. Please check your email to set up your password!') {
      await handleNoPasswordScenario(formState.email)
    } else if (error?.message === 'Validation failed') {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'invalidEmail'
      }))
    } else {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'invalidEmail'
      }))
    }
  }

  const handleNoPasswordScenario = async (email: string): Promise<void> => {
    StorageService.setEmailVerification(email, true)
    StorageService.setCountdownEndTime(COUNTDOWN_DURATION, email, 'firstLogin')

    setFormState((prev) => ({
      ...prev,
      email,
      error: false,
      helperText: '',
      isFirstLogin: true,
      isResendEmail: false
    }))
  }

  const handleEmail = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      email: value,
      password: '',
      error: false,
      helperText: '',
      errorType: null
    }))
  }

  const handlePassword = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      password: value
    }))
  }

  const handleSignIn = async () => {
    if (formState.showPasswordField) {
      return handleSignInWithPassword()
    }

    if (!validateEmptyEmail()) return

    if (!validateEmailFormat()) return

    try {
      const data = await validateEmailRequest(formState.email)

      if (data?.statusCode === 403) {
        await handleNonExistentEmail(data)
      } else {
        if (formState.error) {
          return handleNoPasswordScenario(formState.email)
        }

        setFormState((prev) => ({
          ...prev,
          error: false,
          helperText: '',
          showPasswordField: true,
          isFirstLogin: false
        }))
      }
    } catch (error) {
      await handleNonExistentEmail(error)
    }
  }

  const handleSignInWithPassword = async () => {
    if (!validatePassword()) return

    const data: any = await login({ email: formState.email, password: formState.password })

    if (data?.statusCode === 400) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'incorrectPassword'
      }))
    }
  }

  return {
    formState,
    handleEmail,
    handlePassword,
    handleSignIn
  }
}
