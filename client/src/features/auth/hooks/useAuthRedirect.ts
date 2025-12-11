import { useEffect } from "react";
import { useNavigate } from "react-router";
import useCurrentUser from "./useCurrentUser";


export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { data: currentUser, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, isLoading, navigate]);
};
