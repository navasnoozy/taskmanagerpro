import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { Task } from "../../../schemas/task.schema";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message?: string;
  data: Task;
}

const useGetTask = (id: string) => {
  return useQuery<Task, AxiosError<ApiResponse>>({
    queryKey: ["task", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse>(`/api/tasks/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export default useGetTask;
