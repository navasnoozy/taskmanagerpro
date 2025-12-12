import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../schemas/task.schema";

export type TaskStatus = "all" | "pending" | "in-progress" | "completed";
export type TaskPriority = "all" | "low" | "medium" | "high";
export type SortBy = "createdAt" | "dueDate" | "priority" | "title";
export type SortOrder = "asc" | "desc";

interface TaskState {
  selectedTask: Task | null;
  filterStatus: TaskStatus;
  filterPriority: TaskPriority;
  searchQuery: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  isFormOpen: boolean;
  isDeleteDialogOpen: boolean;
  taskToDelete: string | null;
}

const initialState: TaskState = {
  selectedTask: null,
  filterStatus: "all",
  filterPriority: "all",
  searchQuery: "",
  sortBy: "createdAt",
  sortOrder: "desc",
  isFormOpen: false,
  isDeleteDialogOpen: false,
  taskToDelete: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    clearSelectedTask: (state) => {
      state.selectedTask = null;
    },
    setFilterStatus: (state, action: PayloadAction<TaskStatus>) => {
      state.filterStatus = action.payload;
    },
    setFilterPriority: (state, action: PayloadAction<TaskPriority>) => {
      state.filterPriority = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.filterStatus = "all";
      state.filterPriority = "all";
      state.searchQuery = "";
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
    toggleSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    openForm: (state, action: PayloadAction<Task | undefined>) => {
      state.selectedTask = action.payload ?? null;
      state.isFormOpen = true;
    },
    closeForm: (state) => {
      state.isFormOpen = false;
      state.selectedTask = null;
    },
    openDeleteDialog: (state, action: PayloadAction<string>) => {
      state.taskToDelete = action.payload;
      state.isDeleteDialogOpen = true;
    },
    closeDeleteDialog: (state) => {
      state.isDeleteDialogOpen = false;
      state.taskToDelete = null;
    },
  },
});

export const {
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
} = taskSlice.actions;

export default taskSlice.reducer;
