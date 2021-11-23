import { DeviceContext } from "../store/device-context";
import { useContext } from "react";

export const useDevice = () => {
  const ctx = useContext(DeviceContext);

  return { ...ctx };
};
