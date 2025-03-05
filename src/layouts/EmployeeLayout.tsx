/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react'
import { AppBar } from '~/components/AppBar'
import { Navigation } from '~/components/Navigation'
import { Menu } from '~/components/Navigation/types/menu'
import LogoMinute from '~/assets/images/LogoMinute.svg'

import classnames from 'classnames'
import PageHeader from 'components/PageHeader'
import { AccountCircleIcon } from '~/shared/icons/AccountCircle'
import { CalendarMonthIcon } from '~/shared/icons/CalendarMonth'
import { PERMISSIONS, PROJECT_MANAGER_APPROVER_PERMISSIONS } from '~/shared/utils/role'
import useCurrentUser from '~/hooks/useCurrentUser'
import { includePermission } from '~/shared/utils/util'
import { AppraisalIcon } from '~/shared/icons/AppraisalIcon'

import isNil from 'lodash/isNil'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import isEmpty from 'lodash/isEmpty'
import { usePageHeaderContext } from '~/contexts/PageHeaderContext'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import usePermission from '~/hooks/usePermission'
import NoInternetConnection from 'components/NoInternetConnection'

const EmployeeLayout: React.FC = () => {
  const [isNavExpanded, setNavExpanded] = useState(false)

  const { permissions, user } = useCurrentUser()
  const { t } = useTranslation()
  const { handleSetPageHeaderState } = usePageHeaderContext()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      navigate(`/project-management`)
    }
  }, [navigate, pathname])

  usePermission()

  const handleExpandedNav = (lengthMenu) => {
    if (lengthMenu > 1) {
      setNavExpanded(true)
      return
    }
    return
  }

  const menuItems: Menu[] = [
    {
      key: 'project-management',
      name: t('Project Management'),
      url: '/project-management',
      icon: AccountCircleIcon({ width: 24, height: 24 })
    }
  ]

  const filteredMenuItems = menuItems.filter(
    (item) => includePermission(permissions, item?.permissions) || !item.permissions || item?.permissions.length === 0
  )

  const renderLogo = () => {
    return (
      <img
        style={{
          height: '36px'
        }}
        src={LogoMinute}
        alt='Logo'
      />
    )
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEY.URL_REDIRECT)
    setTimeout(() => {
      window.location.replace('/sign-in')
      window.history.forward()
    }, 300)

    setTimeout(() => {
      window.location.reload()
    }, 350)

    return
  }

  return (
    <div className=''>
      <AppBar
        className={classnames(`fixed top-0 w-full z-50 bg-[url('assets/images/background-header.svg')]`)}
        logo={renderLogo()}
        toggleNavExpand={() => setNavExpanded(!isNavExpanded)}
        handleLogout={handleLogout}
        handleSetGlobalState={handleSetPageHeaderState}
      />

      <div
        className={classnames(
          'fixed top-[58px] left-0 h-full bg-white transform transition-all duration-200 ease-in-out z-50',
          { 'w-[68px]': !isNavExpanded, 'w-[336px]': isNavExpanded }
        )}
      >
        {!isNil(filteredMenuItems) && (
          <Navigation
            menu={filteredMenuItems}
            expanded={isNavExpanded}
            onClick={() => setNavExpanded(false)}
            handleExpandedNav={handleExpandedNav}
            handleLogout={handleLogout}
          />
        )}
      </div>

      <div
        className='ml-[70px] pt-[56px] max-h-screen overflow-hidden'
        onClick={() => {
          if (isNavExpanded) setNavExpanded(false)
        }}
      >
        <div className='flex flex-col'>
          <div className='flex-initial min-h-[56px]'>
            <PageHeader />
          </div>

          <div className='flex-1 h-full'>
            <NoInternetConnection>
              <Outlet />
            </NoInternetConnection>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeLayout
