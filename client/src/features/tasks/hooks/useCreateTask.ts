import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { CreateTaskInput, Task } from "../../../schemas/task.schema";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message?: string;
  data: Task;
}

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<ApiResponse>, CreateTaskInput>({
    mutationKey: ["createTask"],
    mutationFn: async (taskData) => {
      const { data } = await axiosInstance.post<ApiResponse>("/api/tasks", taskData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export default useCreateTask;
