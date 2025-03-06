import { Button } from 'components/Button'
import { CustomSelect } from 'components/Select'
import TextField from 'components/TextField/CustomTextField'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import CustomModal from 'components/Modal/CustomModal'

import { convertToMultiLang, emailValidation } from '~/shared/utils/util'
import ExpandMoreIcon from '~/shared/icons/ExpandMoreIcon'
import { EMPLOYEE_STATUS_OPTIONS } from '~/shared/constants/employee'
import classNames from 'classnames'
import { ARR_ROLE_PROJECT, ROLE_PROJECT, TABLE_DATA_PROJECT } from '~/shared/constants/project'
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
}

const ModalAddUser: React.FC<React.PropsWithChildren<ModalAddUserProps>> = ({
  visible,
  onCancel,
  headerTitle,
  isLoading,
  errorServer
}) => {
  const { t } = useTranslation()

  const [isEmailFocused, setIsEmailFocused] = React.useState(false)

  const [email, setEmail] = React.useState<string>('')
  const [project, setProject] = React.useState(null)
  const [role, setRole] = React.useState(null)

  const [error, setError] = React.useState({})

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
        <Button style='filled' disabled={isLoading}>
          {t('common.save')}
        </Button>
      </div>
    )
  }

  const isHaveError = !!error?.['staffID'] || !!error?.['project'] || !!error?.['email'] || !!errorServer?.['email']

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
          <div className='group-input flex justify-between relative gap-4'>
            <div className='flex flex-col items-start flex-1'>
              <p className='font-[600] text-[14px] leading-[20px] mb-1 text-gray-800'>{t('Project')}</p>
              <CustomSelect
                value={convertToMultiLang(project, t)}
                handleChange={(e) => {
                  setProject(e)
                }}
                options={TABLE_DATA_PROJECT.map((item) => convertToMultiLang(item, t))}
                error={false}
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
                error={false}
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
