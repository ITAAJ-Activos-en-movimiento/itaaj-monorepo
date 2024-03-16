import { useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

export default function useAuthContext(): AuthContextProps {
  return useContext(AuthContext);
}