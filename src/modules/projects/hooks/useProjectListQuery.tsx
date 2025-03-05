import { create } from 'zustand'

interface ProjectListQuery {
  search: string
  dates: Date[]
  setSearch: (search: string) => void
  setDates: (dates: Date[]) => void
}

export const initialState = {
  search: '',
  filterStatus: [],
  dates: []
}

const useProjectListQuery = create<ProjectListQuery>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setDates: (dates) => set({ dates })
}))

export default useProjectListQuery
