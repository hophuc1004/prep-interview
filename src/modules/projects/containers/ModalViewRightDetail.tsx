import ScrollBar from 'components/Scrollbar'
import { useTranslation } from 'react-i18next'

import { Loading } from 'components/Loading'

import BodyRightDetail from './BodyRightDetail'

type Props = {
  isLoading?: boolean
  disabled?: boolean
  projectId?: string
  user?: any
  userEmployeeId?: number
  infoDetailProject?: any
  updateStateModal?: (payload: any) => void
}

const ModalViewRightDetail = ({ projectId, disabled, infoDetailProject, isLoading, updateStateModal }: Props) => {
  const { t } = useTranslation()

  const viewportHeight = document.documentElement.clientHeight

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center mt-32'>
        <Loading />
      </div>
    )
  }

  return (
    <div
      className='bg-white h-full border-l border-gray-200 min-w-[540px] flex flex-col px-5 py-3 gap-3 relative no-scrollbar'
      style={{ height: viewportHeight }}
    >
      <div className='flex w-full justify-between items-center h-[40px]'>
        <div className='h-7 justify-start items-center gap-3 inline-flex'>
          <p className='typography-title-sm text-gray-900 font-semibold'>{t('Project Info')}</p>
        </div>
      </div>
      <ScrollBar
        style={{
          maxHeight: viewportHeight - 100,
          minHeight: viewportHeight - 100
        }}
      >
        <BodyRightDetail
          disabledViewDetail={disabled}
          infoDetailProject={infoDetailProject}
          projectId={projectId}
          updateStateModal={updateStateModal}
        />
      </ScrollBar>
    </div>
  )
}

export default ModalViewRightDetail
