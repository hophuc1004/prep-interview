import { useParams } from 'react-router-dom'
import ScrollBar from 'components/Scrollbar'
import { useEffect, useState } from 'react'
import useCurrentUser from '~/hooks/useCurrentUser'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/Button'
import { ROLE_PROJECT } from '~/shared/constants/project'
import GroupData from './GroupData'
import ModalViewRightDetail from './ModalViewRightDetail'
import { Loading } from 'components/Loading'
import ModalWarningLockAndUnlock from '../components/ModalWarningLockAndUnlock'
import useProjectDetailControls from '../hooks/useProjectDetailControls'
import ModalEditTag from '../components/ModalEditTag'
import ModalRemoveUser from '../components/ModalRemoveUser'
import ModalAddUser from '../components/ModalAddUser'
import PlusIcon from '~/shared/icons/PlusIcon'
import {
  addUserToProject,
  getProjectDetailWithRoles,
  moveDataRawToDataSet,
  removeUserFromProject,
  updateDataset
} from '~/dbIndexedDB'
import DatasetsList from './DatasetsList'
import DataRawList from './DataRawList'
import ModelVersionList from './ModelVersionList'
import ModalConfirmPushDataset from '../components/ModalConfirmPushDataset'

export const REFETCH_PROJECT_DETAIL = 'refetch_project_detail'
interface PersonalInfoProps {
  isFullWidth?: boolean
  isCustomWidthScroll?: boolean
}

const ProjectDetail: React.FC<PersonalInfoProps> = ({}) => {
  const param = useParams()

  const { user } = useCurrentUser()
  const { t } = useTranslation()
  const [detailProject, setDetailProject] = useState(null)
  const { isLoading, updateLoading, stateModal, updateStateModal, resetControls, updateData, dataState } =
    useProjectDetailControls()

  const viewportHeight = document.documentElement.clientHeight

  const projectId = param?.projectId

  const fetchProjectDetail = async () => {
    if (projectId) {
      const projectDta = await getProjectDetailWithRoles(Number(projectId), Number(user?.id))
      if (projectDta) {
        setDetailProject(projectDta)
      }
    }
  }

  useEffect(() => {
    fetchProjectDetail()
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

  const handleUpdateDataSet = async (dataSetId, isLock) => {
    const result = await updateDataset(dataSetId, isLock)
    if (result) {
      resetControls()
      await fetchProjectDetail() // Directly refetch after update
    }
  }

  const handleMoveDataRaw = async (dataRowId) => {
    const result = await moveDataRawToDataSet(Number(dataRowId), Number(projectId))
    if (result) {
      resetControls()
      await fetchProjectDetail() // Directly refetch after update
    }
  }

  const handleCreateUser = async ({ email, password, projectId, role }) => {
    const result = await addUserToProject(email, password, projectId, role)
    if (result) {
      resetControls()
      await fetchProjectDetail() // Directly refetch after update
    }
  }

  const handleRemoveUser = async (userRemoveId, projectId) => {
    const result = await removeUserFromProject(Number(userRemoveId), Number(projectId))
    if (result) {
      resetControls()
      await fetchProjectDetail() // Directly refetch after update
    }
  }

  const renderDetailView = () => {
    return (
      <div id='rightChecklistManager' className='flex min-w-[540px]'>
        <ModalViewRightDetail
          disabled={
            detailProject?.requesterRole === ROLE_PROJECT['VIEWER'] ||
            detailProject?.requesterRole === ROLE_PROJECT['DEVELOPER']
          }
          projectId={projectId}
          isLoading={isLoading}
          infoDetailProject={detailProject}
          updateStateModal={updateStateModal}
          updateData={updateData}
        />
      </div>
    )
  }

  const renderDataSet = () => {
    return (
      <GroupData
        disabled={
          detailProject?.requesterRole === ROLE_PROJECT['VIEWER'] ||
          detailProject?.requesterRole === ROLE_PROJECT['DEVELOPER']
        }
        arrDataset={detailProject?.project?.datasets || []}
        childComponent={
          <DatasetsList
            arrData={detailProject?.project?.datasets}
            updateStateModal={updateStateModal}
            disabled={
              detailProject?.requesterRole === ROLE_PROJECT['VIEWER'] ||
              detailProject?.requesterRole === ROLE_PROJECT['DEVELOPER']
            }
            updateData={updateData}
          />
        }
        groupLabel={'Datasets'}
        key={`datasets-${projectId}`}
        updateStateModal={updateStateModal}
        updateData={updateData}
      />
    )
  }

  const renderDataRaw = () => {
    return (
      <GroupData
        disabled={
          detailProject?.requesterRole === ROLE_PROJECT['VIEWER'] ||
          detailProject?.requesterRole === ROLE_PROJECT['DEVELOPER']
        }
        arrDataset={[]}
        childComponent={
          <DataRawList
            arrData={detailProject?.project?.rawData}
            updateStateModal={updateStateModal}
            disabled={
              detailProject?.requesterRole === ROLE_PROJECT['VIEWER'] ||
              detailProject?.requesterRole === ROLE_PROJECT['DEVELOPER']
            }
            updateData={updateData}
          />
        }
        groupLabel={'Data Raws'}
        key={`data-raw-${detailProject?.id}`}
      />
    )
  }

  const renderListModelVersion = () => {
    return (
      <GroupData
        disabled={
          detailProject?.requesterRole === ROLE_PROJECT['VIEWER'] ||
          detailProject?.requesterRole === ROLE_PROJECT['DEVELOPER']
        }
        arrDataset={[]}
        childComponent={<ModelVersionList arrData={detailProject?.project?.model} />}
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
            'max-w-[1220px]': true // Apply max-width of 1220px when right side is hidden
          })}
          style={{
            width: '100%'
          }}
        >
          <div className='inline-flex gap-3 items-center justify-between'>
            <div className='inline-flex items-center gap-3'>
              <p className='typography-title-sm text-gray-900 font-bold'>{t('Data Info')}</p>
            </div>
            {detailProject?.requesterRole === ROLE_PROJECT['VIEWER'] ||
            detailProject?.requesterRole === ROLE_PROJECT['DEVELOPER'] ? null : (
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
              maxHeight: viewportHeight - 195,
              minHeight: viewportHeight - 195
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
        visible={stateModal['unlock']}
        isLocked={true}
        onCancel={resetControls}
        title={`Your datasets will be unlocked. Are you sure you want to continue?`}
        onApply={() => handleUpdateDataSet(dataState?.dataSetId, false)}
      />

      <ModalWarningLockAndUnlock
        visible={stateModal['lock']}
        isLocked={false}
        onCancel={resetControls}
        title={`Your datasets will be locked. Are you sure you want to continue?`}
        onApply={() => handleUpdateDataSet(dataState?.dataSetId, true)}
      />

      <ModalConfirmPushDataset
        visible={stateModal['push_dataset']}
        onCancel={resetControls}
        title={`Your will push this data to the dataset of project. Are you sure you want to continue?`}
        onApply={() => handleMoveDataRaw(dataState?.dataRawId)}
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
        onApply={() => handleRemoveUser(dataState.userIdRemove, projectId)}
      />

      {/* <ModalViewChildDataset visible={stateModal['view']} onCancel={resetControls} data={dataSetChild} /> */}

      <ModalAddUser
        data={null}
        visible={stateModal['add_user']}
        headerTitle={`${t('Add User')}`}
        onCancel={resetControls}
        onConfirm={handleCreateUser}
        projectId={Number(projectId)}
      />
    </>
  )
}

export default ProjectDetail
