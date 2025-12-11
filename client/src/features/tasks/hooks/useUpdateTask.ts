import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { UpdateTaskInput, Task } from "../../../schemas/task.schema";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message?: string;
  data: Task;
}

interface UpdateTaskArgs {
  id: string;
  data: UpdateTaskInput;
}

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<ApiResponse>, UpdateTaskArgs>({
    mutationKey: ["updateTask"],
    mutationFn: async ({ id, data: updateData }) => {
      const { data } = await axiosInstance.patch<ApiResponse>(`/api/tasks/${id}`, updateData);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.data._id] });
    },
  });
};

export default useUpdateTask;
