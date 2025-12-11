import { useNavigate } from "react-router";

const useAppNavigate = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate("/"),
    goToProfile: () => navigate("/profile"),
    goToLogin: () => navigate("/signin"),
    goToSignup: () => navigate("/signup"),
  };
};

export default useAppNavigate;
