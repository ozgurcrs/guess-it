import { io } from "socket.io-client";

interface IuseSocket {
  socket: any;
}

export const useSocket = (): IuseSocket => {
  const socket = io(
    "https://socket-test-8sry4fu89-ozgurcrs-projects.vercel.app"
  );

  return {
    socket,
  };
};
