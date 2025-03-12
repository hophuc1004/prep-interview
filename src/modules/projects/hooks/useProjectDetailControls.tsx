import { useState } from 'react'

// Custom hook to manage project control states
const useProjectDetailControls = () => {
  // State declarations
  const [isLoading, setIsLoading] = useState(false)

  const [stateModal, setStateModal] = useState({
    view: false,
    edit_tag: false,
    unlock: false,
    remove_user: false,
    add_user: false,
    lock: false,
    push_dataset: false
  })

  const [dataState, setDataState] = useState({
    dataSetId: null,
    dataRawId: null,
    userIdRemove: null
  })

  const updateStateModal = (payload) => {
    setStateModal((prev) => ({ ...prev, ...payload }))
  }

  const updateData = (value) => {
    setDataState(value)
  }

  // Functions to update each state
  const updateLoading = (value) => {
    setIsLoading(value)
  }

  const hideAllTooltips = async () => {
    document.getElementById('root').click()
  }

  // Optional: Function to reset all states to default
  const resetControls = () => {
    setIsLoading(false)
    setStateModal({
      view: false,
      edit_tag: false,
      unlock: false,
      remove_user: false,
      add_user: false,
      lock: false,
      push_dataset: false
    })

    hideAllTooltips()
    updateData({ dataSetId: null, dataRawId: null })
  }

  // Return states and their update functions
  return {
    isLoading,
    updateLoading,
    resetControls,
    updateStateModal,
    stateModal,
    dataState,
    updateData
  }
}

export default useProjectDetailControls
