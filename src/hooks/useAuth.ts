import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  return { ...ctx };
};
