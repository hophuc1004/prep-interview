import { TabBar, TabItem } from 'components/TabBar'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useCurrentUser from '~/hooks/useCurrentUser'
import isEmpty from 'lodash/isEmpty'

import { useTranslation } from 'react-i18next'
import ProjectList from './ProjectList'
import { isNil, isUndefined } from 'lodash'

const ProjectManagement: React.FC = () => {
  console.log('11111111111')
  const param = useParams()
  console.log('param:', param)
  // const tabActive = 'project-list'
  const tabActive = param['*']
  console.log('tabActive:', tabActive.length)
  console.log('tabActive:', tabActive)

  const navigate = useNavigate()

  const { t } = useTranslation()

  const { permissions } = useCurrentUser()

  useEffect(() => {
    if (!tabActive || isNil(tabActive) || isUndefined(tabActive) || isEmpty(tabActive)) {
      console.log('9999999999')
      navigate('/project-management/project-list', { replace: true })
      console.log('88888888888')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActive])

  const tabs: TabItem[] = [
    {
      key: 'project-list',
      name: 'Project List',
      component: <ProjectList />
    }
  ]

  const renderTabElement = () => {
    return (
      <div className=''>
        {tabs.map((item) => (item.key === tabActive ? <div key={item.key}> {item.component}</div> : null))}
      </div>
    )
  }

  const navigateTab = (key: string) => {
    const currentTab = tabs.find((tab) => tab.key === key)
    if (currentTab) {
      navigate(`/project-management/${currentTab.key}`, { replace: true })
      return
    }
  }

  return (
    <>
      <div className='w-full h-fit'>
        <TabBar
          className='w-full px-common bg-white'
          tabs={tabs}
          tabActive={tabActive}
          onClick={(key) => navigateTab(key)}
        />
        {/* <ScrollBar className='max-h-[calc(100vh-178px)] min-h-[calc(100vh-178px)]'>{renderTabElement()}</ScrollBar> */}
        <div className='max-h-[calc(100vh-178px)] min-h-[calc(100vh-178px)]'>{renderTabElement()}</div>
      </div>
    </>
  )
}

export default ProjectManagement
