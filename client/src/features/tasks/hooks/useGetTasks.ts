import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../lib/axios";
import type { Task } from "../../../schemas/task.schema";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message?: string;
  data: Task[];
}

const useGetTasks = () => {
  return useQuery<Task[], AxiosError<ApiResponse>>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse>("/api/tasks");
      return data.data;
    },
  });
};

export default useGetTasks;
