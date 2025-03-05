import { TabBar, TabItem } from 'components/TabBar'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useCurrentUser from '~/hooks/useCurrentUser'
import isEmpty from 'lodash/isEmpty'

import { useTranslation } from 'react-i18next'
import ProjectList from './ProjectList'
import { isNil, isUndefined } from 'lodash'

const ProjectManagement: React.FC = () => {
  const param = useParams()
  const tabActive = param['*']

  const navigate = useNavigate()

  const { t } = useTranslation()

  const { currentRole, user } = useCurrentUser()

  useEffect(() => {
    if (!tabActive || isNil(tabActive) || isUndefined(tabActive) || isEmpty(tabActive)) {
      navigate('/project-management/project-list', { replace: true })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActive])

  const tabs: TabItem[] = [
    {
      key: 'project-list',
      name: 'Project List',
      component: <ProjectList userRole={currentRole} userProjects={user?.userProject} />
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
