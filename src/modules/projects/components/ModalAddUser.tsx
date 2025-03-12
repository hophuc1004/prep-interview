import { Button } from 'components/Button'
import { CustomSelect } from 'components/Select'
import TextField from 'components/TextField/CustomTextField'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import CustomModal from 'components/Modal/CustomModal'

import { convertToMultiLang, emailValidation } from '~/shared/utils/util'
import ExpandMoreIcon from '~/shared/icons/ExpandMoreIcon'
import classNames from 'classnames'
import { ARR_ROLE_PROJECT } from '~/shared/constants/project'
import { getAllProjects, getProjectById } from '~/dbIndexedDB'
import { Loading } from 'components/Loading'
import { isNil } from 'lodash'
interface ModalAddUserProps {
  visible?: boolean
  onCancel?: () => void
  headerTitle?: string
  btnName?: string
  isLoading?: boolean
  onConfirm?: (payload: any) => void
  data: {
    project: number
    email: string
    role: number
  }
  errorServer?: any
  resetErrorServer?: () => void
  projectId?: number
}

const ModalAddUser: React.FC<React.PropsWithChildren<ModalAddUserProps>> = ({
  visible,
  onCancel,
  headerTitle,
  isLoading,
  errorServer,
  onConfirm,
  projectId
}) => {
  const { t } = useTranslation()

  const [isEmailFocused, setIsEmailFocused] = React.useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = React.useState(false)

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [project, setProject] = React.useState(null)
  const [role, setRole] = React.useState(null)

  const [error, setError] = React.useState({})
  const [allProjectState, setAllProjectState] = useState(null)
  const [isLoadingProject, setIsLoadingProject] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoadingProject(true)

        const currentProject = await getProjectById(projectId)

        if (currentProject) {
          setAllProjectState([currentProject]) // Set the fetched data, not the current state
          setIsLoadingProject(false)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      }
    }

    fetchProject()

    // Cleanup function (optional, can be empty if no cleanup needed)
    return () => {}
  }, [])

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{headerTitle}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel} disabled={isLoading}>
          {t('common.cancel')}
        </Button>
        <Button
          style='filled'
          disabled={isLoading}
          onClick={() => {
            if (email.length === 0) {
              setError((prev) => ({
                ...prev,
                email: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (password.length === 0) {
              setError((prev) => ({
                ...prev,
                password: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (isNil(project)) {
              setError((prev) => ({
                ...prev,
                project: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (isNil(role)) {
              setError((prev) => ({
                ...prev,
                project: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (email.length !== 0 && password.length !== 0 && !isNil(project) && !isNil(project)) {
              onConfirm({
                email,
                password,
                projectId: project?.id,
                role: role?.name
              })
              return
            }

            return
          }}
        >
          {t('Add')}
        </Button>
      </div>
    )
  }

  const isHaveError = !!error?.['staffID'] || !!error?.['project'] || !!error?.['email'] || !!errorServer?.['email']

  if (isLoadingProject) {
    return <Loading />
  }

  return (
    <CustomModal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      paddingX='px-[24px]'
      paddingY='py-[24px] !rounded-2xl'
      paddingYContent='py-[8px]'
      modalWrapperClassName={`w-[40%] max-h-[480px] bg-white rounded-2xl`}
      maxHeight={isHaveError ? '320px' : '280px'}
    >
      <div className='z-[99999]'>
        <div className='flex flex-col gap-[24px] pb-2'>
          <div className='group-input flex flex-col items-start relative'>
            <p
              className={classNames('font-semibold text-gray-800 mb-1 typography-body-sm', {
                'text-red-500': !!error?.['email'] || !!errorServer?.['email']
              })}
            >
              {t('User Email')}
            </p>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value)
                if (error?.['email']) {
                  setError({
                    ...error,
                    email: ''
                  })
                }
              }}
              value={email}
              placeholder={t('Enter user email')}
              // disabled={isLoading}
              onFocus={() => {
                setIsEmailFocused(true)
                if (error?.['email']) {
                  setError({
                    ...error,
                    email: ''
                  })
                }
              }}
              onBlur={() => {
                setIsEmailFocused(false)
                if (!emailValidation(email)) {
                  setError({
                    ...error,
                    email: t('Invalid email format.')
                  })
                }
                if (email.length === 0) {
                  setError({
                    ...error,
                    email: t('editUserInfo.thisFieldIsRequired')
                  })
                } else {
                  if (error?.['email']) {
                    setError({
                      ...error,
                      email: ''
                    })
                  }
                }
              }}
              error={!!errorServer?.['email'] || !!error?.['email']}
              helperText={errorServer?.['email'] ? errorServer?.['email'] : error?.['email']}
              maxLength={320}
              disabled={isLoading}
            />
            {isEmailFocused && (
              <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${email?.length || 0}/320`}</p>
            )}
          </div>
          <div className='group-input flex flex-col items-start relative'>
            <p
              className={classNames('font-semibold text-gray-800 mb-1 typography-body-sm', {
                'text-red-500': !!error?.['email'] || !!errorServer?.['email']
              })}
            >
              {t('User Password')}
            </p>
            <TextField
              onChange={(e) => {
                setPassword(e.target.value)
                if (error?.['password']) {
                  setError({
                    ...error,
                    password: ''
                  })
                }
              }}
              value={password}
              placeholder={t('Enter user password')}
              // disabled={isLoading}
              onFocus={() => {
                setIsPasswordFocused(true)
                if (error?.['password']) {
                  setError({
                    ...error,
                    password: ''
                  })
                }
              }}
              onBlur={() => {
                setIsPasswordFocused(false)
                if (password.length === 0) {
                  setError({
                    ...error,
                    password: t('editUserInfo.thisFieldIsRequired')
                  })
                } else {
                  if (error?.['password']) {
                    setError({
                      ...error,
                      password: ''
                    })
                  }
                }
              }}
              error={!!errorServer?.['password'] || !!error?.['password']}
              helperText={errorServer?.['password'] ? errorServer?.['password'] : error?.['password']}
              maxLength={320}
              disabled={isLoading}
            />
            {isPasswordFocused && (
              <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${password?.length || 0}/15`}</p>
            )}
          </div>
          <div className='group-input flex justify-between relative gap-4'>
            <div className='flex flex-col items-start flex-1'>
              <p className='font-[600] text-[14px] leading-[20px] mb-1 text-gray-800'>{t('Project')}</p>
              <CustomSelect
                value={convertToMultiLang(project, t)}
                handleChange={(e) => {
                  setProject(e)
                }}
                options={allProjectState?.map((item) => convertToMultiLang(item, t))}
                error={error?.['project']}
                onFocus={() => {
                  if (error?.['project']) {
                    setError({
                      ...error,
                      project: ''
                    })
                  }
                }}
                helperText={t('editUserInfo.thisFieldIsRequired')}
                onBlur={() => {
                  if (project === null) {
                    setError({
                      ...error,
                      project: t('editUserInfo.thisFieldIsRequired')
                    })
                  } else {
                    if (error?.['project']) {
                      setError({
                        ...error,
                        project: ''
                      })
                    }
                  }
                }}
                placeholder={t('Select user project')}
                icon={<ExpandMoreIcon height={24} width={24} />}
              />
            </div>
            <div className='flex flex-col items-start flex-1'>
              <p className='font-[600] text-[14px] leading-[20px] mb-1 text-gray-800'>{t('Role')}</p>
              <CustomSelect
                value={convertToMultiLang(role, t)}
                handleChange={(e) => {
                  setRole(e)
                }}
                options={ARR_ROLE_PROJECT.map((item) => convertToMultiLang(item, t))}
                error={error?.['role']}
                onFocus={() => {
                  if (error?.['role']) {
                    setError({
                      ...error,
                      role: ''
                    })
                  }
                }}
                helperText={t('editUserInfo.thisFieldIsRequired')}
                onBlur={() => {
                  if (role === null) {
                    setError({
                      ...error,
                      role: t('editUserInfo.thisFieldIsRequired')
                    })
                  } else {
                    if (error?.['role']) {
                      setError({
                        ...error,
                        role: ''
                      })
                    }
                  }
                }}
                placeholder={t('Select user project')}
                icon={<ExpandMoreIcon height={24} width={24} />}
              />
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default ModalAddUser
