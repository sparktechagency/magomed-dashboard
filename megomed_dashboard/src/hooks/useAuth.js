import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  return {
    user: auth?.user,
    token: auth?.token,
    refreshToken: auth?.refreshToken,
    isAuthenticated: auth?.isAuthenticated,
  };
};

export default useAuth;
