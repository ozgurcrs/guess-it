import { ReactNode } from "react";
import { SocketContext } from "../context";
import { useSocket } from "../hooks/useSocket";

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SocketContext.Provider value={useSocket()}>
      {children}
    </SocketContext.Provider>
  );
};
