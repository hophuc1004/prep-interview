import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fDateTimeReverse } from '~/shared/utils/format-time'

import { getFirstAndLastName, getFullName } from '~/shared/utils/util'
import FieldBody from './FieldBody'
import InfoUser from './InfoUser'
import { getUserProject } from '../request'

interface BodyRightDetailProps {
  infoDetailProject?: any
  projectId?: string
  disabledViewDetail?: boolean
  updateStateModal?: (payload: any) => void
}

const BodyRightDetail: React.FC<React.PropsWithChildren<BodyRightDetailProps>> = ({
  projectId,
  infoDetailProject,
  disabledViewDetail,
  updateStateModal
}) => {
  const { t } = useTranslation()

  const [listUserDta, setListUserDta] = useState([])

  useEffect(() => {
    const listUser = getUserProject(projectId)

    if (listUser) {
      setListUserDta(listUser)
      return
    }

    return () => {}
  }, [projectId])

  return (
    <div className='flex flex-col gap-6 px-[4px] py-[3px]'>
      <FieldBody
        className='h-[40px] w-full'
        title={t('Project Name')}
        component={
          <div className='flex flex-col w-full'>
            <p className='typography-body-md font-normal text-gray-800'>{infoDetailProject?.name}</p>
          </div>
        }
        zIndex='z-40'
      />

      <FieldBody
        className='h-[40px] w-full'
        title={t('Total Datasets')}
        component={
          <div className='flex flex-col w-full'>
            <p className='typography-body-md font-normal text-gray-800'>{infoDetailProject?.datasets?.length || 0}</p>
          </div>
        }
        zIndex='z-40'
      />

      <FieldBody
        className='h-[40px] w-full'
        title={t('Datasets Active')}
        component={
          <div className='flex flex-col w-full'>
            <p className='typography-body-md font-normal text-gray-800'>
              {infoDetailProject?.datasets?.filter((set) => !set.is_locked)?.length || 0}
            </p>
          </div>
        }
        zIndex='z-40'
      />

      <FieldBody
        className='h-[40px] w-full'
        title={t('Datasets Locked')}
        component={
          <div className='flex flex-col w-full'>
            <p className='typography-body-md font-normal text-gray-800'>
              {infoDetailProject?.datasets?.filter((set) => set.is_locked)?.length || 0}
            </p>
          </div>
        }
        zIndex='z-40'
      />

      <FieldBody
        className='h-[40px] w-full'
        title={t('Total Data Raws')}
        component={
          <div className='flex flex-col w-full'>
            <p className='typography-body-md font-normal text-gray-800'>{infoDetailProject?.dataRows?.length || 0}</p>
          </div>
        }
        zIndex='z-40'
      />

      <FieldBody
        className='h-[40px] w-full'
        title={t('Total Models Version')}
        component={
          <div className='flex flex-col w-full'>
            <p className='typography-body-md font-normal text-gray-800'>
              {infoDetailProject?.modalVersions?.length || 0}
            </p>
          </div>
        }
        zIndex='z-40'
      />

      <FieldBody
        className='h-[40px] w-full'
        title={t('Total Users')}
        component={
          <div className='flex flex-col w-full'>
            <p className='typography-body-md font-normal text-gray-800'>{listUserDta?.length}</p>
          </div>
        }
        zIndex='z-40'
      />
      <FieldBody
        className='w-full'
        title={t('List Users')}
        component={
          <div className='flex flex-col w-full'>
            {listUserDta?.map((userDta) => {
              return (
                <InfoUser
                  disabled={disabledViewDetail}
                  email={userDta?.email}
                  role={userDta?.role}
                  key={userDta?.email}
                  updateStateModal={updateStateModal}
                />
              )
            })}
          </div>
        }
        zIndex='z-40'
      />
    </div>
  )
}

export const InfoUpdatedBy = ({ updatedAt, infoUpdateBy }) => {
  const { t } = useTranslation()

  const fullName = getFullName(infoUpdateBy?.firstName, '', infoUpdateBy?.lastName)
  const firstLastName = getFirstAndLastName(fullName)

  const infoTimeSubmitted = updatedAt && fDateTimeReverse(updatedAt)

  return (
    <p className='typography-body-sm text-gray-500 font-normal'>
      {t('onboarding.infoUpdatedBy', {
        updateName: firstLastName,
        timeUpdated: infoTimeSubmitted,
        interpolation: { escapeValue: false }
      })}
      {/* {`Marked as Done by ${firstLastName} on ${infoTimeSubmitted}`} */}
    </p>
  )
}

export default BodyRightDetail
