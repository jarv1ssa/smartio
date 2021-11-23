import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type DeviceContextType = {
  device: { id: string; name: string } | null;
  connect: (name: string) => void;
};

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [device, setDevice] = useState<{ id: string; name: string } | null>(
    null
  );

  useEffect(() => {
    const device = localStorage.getItem("device");

    device ? setDevice(JSON.parse(device)) : setDevice(null);
  }, []);

  const connect = (name: string) => {
    const device = { id: uuidv4(), name };

    localStorage.setItem("device", JSON.stringify(device));
    setDevice(device);
  };

  return (
    <DeviceContext.Provider
      value={{
        device,
        connect,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};
