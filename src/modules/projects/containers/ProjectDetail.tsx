import { useParams } from 'react-router-dom'
import ScrollBar from 'components/Scrollbar'
import { useEffect, useState } from 'react'
import useCurrentUser from '~/hooks/useCurrentUser'
import classNames from 'classnames'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/Button'
import { ROLE_PROJECT } from '~/shared/constants/project'
import GroupData from './GroupData'
import ModalViewRightDetail from './ModalViewRightDetail'
import { Loading } from 'components/Loading'
import { getProjectDetail } from '../request'
import ModalWarningLockAndUnlock from '../components/ModalWarningLockAndUnlock'
import useProjectDetailControls from '../hooks/useProjectDetailControls'
import ModalViewChildDataset from '../components/ModalViewChildDataset'
import ModalEditTag from '../components/ModalEditTag'
import ModalRemoveUser from '../components/ModalRemoveUser'
import ModalAddUser from '../components/ModalAddUser'
import PlusIcon from '~/shared/icons/PlusIcon'
import { getProjectDetailDB } from '~/dbIndexedDB'

interface PersonalInfoProps {
  isFullWidth?: boolean
  isCustomWidthScroll?: boolean
}

const ProjectDetail: React.FC<PersonalInfoProps> = ({ isFullWidth, isCustomWidthScroll }) => {
  const param = useParams()

  const [defaultValues, setDefaultValues] = useState({})
  const [employeePerson, setEmployeePerson] = useState({
    id: null,
    name: null,
    joinDate: null,
    departmentId: null,
    status: null,
    departmentName: null
  })

  const methods = useForm({
    mode: 'all',
    defaultValues
  })

  // const queryClient = useQueryClient()

  const { user, currentRole } = useCurrentUser()
  const { t } = useTranslation()
  const [detailProject, setDetailProject] = useState(null)
  const { isLoading, updateLoading, stateModal, updateStateModal, resetControls, updateDataSetChild, dataSetChild } =
    useProjectDetailControls()

  const [taskId, setTaskId] = useState(null)
  const [isCreateTask, setIsCreateTask] = useState(false)
  const viewportHeight = document.documentElement.clientHeight

  const projectId = param?.projectId

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (projectId) {
        const dataTest = await getProjectDetailDB(Number(projectId))
        console.log('dataTest:', dataTest)

        const projectDta = await getProjectDetail({ projectId, userId: user?.id })
        if (projectDta) {
          setDetailProject(projectDta)
        }
      }
    }

    fetchProjectDetail()

    return () => {}
  }, [projectId])

  useEffect(() => {
    updateLoading(true)

    const timer = setTimeout(() => {
      updateLoading(false)
    }, 500)

    return () => {
      clearTimeout(timer)
      updateLoading(false)
    }
  }, [])

  const resetForm = () => {
    const resetValues = {
      taskName: null,
      status: false,
      group: null,
      person: null,
      dueDate: null,
      dueTime: null,
      taskDescription: null,
      note: null,
      isDue: false
    }

    methods.reset(resetValues)
  }

  const onClickCreateTask = (paramEmployeeOnboardingId) => {
    if (!paramEmployeeOnboardingId) {
      // handleSetEmLifeCycleState({ isCreateTaskGlobal: true })
      // if (handleSetEmployeeManageState) {
      //   handleSetEmployeeManageState({ isCreateTaskEmployeeManage: true })
      //   return
      // }
    } else {
      setIsCreateTask(true)
    }
  }

  const renderDetailView = () => {
    return (
      <div id='rightChecklistManager' className='flex min-w-[540px]'>
        <ModalViewRightDetail
          disabled={
            detailProject?.userRole === ROLE_PROJECT['VIEWER'] || detailProject?.userRole === ROLE_PROJECT['DEVELOPER']
          }
          projectId={projectId}
          isLoading={isLoading}
          infoDetailProject={detailProject}
          updateStateModal={updateStateModal}
        />
      </div>
    )
  }

  const renderDataSet = () => {
    return (
      <GroupData
        disabled={
          detailProject?.userRole === ROLE_PROJECT['VIEWER'] || detailProject?.userRole === ROLE_PROJECT['DEVELOPER']
        }
        arrDataset={detailProject?.datasets || []}
        groupLabel={'Datasets'}
        key={`datasets-${projectId}`}
        updateStateModal={updateStateModal}
        updateDataSetChild={updateDataSetChild}
      />
    )
  }

  const renderDataRaw = () => {
    return (
      <GroupData
        disabled={
          detailProject?.userRole === ROLE_PROJECT['VIEWER'] || detailProject?.userRole === ROLE_PROJECT['DEVELOPER']
        }
        arrDataset={[]}
        groupLabel={'Data Raws'}
        key={`data-raw-${detailProject?.id}`}
      />
    )
  }

  const renderListModelVersion = () => {
    return (
      <GroupData
        disabled={
          detailProject?.userRole === ROLE_PROJECT['VIEWER'] || detailProject?.userRole === ROLE_PROJECT['DEVELOPER']
        }
        arrDataset={[]}
        groupLabel={'List Model Version'}
        key={`list-model-version-${detailProject?.id}`}
      />
    )
  }

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center mt-32'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <div className={classNames('flex')}>
        <div
          className={classNames('pt-4 px-4 flex flex-col gap-4 mx-auto', {
            'max-w-[1220px]': !taskId && !isFullWidth, // Apply max-width of 1220px when right side is hidden
            'flex-grow': !!taskId // Allow left side to take remaining space when right side is visible
          })}
          style={{
            width: taskId ? 'calc(100% - 636px)' : '100%' // Set dynamic width based on taskId
          }}
        >
          <div className='inline-flex gap-3 items-center justify-between'>
            <div className='inline-flex items-center gap-3'>
              <p className='typography-title-sm text-gray-900 font-bold'>{t('Data Info')}</p>
            </div>
            {detailProject?.userRole === ROLE_PROJECT['VIEWER'] ||
            detailProject?.userRole === ROLE_PROJECT['DEVELOPER'] ? null : (
              <Button
                onClick={() => updateStateModal({ add_user: true })}
                classNames='!text-primary-500 !border-primary-500'
                leadingIcon={<PlusIcon width={18} className='mr-1' height={18} />}
                style='outline'
              >
                {t('Add User')}
              </Button>
            )}
          </div>

          <ScrollBar
            style={{
              maxHeight: isCustomWidthScroll ? viewportHeight - 195 : viewportHeight - 295,
              minHeight: isCustomWidthScroll ? viewportHeight - 195 : viewportHeight - 295
            }}
          >
            <div id='project-detail' className='flex flex-col gap-4 py-1'>
              {!isLoading && renderDataSet()}
              {!isLoading && renderDataRaw()}
              {!isLoading && renderListModelVersion()}
            </div>
          </ScrollBar>
        </div>
        {renderDetailView()}
      </div>

      <ModalWarningLockAndUnlock
        visible={stateModal['unlock_lock']}
        isLocked={detailProject?.is_locked}
        onCancel={resetControls}
        title={
          detailProject?.is_locked
            ? `Your datasets will be unlocked. Are you sure you want to continue?`
            : `Your datasets will be locked. Are you sure you want to continue?`
        }
      />

      <ModalEditTag
        data={{
          tag: null
        }}
        visible={stateModal['edit_tag']}
        headerTitle={t('Edit Tag')}
        onCancel={resetControls}
        onConfirm={() => {}}
      />

      <ModalRemoveUser
        visible={stateModal['remove_user']}
        onCancel={resetControls}
        title={`By confirming, you will remove this user out of the project. Are you sure you want to continue?`}
      />

      <ModalViewChildDataset visible={stateModal['view']} onCancel={resetControls} data={dataSetChild} />

      <ModalAddUser
        data={null}
        visible={stateModal['add_user']}
        headerTitle={`${t('Add User')}`}
        onCancel={resetControls}
        onConfirm={() => {}}
      />

      {/* <ModalConfirmDeleteTask
        visible={!!taskIdDelete}
        onCancel={handleCloseModalDeleteOnboardingTask}
        onApply={() => handleDelete(taskIdDelete)}
      /> */}
      {/* <FormProvider
          children={
            <ModalCreateNewTask
              visible={isCreateTask}
              onCancel={handleCloseModalNewTask}
              onApply={mutateAsync}
              body={
                <InfoTaskOnboarding
                  projectId={projectId}
                  isCreateNewTask={isCreateTask}
                  defaultValues={defaultValues}
                  handleSetDefaultValues={handleSetDefaultValues}
                  employeePerson={employeePerson}
                />
              }
            />
          }
          methods={methods}
          onSubmit={methods.handleSubmit(handleCreateNewTask)}
        /> */}
    </>
  )
}

export default ProjectDetail
