import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { END_POINT } from './constant'
import { BaseResponse } from '~/shared/types/api-response'
import { UserInfo } from '~/shared/types/user-info'
import httpClient from '~/shared/utils/http-client'

export const PASS_WORD = {
  PASS_ADMIN: 'admin123123',
  PASS_OWNER: 'owner123123',
  PASS_DEVELOPER: 'developer123123',
  PASS_VIEWER: 'viewer123123'
}

export const VALID_CREDENTIALS = [
  {
    email: 'admin@yopmail.com',
    password: PASS_WORD['PASS_ADMIN']
  },
  {
    email: 'owner@yopmail.com',
    password: PASS_WORD['PASS_OWNER']
  },
  {
    email: 'developer@yopmail.com',
    password: PASS_WORD['PASS_DEVELOPER']
  },
  {
    email: 'viewer@yopmail.com',
    password: PASS_WORD['PASS_VIEWER']
  }
]

export const loginRequest = async ({ email, password }: { email: string; password: string }) => {
  if (!email) {
    return {
      statusCode: 400,
      message: 'Email is required!'
    }
  }

  if (!password) {
    return {
      statusCode: 400,
      message: 'Password is required!'
    }
  }

  const user = await VALID_CREDENTIALS.find((item) => item.email === email)

  if (!user) {
    return {
      statusCode: 400,
      message: 'Email or password incorrect!'
    }
  }

  if (password !== user?.password) {
    return {
      statusCode: 400,
      message: 'Password incorrect!'
    }
  }

  return {
    token: 'hereareexampletoken',
    user: user
  } as any
}

export const getCurrentUser = async () => {
  const response: BaseResponse<UserInfo> = await httpClient.get(END_POINT.currentUser)
  return response
}

export const validateEmailRequest = async (email: string) => {
  const user = await VALID_CREDENTIALS.find((item) => item.email === email)

  if (!user) {
    return {
      statusCode: 403,
      message: 'Email does not exit. Please re-check again!'
    }
  } else {
    return {
      statusCode: 200
    }
  }
}

export const StorageService = {
  getCountdownEndTime: (): number | null => {
    const endTimeStr = localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME)
    return endTimeStr ? parseInt(endTimeStr) : null
  },

  setEmailLogin: (email: string): void => {
    localStorage.setItem(STORAGE_KEY.USER_EMAIL, email)
  },

  setCountdownEndTime: (duration: number, email: string, type: 'firstLogin' | 'forgotPassword'): void => {
    const endTime = Date.now() + duration * 1000
    let data = {}

    try {
      data = JSON.parse(localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME))
    } catch (err) {
      console.log('errorGetCountDownEndTime:::: ', err)
    }

    // const data = JSON.parse(localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME))
    localStorage.setItem(
      STORAGE_KEY.COUNTDOWN_END_TIME,
      JSON.stringify({
        ...data,
        [email]: {
          endTime: endTime.toString(),
          type
        }
      })
    )
  },

  setEmailVerification: (email: string, isFirstLogin?: boolean): void => {
    localStorage.setItem(STORAGE_KEY.USER_EMAIL, email)
    localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'true')
    localStorage.setItem(STORAGE_KEY.IS_FIRST_LOGIN, isFirstLogin ? 'true' : 'false')
    localStorage.setItem(STORAGE_KEY.EMAIL_FIRST_LOGIN, email)
  },

  getEmailVerification: (): string | null => {
    return localStorage.getItem(STORAGE_KEY.USER_EMAIL)
  },

  clearEmailVerification: (): void => {
    localStorage.removeItem(STORAGE_KEY.USER_EMAIL)
    localStorage.removeItem(STORAGE_KEY.COUNTDOWN_END_TIME)
    localStorage.removeItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION)
    localStorage.removeItem(STORAGE_KEY.IS_FIRST_LOGIN)
    localStorage.removeItem(STORAGE_KEY.EMAIL_FIRST_LOGIN)
  }
}
