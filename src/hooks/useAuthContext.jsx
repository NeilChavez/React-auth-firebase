import { useContext } from "react";
import authContext from "../context/authContext";

export function useAuthContext() {
  const value = useContext(authContext);
  return value;
}