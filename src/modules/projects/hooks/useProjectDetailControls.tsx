import { useState } from 'react'

// Custom hook to manage project control states
const useProjectDetailControls = () => {
  // State declarations
  const [isLoading, setIsLoading] = useState(false)

  const [stateModal, setStateModal] = useState({
    view: false,
    edit_tag: false,
    unlock_lock: false,
    remove_user: false,
    add_user: false
  })

  const [dataSetChild, setDataSetChild] = useState([])

  const updateStateModal = (payload) => {
    setStateModal((prev) => ({ ...prev, ...payload }))
  }

  const updateDataSetChild = (value) => {
    setDataSetChild(value)
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
      unlock_lock: false,
      remove_user: false,
      add_user: false
    })

    hideAllTooltips()
    setDataSetChild([])
  }

  // Return states and their update functions
  return {
    isLoading,
    updateLoading,
    resetControls,
    updateStateModal,
    stateModal,
    dataSetChild,
    updateDataSetChild
  }
}

export default useProjectDetailControls
