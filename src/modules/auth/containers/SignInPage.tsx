import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '~/contexts/AuthContext'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '../constant'
import { PublicClientApplication } from '@azure/msal-browser'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/Button'
import { PasswordField } from '../components/PasswordField'
import Typography from 'components/Typography'
import TextField from 'components/TextField'
import CheckEmailPage from '../components/CheckEmailPage'
import { useSignInForm } from '../hooks/useSignInForm'
import { useAuthMessages } from '../hooks/useAuthMessages'
import { Loading } from 'components/Loading'

const msalInstance = new PublicClientApplication(msalConfig)

const SignInPage: React.FC = () => {
  const { isAuthentication, setToken, setUser } = useAuthContext()
  const { formState, handleEmail, handlePassword, handleSignIn } = useSignInForm()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const messages = useAuthMessages()

  const getEmailLocalStorage = () => {
    const email = localStorage.getItem(STORAGE_KEY.USER_EMAIL)
    return email
  }

  useEffect(() => {
    if (isAuthentication) {
      navigate('/', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthentication])

  const renderErrorMessage = () => {
    if (formState.error && formState.errorType && messages[formState.errorType]) {
      return messages[formState.errorType]
    }
    return null
  }

  if (formState.isLoading) {
    return (
      <div className='flex items-center justify-center h-[252px] w-full'>
        <Loading />
      </div>
    )
  }

  return (
    <MsalProvider instance={msalInstance}>
      <div className='flex flex-col w-[460px] items-start gap-10 p-8 relative bg-colors-white rounded-2xl border-2 border-solid border-gray-100'>
        <div className='flex flex-col items-start gap-6 self-stretch w-full relative'>
          {formState.showPasswordField ? (
            <div className='flex flex-col gap-1'>
              <div className='flex flex-col items-start gap-2 self-stretch w-full relative'>
                <Typography
                  variants='title'
                  size='medium'
                  className='relative self-stretch font-body-medium-400 font-bold text-gray-800 text-2xl tracking-[0.1px] leading-8'
                >
                  {t('Welcome back!')}
                </Typography>
                <p className='relative self-stretch font-normal text-global-color-gray-800 text-base tracking-[0.10px] leading-6'>
                  <span className='font-body-medium-400'>
                    {t('You are signing in with email address:')}
                    <br />
                  </span>

                  <span className='font-body-medium-600 font-medium'>
                    <Typography variants='body' size='medium' className='font-bold'>
                      {formState.email || getEmailLocalStorage()}.
                    </Typography>
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className='flex flex-col items-start gap-2 self-stretch w-full relative'>
                <Typography
                  variants='title'
                  size='medium'
                  className='relative self-stretch font-body-medium-400 font-bold text-gray-800 text-2xl tracking-[0.1px] leading-8'
                >
                  {t('Welcome back!')}
                </Typography>
                <Typography
                  variants='body'
                  size='medium'
                  className='relative self-stretch font-body-medium-400 font-normal text-gray-800 text-base tracking-[0.1px] leading-6'
                >
                  {t('Sign in with your company account.')}
                </Typography>
              </div>
              <div className='flex flex-col items-start gap-0.5 relative self-stretch w-full'>
                <Typography variants='label' size='medium' className={formState.error ? 'text-red-500' : ''}>
                  {t('companyEmail')}
                </Typography>
                <TextField
                  value={formState.email}
                  onChange={(e) => handleEmail(e.target.value)}
                  error={formState.error}
                  helperText={renderErrorMessage()}
                  placeholder={t('companyEmail')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSignIn()
                    }
                  }}
                />
              </div>
            </>
          )}

          {formState.showPasswordField && (
            <PasswordField
              password={formState.password}
              onPasswordChange={handlePassword}
              helperText={renderErrorMessage()}
              error={formState.error}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSignIn()
                }
              }}
            />
          )}

          <div className='flex flex-col items-start self-stretch w-full relative flex-[0_0_auto]'>
            <Button classNames='text-white border-[1px] bg-primary-500 w-full' style='filled' onClick={handleSignIn}>
              {formState.showPasswordField ? t('Sign In') : t('Continue')}
            </Button>
          </div>
        </div>
      </div>
    </MsalProvider>
  )
}

export default SignInPage
