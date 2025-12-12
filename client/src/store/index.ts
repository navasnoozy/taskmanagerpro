export { store } from "./store";
export type { RootState, AppDispatch } from "./store";

export { useAppDispatch, useAppSelector } from "./hooks";

export {
  setSelectedTask,
  clearSelectedTask,
  setFilterStatus,
  setFilterPriority,
  setSearchQuery,
  clearFilters,
  setSortBy,
  setSortOrder,
  toggleSortOrder,
  openForm,
  closeForm,
  openDeleteDialog,
  closeDeleteDialog,
} from "./slices/taskSlice";

export type {
  TaskStatus,
  TaskPriority,
  SortBy,
  SortOrder,
} from "./slices/taskSlice";
