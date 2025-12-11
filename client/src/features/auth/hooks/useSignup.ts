import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { setAccessToken } from "../../../lib/axios";
import type { SignupInput } from "../../../schemas/auth.schema";
import type { AxiosError } from "axios";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: { email: string; accessToken: string };
  errors?: { message: string; field?: string }[];
}

const useSignupUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<ApiResponse>, SignupInput>({
    mutationKey: ["signup"],
    mutationFn: async (credentials) => {
      const { data } = await axiosInstance.post<ApiResponse>("/api/users/signup", credentials);
      return data;
    },
    onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      if (data.data?.accessToken) {
        setAccessToken(data.data.accessToken);
        localStorage.setItem("persist", "true");
      }
    },
  });
};

export default useSignupUser;
